<?php
include_once './_common.php';

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


$today = date('Y-m-d');
$user = rf_mysql_row("SELECT ID FROM USER WHERE DEVICE_ID = '" . ESC($deviceId, $DB) . "' AND CHECKIN_DATE = '" . ESC($today, $DB) . "'", $DB);
if (!$user) {
    http_response_code(404);
    echo json_encode(array('success' => false, 'errorCode' => 'USER_NOT_FOUND'));
    exit;
}
$userId = $user['ID'];

// LEFT JOIN: 서베이 미참여자도 USER 행은 반환(SURVEY 필드만 null).
// surveyReward tri-state: null=미참여, 1=참여, 2=리워드까지.
$sql = "
SELECT
    U.USER_REWARD AS userReward,
    CASE
        WHEN S.USER_ID IS NULL THEN NULL
        WHEN S.REWARD = 1      THEN 2
        ELSE 1
    END AS surveyReward
FROM USER U
LEFT JOIN SURVEY S ON S.USER_ID = U.ID
WHERE U.ID = '" . ESC($userId, $DB) . "'
";
debug($sql);
$row = rf_mysql_row($sql, $DB);

$situationSql = "SELECT * FROM EX_DATA ed WHERE ed.USER_ID = '".ESC($userId, $DB). "'";
debug($situationSql);

$situationData = [];
$situationRow = rf_mysql_arr($situationSql, $DB);

// mysqli는 값을 문자열로 반환 → 프론트 계약(boolean / number|null)에 맞게 캐스팅.
// (안 하면 userReward \"0\"이 truthy, surveyReward \"2\"가 === 2 실패)
$data = array(
    "userReward"   => (bool)($row["userReward"] ?? false),
    "surveyReward" => (isset($row["surveyReward"]) && $row["surveyReward"] !== null) ? (int)$row["surveyReward"] : null,
    "situation"  => $situationRow
);

echo json_encode(array("success" => true, "data" => $data));
