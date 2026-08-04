<?php
include_once './_common.php';
if (isset($zx) && $zx == 'y') {
    $id = '';
    $persona = '';
    $reason = '';
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $id = $data['id'];
    $persona = $data['persona'];
    $reason = $data['reason'];
}

if ($id == '') {
    error_json(array('status' => 400, 'errorCode' => 'INVALID_INPUT_VALUE'));
}
$result = '';

$sql = "INSERT INTO PERSONA SET 
    USER_ID = '" . ESC($id, $DB) . "'
    , PERSONA = '" . ESC($persona, $DB) . "' 
    , REASON = '" . ESC($reason, $DB) . "'
    ";

debug($sql);
rf_mysql_query($sql, $DB);


echo json_encode(array('status' => 200, 'success' => true));
