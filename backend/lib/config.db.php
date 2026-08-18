<?php
$db_addr = getenv('DB_HOST') ?: 'db';
$db_id   = getenv('DB_USER') ?: '';
$db_pass = getenv('DB_PASS') ?: '';
$db_sel  = getenv('DB_NAME') ?: 'IFA_2026';
$db_port = (int)(getenv('DB_PORT') ?: 3306);

$DB = mysqli_connect($db_addr, $db_id, $db_pass, $db_sel, $db_port) or die("Fail connect DataBase Server 2");
mysqli_query($DB, 'SET NAMES utf8mb4') or die("Error Setting db 1");
