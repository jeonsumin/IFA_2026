<?php
// POST /api/experience — 존별 상황 선택 저장(upsert). 상황 확정 시 1회 호출.
include_once "./_common.php";


if (isset($zx) && $zx == 'y') {
    $zone = "entertainment";
    $situation = "LG StanbyME 2 Max";
    $deviceId = "test-device";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $zone = $data['zone'];
    $situation = $data['situation'];
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
}


$ZONES = array('entertainment', 'living', 'harmony', 'elegance');


if ($deviceId == '' || !in_array($zone, $ZONES, true) || $situation == '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}

// 체크인과 다른 요청 → device_id + 오늘 날짜로 당일 USER 조회
$today = date('Y-m-d');
$user = rf_mysql_row("SELECT ID FROM USER WHERE DEVICE_ID = '" . ESC($deviceId, $DB) . "' AND CHECKIN_DATE = '" . ESC($today, $DB) . "'", $DB);
if (!$user) {
    http_response_code(404);
    echo json_encode(array('success' => false, 'errorCode' => 'USER_NOT_FOUND'));
    exit;
}
$userId = $user['ID'];

// 유저×존 1행 upsert. 재선택 시 SITUATION만 덮어쓰고 QR_SCANNED는 유지.
$sql = "INSERT INTO EX_DATA SET
      USER_ID = '" . ESC($userId, $DB) . "'
    , ZONE = '" . ESC($zone, $DB) . "'
    , SITUATION = '" . ESC($situation, $DB) . "'
    , QR_SCANNED = 0
    , CREATE_DT = NOW()
    , UPDATE_DT = NOW()
    ON DUPLICATE KEY UPDATE SITUATION = VALUES(SITUATION), UPDATE_DT = NOW()";
debug($sql);
if (!sql_query($sql, $DB, false)) {
    http_response_code(500);
    echo json_encode(array('success' => false, 'errorCode' => 'DB_ERROR'));
    exit;
}

echo json_encode(array('success' => true));
