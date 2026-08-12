<?php
// GET /api/experience-status — 당일 유저의 존별 체험 현황(상황/QR). experience 페이지 mount 시 조회.
include_once "./_common.php";

if (isset($zx) && $zx == 'y') {
    $deviceId = "test-device";
} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
    $deviceId = $_SERVER['HTTP_X_DEVICE_ID'];
}

if ($deviceId == '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'errorCode' => 'INVALID_INPUT_VALUE'));
    exit;
}

$user = rf_mysql_row("SELECT U.ID, P.PERSONA, P.PERSONA_CODE FROM USER U LEFT JOIN PERSONA P ON P.USER_ID = U.ID WHERE U.DEVICE_ID = '" . ESC($deviceId, $DB) . "' AND U.CHECKIN_DATE = '" . ESC($today, $DB) . "'", $DB);
if (!$user) {
    http_response_code(404);
    echo json_encode(array('success' => false, 'errorCode' => 'USER_NOT_FOUND'));
    exit;
}
$userId = $user['ID'];
$userPersona =$user['PERSONA_CODE'];
$rows = rf_mysql_arr("SELECT ZONE, SITUATION, QR_SCANNED FROM EX_DATA WHERE USER_ID = '" . ESC($userId, $DB) . "'", $DB);

$zones = array();
foreach ($rows as $r) {
    $zones[] = array(
        'zone' => $r['ZONE'],
        'situation' => $r['SITUATION'],
        'qrScanned' => ((int)$r['QR_SCANNED']) === 1,
    );
}

echo json_encode(array('success' => true, 'data' => array('persona' => $userPersona, 'zones'=>$zones) ));
