<?php
include_once "./_common.php";

if (isset($zx) && $zx == 'y') {
    $email = "TEST@test.com";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $email = $data['email'];
}

if ($email == '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}
$today = date('Y-m-d'); // Asia/Seoul (config.php)

$check_user_sql = "SELECT * FROM USER WHERE USER_EMAIL= '" . ESC($email, $DB) . "' AND CHECKIN_DATE = '" . ESC($today, $DB) . "'";
$check_user = rf_mysql_row($check_user_sql, $DB);

if ($check_user) {
    http_response_code(409);
    echo json_encode(array('success' => false, 'errorCode' => 'DUPLICATE_EMAIL'));
    exit;
}
echo json_encode(array('success' => true));
