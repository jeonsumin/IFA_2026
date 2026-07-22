<?php

if (PHP_VERSION >= '5.1.0') {
    //if (function_exists("date_default_timezone_set")) date_default_timezone_set("Asia/Seoul");
    date_default_timezone_set("Asia/Seoul");
}
$http = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on') ? 's' : '') . '://';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
if(isset($_SERVER['HTTP_HOST']) && preg_match('/:[0-9]+$/', $host))	$host = preg_replace('/:[0-9]+$/', '', $host);



define('_BB_SERVER_TIME',    time());
define('_BB_TIME_YMDHIS',    date('Y-m-d H:i:s', _BB_SERVER_TIME));
define('_BB_TIME_YMD',       substr(_BB_TIME_YMDHIS, 0, 10));
define('_BB_TIME_HIS',       substr(_BB_TIME_YMDHIS, 11, 8));

define('_BB_FILE_DIR',       'data');
define('_BB_FILE_UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'].'/'._BB_FILE_DIR);



$BB_DATE = date('YmdHis');
$BB_IPADDR = $_SERVER['REMOTE_ADDR'];

if( isset($zx) ){ define("IS_DEBUG", true); }else{ define("IS_DEBUG", false); }
?>