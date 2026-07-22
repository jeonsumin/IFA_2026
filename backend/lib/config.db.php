<?php

$db_addr = '134.185.117.153';
$db_id = 'terry';
$db_pass = 'quftkxkd1!';
$db_sel = 'IFA_2026';

$DB = mysqli_connect($db_addr, $db_id, $db_pass, $db_sel, 3306)or die("Fail connect DataBase Server 2");
mysqli_query($DB,'SET NAMES utf8mb4') or die("Error Setting db 1");

?>