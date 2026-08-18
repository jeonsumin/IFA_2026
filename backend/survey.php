<?php
include_once './_common.php';

if (isset($zx) && $zx == 'y') {
    $deviceId = "test-device";
    $q1 = "3";
    $q2 = "Living in Tune";
    $q3 = array('LG AI Appliances Orchestra Showcase (Hero Stage)', 'Find Your Routine in Tune (Mobile experience)');
    $q4 = array('StanbyME 2 Max');
    $q5 = "1234";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];

    // 프론트는 {answers: {Q1..Q5}} 형태로 보냄
    $answers = (isset($data['answers']) && is_array($data['answers'])) ? $data['answers'] : array();
    $q1 = isset($answers['Q1']) ? $answers['Q1'] : '';
    $q2 = isset($answers['Q2']) ? $answers['Q2'] : '';
    $q3 = (isset($answers['Q3']) && is_array($answers['Q3'])) ? $answers['Q3'] : array();
    $q4 = (isset($answers['Q4']) && is_array($answers['Q4'])) ? $answers['Q4'] : array();
    $q5 = isset($answers['Q5']) ? $answers['Q5'] : '';
}

if ($deviceId == '' || $q1 == '' || $q2 == '' || count($q3) == 0 || count($q4) == 0 || trim($q5) == '') {
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


$q3json = json_encode($q3, JSON_UNESCAPED_UNICODE);
$q4json = json_encode($q4, JSON_UNESCAPED_UNICODE);

$sql = "INSERT INTO SURVEY SET
      USER_ID = '" . ESC($userId, $DB) . "'
    , Q1 = '" . ESC($q1, $DB) . "'
    , Q2 = '" . ESC($q2, $DB) . "'
    , Q3 = '" . ESC($q3json, $DB) . "'
    , Q4 = '" . ESC($q4json, $DB) . "'
    , Q5 = '" . ESC($q5, $DB) . "'
    , CREATE_DT = NOW()
    , UPDATE_DT = NOW()
    ON DUPLICATE KEY UPDATE
      Q1 = VALUES(Q1), Q2 = VALUES(Q2), Q3 = VALUES(Q3), Q4 = VALUES(Q4), Q5 = VALUES(Q5), UPDATE_DT = NOW()";
debug($sql);
if (!sql_query($sql, $DB, false)) {
    http_response_code(500);
    echo json_encode(array('success' => false, 'errorCode' => 'DB_ERROR'));
    exit;
}

echo json_encode(array('success' => true));
