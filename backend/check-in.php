<?php
include_once "./_common.php";
if ($zx == 'y') {

} else {
    $JsonData = file_get_contents('php://input');
    $data = json_decode($JsonData, true);
}


