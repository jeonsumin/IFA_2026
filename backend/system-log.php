<?php
include_once './_common.php';

if (isset($zx) && $zx == 'y') {
    $deviceId = "test-device";
    $target = "apple";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
    $target = $data['target'];
}

if ($deviceId == '') {
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


$sql = "INSERT INTO SYSTEM_LOG SET
      USER_ID = '" . ESC($userId, $DB) . "'
    , TARGET_ID = '" . ESC($target, $DB) . "'
    , CREATE_DT = NOW()
    ON DUPLICATE KEY UPDATE TARGET_ID = VALUES(TARGET_ID), CREATE_DT = NOW()";

debug($sql);

rf_mysql_query($sql, $DB);

echo json_encode(array('success' => true));
