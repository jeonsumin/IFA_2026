<?php
// 관리자 대시보드 — 허용 IP만 접근 (프록시 없음 → REMOTE_ADDR 신뢰)
$ALLOWED_IPS = [
    '127.0.0.1',
    '::1',
    "61.40.30.130",
    '192.168.65.1',
    // TODO: 허용할 고정 IP 추가 (예: 사무실 공인 IP '203.0.113.10')
];
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', $ALLOWED_IPS, true)) {
    http_response_code(403);
    exit('403 Forbidden');
}

include_once './_common.php';

$sql = "SELECT
    U.ID
    , U.CHECKIN_DATE
    , U.USER_GENDER
    , U.USER_AGE
    , IF(U.USER_REWARD = 1, 'O', 'X') AS USER_REWARD
    , P.PERSONA
    , P.REASON
    , ED.ENTERTAINMENT
    , ED.ENTERTAINMENT_QR
    , ED.LIVING
    , ED.LIVING_QR
    , ED.HARMONY
    , ED.HARMONY_QR
    , ED.ELEGANCE
    , ED.ELEGANCE_QR
    , S.Q1
    , S.Q2
    , S.Q3
    , S.Q4
    , S.Q5
    , IF(S.REWARD = 1, 'O', 'X') AS SURVEY_REWARD
    , SL.TARGET
    , U.CREATE_DT
FROM USER U
LEFT JOIN PERSONA P
    ON P.USER_ID = U.ID
LEFT JOIN (
    SELECT
        USER_ID
        , MAX(CASE WHEN `ZONE` = 'entertainment' THEN CONCAT(SITUATION, ', ', SITUATION_DESC) END) AS ENTERTAINMENT
        , MAX(CASE WHEN `ZONE` = 'entertainment' THEN IF(QR_SCANNED = 1, 'O', 'X') END) AS ENTERTAINMENT_QR
        , MAX(CASE WHEN `ZONE` = 'living' THEN CONCAT(SITUATION, ', ', SITUATION_DESC) END) AS LIVING
        , MAX(CASE WHEN `ZONE` = 'living' THEN IF(QR_SCANNED = 1, 'O', 'X') END) AS LIVING_QR
        , MAX(CASE WHEN `ZONE` = 'harmony' THEN CONCAT(SITUATION, ', ', SITUATION_DESC) END) AS HARMONY
        , MAX(CASE WHEN `ZONE` = 'harmony' THEN IF(QR_SCANNED = 1, 'O', 'X') END) AS HARMONY_QR
        , MAX(CASE WHEN `ZONE` = 'elegance' THEN CONCAT(SITUATION, ', ', SITUATION_DESC) END) AS ELEGANCE
        , MAX(CASE WHEN `ZONE` = 'elegance' THEN IF(QR_SCANNED = 1, 'O', 'X') END) AS ELEGANCE_QR
    FROM EX_DATA
    GROUP BY USER_ID
) ED
    ON ED.USER_ID = U.ID
LEFT JOIN SURVEY S
    ON S.USER_ID = U.ID
LEFT JOIN (
    SELECT
        USER_ID
        , GROUP_CONCAT(TARGET_ID SEPARATOR ',') AS TARGET
    FROM SYSTEM_LOG
    GROUP BY USER_ID
) SL
    ON SL.USER_ID = U.ID";

$row = rf_mysql_arr($sql, $DB);

// SELECT 별칭 순서 그대로 (헤더=바디 컬럼 동기화)
$columns = [
    'ID', 'CHECKIN_DATE', 'USER_GENDER', 'USER_AGE', 'USER_REWARD',
    'PERSONA', 'REASON',
    'ENTERTAINMENT', 'ENTERTAINMENT_QR',
    'LIVING', 'LIVING_QR',
    'HARMONY', 'HARMONY_QR',
    'ELEGANCE', 'ELEGANCE_QR',
    'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'SURVEY_REWARD',
    'TARGET', 'CREATE_DT',
];

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <style>
        table { border-collapse: collapse; width: 100%; font-size: 12px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; white-space: nowrap; }
        th { background: #f2f2f2; position: sticky; top: 0; }
        tbody tr:nth-child(even) { background: #fafafa; }
    </style>
</head>
<body>
<table>
    <thead>
    <tr>
        <?php foreach ($columns as $c): ?>
            <th><?= htmlspecialchars($c) ?></th>
        <?php endforeach; ?>
    </tr>
    </thead>
    <tbody>
    <?php if (empty($row)): ?>
        <tr>
            <td colspan="<?= count($columns) ?>">데이터가 없습니다.</td>
        </tr>
    <?php else: ?>
        <?php foreach ($row as $r): ?>
            <tr>
                <?php foreach ($columns as $c): ?>
                    <td><?= htmlspecialchars((string)($r[$c] ?? '')) ?></td>
                <?php endforeach; ?>
            </tr>
        <?php endforeach; ?>
    <?php endif; ?>
    </tbody>
</table>
</body>
</html>
