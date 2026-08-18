<?php
// POST /api/experience-qr — 존별 QR 스캔 완료 처리. 상황 선택 선행 필수(SITUATION NOT NULL).
include_once "./_common.php";

if (isset($zx) && $zx == 'y') {
    $zone = "entertainment";
    $deviceId = "test-device";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $zone = $data['zone'];
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
}

$ZONES = array('entertainment', 'living', 'harmony', 'elegance');

if ($deviceId == '' || !in_array($zone, $ZONES, true)) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}

$today = date('Y-m-d');
$user = rf_mysql_row("SELECT ID FROM USER WHERE DEVICE_ID = '" . ESC($deviceId, $DB) . "' AND CHECKIN_DATE = '" . ESC($today, $DB) . "'", $DB);
if (!$user) {
    http_response_code(404);
    echo json_encode(array('success' => false, 'errorCode' => 'USER_NOT_FOUND'));
    exit;
}
$userId = $user['ID'];

// 상황 선택 행이 있어야 QR 완료 가능. (affected_rows는 재스캔 시 0을 반환해 오판 → SELECT로 명시 확인)
$exp = rf_mysql_row("SELECT ID FROM EX_DATA WHERE USER_ID = '" . ESC($userId, $DB) . "' AND ZONE = '" . ESC($zone, $DB) . "'", $DB);
if (!$exp) {
    http_response_code(409);
    echo json_encode(array('success' => false, 'errorCode' => 'SITUATION_NOT_SELECTED'));
    exit;
}

$sql = "UPDATE EX_DATA SET QR_SCANNED = 1, UPDATE_DT = NOW()
    WHERE USER_ID = '" . ESC($userId, $DB) . "' AND ZONE = '" . ESC($zone, $DB) . "'";
debug($sql);
if (!sql_query($sql, $DB, false)) {
    http_response_code(500);
    echo json_encode(array('success' => false, 'errorCode' => 'DB_ERROR'));
    exit;
}

echo json_encode(array('success' => true));
