<?php
include_once "./_common.php";

if (isset($zx) && $zx == 'y') {
    $name = "TEST";
    $email = "TEST@test.com";
    $gender = "M";
    $age = "40";
    $deviceId = "test-device";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $name = $data['name'];
    $email = $data['email'];
    $gender = $data['gender'];
    $age = $data['age'];
    $deviceId = $data['deviceId'];
}

if ($name == '' || $email == '' || $gender == '' || $age == '' || $deviceId == '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}

$today = date('Y-m-d'); // Asia/Seoul (config.php)
$uid   = useruid($DB, 'USER', 'ID');

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
rf_mysql_query($sql, $DB);

// 일일 쿠키 만료 = KST 자정(내일 0시)의 GMT 문자열 → 클라가 이 값으로 checkin 쿠키 설정
$expiresAt = gmdate('D, d M Y H:i:s', strtotime('tomorrow')) . ' GMT';

echo json_encode(array('success' => true, 'expiresAt' => $expiresAt));
