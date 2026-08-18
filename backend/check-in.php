<?php
include_once "./_common.php";

if (isset($zx) && $zx == 'y') {
    $name = "TEST";
    $email = "TEST@test.com";
    $gender = "M";
    $age = "40";
    $persona = "THE CONNECTED\nFAMILY COORDINATOR";
    $reason = "지금의 내 일상과 가장 비슷해서";
    $persona_code = "optimizer";
    $deviceId = "test-device";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $name = $data['name'];
    $email = $data['email'];
    $gender = $data['gender'];
    $age = $data['age'];
    $persona = $data['persona'];
    $persona_code = $data['personaCode'];
    $reason = $data['reason'];
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
}

if ($name == '' || $email == '' || $gender == '' || $age == '' || $deviceId == '' || $persona == '' || $reason == '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}

$today = date('Y-m-d'); // Asia/Seoul (config.php)
$uid = useruid($DB, 'USER', 'ID');

$check_user_sql = "SELECT * FROM USER WHERE DEVICE_ID = '" . ESC($deviceId, $DB) . "' AND CHECKIN_DATE = '" . ESC($today, $DB) . "'";
$check_user = rf_mysql_row($check_user_sql, $DB);

if ($check_user) {
    http_response_code(409);
    echo json_encode(array('success' => false, 'errorCode' => 'DUPLICATE_USER'));
    exit;
}


// USER + PERSONA를 한 트랜잭션으로 — 둘 다 성공해야 커밋. 부분 실패 시 롤백해서
// "체크인만 되고 persona 누락 → 재시도 409로 잠김" 방지. (InnoDB 필요)
mysqli_begin_transaction($DB);

// (기기 × 날짜) 1행. 같은 날 재요청이면 UPDATE_DT만 갱신
$sql = "INSERT INTO USER SET
    ID = '" . ESC($uid, $DB) . "'
    , USER_NM = '" . ESC($name, $DB) . "'
    , USER_EMAIL = '" . ESC($email, $DB) . "'
    , USER_GENDER = '" . ESC($gender, $DB) . "'
    , USER_AGE = '" . ESC($age, $DB) . "'
    , DEVICE_ID = '" . ESC($deviceId, $DB) . "'
    , CHECKIN_DATE = '" . ESC($today, $DB) . "'
    , CREATE_DT = NOW()
    , UPDATE_DT = NOW()
    ON DUPLICATE KEY UPDATE UPDATE_DT = NOW()";
debug($sql);
$userOk = sql_query($sql, $DB, false);

$persona_sql = "INSERT INTO PERSONA SET
          USER_ID = '" . ESC($uid, $DB) . "'
        , PERSONA ='" . ESC($persona, $DB) . "'
        , PERSONA_CODE ='" . ESC($persona_code, $DB) . "'
        , REASON ='" . ESC($reason, $DB) . "'
";
debug($persona_sql);
$personaOk = $userOk ? sql_query($persona_sql, $DB, false) : false;

if (!$userOk || !$personaOk) {
    mysqli_rollback($DB);
    http_response_code(500);
    echo json_encode(array('success' => false, 'errorCode' => 'DB_ERROR'));
    exit;
}

mysqli_commit($DB);

// 일일 쿠키 만료 = KST 자정(내일 0시)의 GMT 문자열 → 클라가 이 값으로 checkin 쿠키 설정
$expiresAt = gmdate('D, d M Y H:i:s', strtotime('tomorrow')) . ' GMT';

echo json_encode(array('success' => true, 'expiresAt' => $expiresAt));
