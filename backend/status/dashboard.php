<?php
// 관리자 대시보드 — 허용 IP만 접근
$ALLOWED_IPS = [
    '127.0.0.1',
    '::1',
    "61.40.30.130",
    '192.168.65.1',
];
// Traefik(인그레스) 뒤라 REMOTE_ADDR은 프록시 파드 IP(10.42.x.x).
// 실제 클라 IP는 X-Forwarded-For의 마지막 값(Traefik이 append한 TCP 피어 = 스푸핑 방어).
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';

if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $xff = array_map('trim', explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
    $clientIp = end($xff);
}
if (!in_array($clientIp, $ALLOWED_IPS, true)) {
    http_response_code(403);
    exit('403 Forbidden');
}
include_once './_common.php';

// 금일 데이터 삭제 (POST) — 오늘 CHECKIN_DATE인 USER 행만 제거. GET 오삭제 방지 위해 POST 전용.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete_today') {
    sql_query("DELETE FROM USER WHERE CHECKIN_DATE = CURDATE()", $DB, false);
    header('Location: dashboard.php'); // PRG 패턴 — 새로고침 재삭제 방지
    exit;
}

$checkinDt = $_GET['checkinDt'] ?? null;

// CHECKIN_DATE 필터 — checkinDt 지정 시 해당 날짜만. 미지정이면 전체. ESC로 이스케이프.
$dateWhere = $checkinDt
    ? "\nWHERE U.CHECKIN_DATE = '" . ESC($checkinDt, $DB) . "'"
    : "";

$sql = "SELECT
    U.ID
    , U.CHECKIN_DATE
    , IF(U.USER_GENDER = 'M', '남','여') AS USER_GENDER 
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
    WHERE TARGET_ID IN ('google','instagram','youtube','apple','facebook')
    GROUP BY USER_ID
) SL
   ON SL.USER_ID = U.ID" . $dateWhere . "
  ";

$row = rf_mysql_arr($sql, $DB);

// ── 상단 KPI 카드용 집계 (raw 테이블과 별개, 가벼운 COUNT 쿼리) ──────────────
// USER: 전체 / 금일 체크인(KST CURDATE) / 리워드 수령
$userStat = rf_mysql_row("SELECT
        COUNT(*)                       AS TOTAL
        , SUM(CHECKIN_DATE = CURDATE()) AS TODAY
        , SUM(USER_REWARD = 1)          AS REWARD_USER
    FROM USER", $DB) ?: [];

// 존별 QR 체험완료 수 → [zone => cnt]
$zoneCnt = [];
foreach (rf_mysql_arr("SELECT `ZONE`, SUM(QR_SCANNED = 1) AS CNT FROM EX_DATA GROUP BY `ZONE`", $DB) ?: [] as $z) {
    $zoneCnt[$z['ZONE']] = (int)$z['CNT'];
}
$ZONES = ['entertainment' => 'Entertainment', 'living' => 'Living', 'harmony' => 'Harmony', 'elegance' => 'Elegance'];

// 4개 존 모두 QR 완료(CLEAR) 인원
$clearStat = rf_mysql_row("SELECT COUNT(*) AS CLEAR FROM (
        SELECT USER_ID FROM EX_DATA WHERE QR_SCANNED = 1
        GROUP BY USER_ID HAVING COUNT(DISTINCT `ZONE`) = 4
    ) t", $DB) ?: [];

// 서베이 참여 / 서베이 리워드 수령
$surveyStat = rf_mysql_row("SELECT COUNT(*) AS SURVEY_CNT, SUM(REWARD = 1) AS SURVEY_REWARD FROM SURVEY", $DB) ?: [];

// 페르소나 분포 → [PERSONA_CODE => cnt]. 고정 4종은 없어도 0으로 노출.
$personaCnt = [];
foreach (rf_mysql_arr("SELECT PERSONA_CODE, COUNT(*) AS CNT FROM PERSONA GROUP BY PERSONA_CODE", $DB) ?: [] as $p) {
    $personaCnt[$p['PERSONA_CODE']] = (int)$p['CNT'];
}
$PERSONAS = ['optimizer', 'coordinator', 'homemaker', 'worker'];

// SELECT 별칭 순서 그대로 (헤더=바디 컬럼 동기화)
$columns = ['CHECKIN_DATE', 'USER_GENDER', 'USER_AGE', 'USER_REWARD',
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
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #f5f6f8;
            color: #1a1a1a;
        }

        h1 {
            font-size: 20px;
            margin: 0 0 4px;
        }

        .sub {
            color: #888;
            font-size: 12px;
        }

        .page-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .danger-btn {
            font-size: 13px;
            font-weight: 600;
            padding: 8px 14px;
            border: 1px solid #e02424;
            border-radius: 8px;
            background: #fff;
            color: #e02424;
            cursor: pointer;
        }

        .danger-btn:hover {
            background: #e02424;
            color: #fff;
        }

        section {
            margin-bottom: 24px;
        }

        .sec-title {
            font-size: 13px;
            font-weight: 700;
            color: #555;
            margin: 0 0 8px;
        }

        .sec-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .sec-head .sec-title {
            margin-bottom: 8px;
        }

        .copy-btn {
            font-size: 12px;
            padding: 5px 12px;
            border: 1px solid #d0d3d8;
            border-radius: 6px;
            background: #fff;
            color: #333;
            cursor: pointer;
        }

        .copy-btn:hover {
            background: #f0f1f3;
        }

        .table-wrap {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            border-radius: 8px;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
        }

        .card {
            background: #fff;
            border: 1px solid #e6e8eb;
            border-radius: 10px;
            padding: 14px 16px;
        }

        .card .label {
            font-size: 12px;
            color: #888;
            margin-bottom: 6px;
        }

        .card .value {
            font-size: 26px;
            font-weight: 700;
            line-height: 1;
        }

        .card .value small {
            font-size: 13px;
            font-weight: 500;
            color: #aaa;
        }

        .card.accent {
            background: linear-gradient(135deg, #ff3d5a, #a03cff);
            border: none;
            color: #fff;
        }

        .card.accent .label {
            color: rgba(255, 255, 255, 0.85);
        }

        table {
            border-collapse: collapse;
            width: 100%;
            font-size: 12px;
            background: #fff;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 6px 8px;
            text-align: left;
            white-space: nowrap;
        }

        th {
            background: #f2f2f2;
            position: sticky;
            top: 0;
        }

        tbody tr:nth-child(even) {
            background: #fafafa;
        }
    </style>
</head>
<body>
<div class="page-head">
    <div>
        <h1>IFA 2026 Dashboard</h1>
        <div class="sub"><?= date('Y-m-d H:i') ?> 기준</div>
        <div class="sub">날짜 조회: URL 끝에 <code>?checkinDt=YYYY-MM-DD</code> 추가 (미지정 시 전체)<?php if ($checkinDt): ?> · 현재 필터: <strong><?= htmlspecialchars($checkinDt) ?></strong><?php endif; ?></div>
    </div>
    <form method="post" onsubmit="return confirm('금일(오늘) 체크인한 USER 데이터를 삭제합니다.\n되돌릴 수 없습니다. 계속할까요?');">
        <input type="hidden" name="action" value="delete_today">
        <button type="submit" class="danger-btn">금일 데이터 삭제</button>
    </form>
</div>

<section>
    <p class="sec-title">전체 현황</p>
    <div class="cards">
        <div class="card accent">
            <div class="label">금일 체크인</div>
            <div class="value"><?= (int)($userStat['TODAY'] ?? 0) ?></div>
        </div>
        <div class="card">
            <div class="label">전체 체크인</div>
            <div class="value"><?= (int)($userStat['TOTAL'] ?? 0) ?></div>
        </div>
        <div class="card">
            <div class="label">4존 CLEAR</div>
            <div class="value"><?= (int)($clearStat['CLEAR'] ?? 0) ?></div>
        </div>
        <div class="card">
            <div class="label">리워드 수령</div>
            <div class="value"><?= (int)($userStat['REWARD_USER'] ?? 0) ?></div>
        </div>
        <div class="card">
            <div class="label">서베이 참여</div>
            <div class="value"><?= (int)($surveyStat['SURVEY_CNT'] ?? 0) ?></div>
        </div>
        <div class="card">
            <div class="label">서베이리워드 수령</div>
            <div class="value"><?= (int)($surveyStat['SURVEY_REWARD'] ?? 0) ?></div>
        </div>
    </div>
</section>


<section>
    <p class="sec-title">페르소나 분포</p>
    <div class="cards">
        <?php foreach ($PERSONAS as $code): ?>
            <div class="card">
                <div class="label"><?= htmlspecialchars($code) ?></div>
                <div class="value"><?= (int)($personaCnt[$code] ?? 0) ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section>
    <p class="sec-title">존별 체험 수 (QR 완료)</p>
    <div class="cards">
        <?php foreach ($ZONES as $slug => $name): ?>
            <div class="card">
                <div class="label"><?= htmlspecialchars($name) ?></div>
                <div class="value"><?= (int)($zoneCnt[$slug] ?? 0) ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>


<section>
    <div class="sec-head">
        <p class="sec-title">Raw Data</p>
        <button type="button" id="copyRaw" class="copy-btn">복사</button>
    </div>
    <div class="table-wrap">
        <table id="rawTable">
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
    </div>
</section>
<script>
    document.getElementById('copyRaw').addEventListener('click', async function () {
        var btn = this;
        var rows = Array.from(document.querySelectorAll('#rawTable tbody tr'));
        var esc = function (s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };

        // 엑셀이 '표'로 인식하도록 text/html 테이블을 실음. 셀 내 개행은 <br>로 유지.
        var html = '<table>' + rows.map(function (tr) {
            return '<tr>' + Array.from(tr.querySelectorAll('td')).map(function (td) {
                return '<td>' + esc(td.textContent).replace(/\r?\n/g, '<br>') + '</td>';
            }).join('') + '</tr>';
        }).join('') + '</table>';

        // text/plain 폴백: 셀 내 탭/개행은 공백으로 치환해 TSV 정렬 유지.
        var plain = rows.map(function (tr) {
            return Array.from(tr.querySelectorAll('td')).map(function (td) {
                return td.textContent.replace(/[\t\r\n]+/g, ' ');
            }).join('\t');
        }).join('\n');

        try {
            if (window.ClipboardItem) {
                await navigator.clipboard.write([new ClipboardItem({
                    'text/html': new Blob([html], {type: 'text/html'}),
                    'text/plain': new Blob([plain], {type: 'text/plain'})
                })]);
            } else {
                await navigator.clipboard.writeText(plain);
            }
            btn.textContent = '복사됨';
            setTimeout(function () {
                btn.textContent = '복사';
            }, 1500);
        } catch (e) {
            alert('복사 실패: ' + e);
        }
    });
</script>
</body>
</html>
