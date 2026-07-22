<?php
$db_addr = '';
$db_id = '';
$db_pass = '';
$db_sel = '';

$DB = mysqli_connect($db_addr, $db_id, $db_pass, $db_sel, 3306)or die("Fail connect DataBase Server 2");
mysqli_query($DB,'SET NAMES UTF8') or die("Error Setting db 1");


?>