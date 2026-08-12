<?php
include_once './_common.php';

if (isset($zx) && $zx == 'y') {
    $deviceId = "test-device";
    $type = "reward";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
    $type = $data['type'];
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

if ($type == 'reward') {
    $sql = "UPDATE USER SET USER_REWARD = 1 WHERE ID = '" . ESC($userId, $DB) . "'";
    debug($sql);
    rf_mysql_query($sql, $DB);
} else if ($type == 'survey') {
    $sql = "UPDATE SURVEY SET REWARD = 1 WHERE USER_ID = '" . ESC($userId, $DB) . "'";
    debug($sql);
    rf_mysql_query($sql, $DB);
}

echo json_encode(array('success' => true));
