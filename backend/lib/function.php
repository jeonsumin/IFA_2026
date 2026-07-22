<?php
//******************************************* 유틸리티 함수 ***************************************//
	// 기본 셀렉트 쿼리
	function rf_mysql_query( $sql, $DB, $func_name="" ){
		$result = sql_query($sql,$DB);
		if (!$result) {
			echo error_json( array('code'=>1, 'reason'=>$func_name.' Error['.mysqli_errno($DB).']'.mysqli_error($DB)) ); //'reason'=>$func_name.' Error') );
			exit;
		}else{
			return $result;
		}
	}

	// 여러행 가져오기
	function rf_mysql_arr($sql, $DB, $func_name=""){
		$arr = Array();
		$result = @rf_mysql_query($sql, $DB, $func_name);
		while ($row = mysqli_fetch_assoc($result)) {
			$arr[] = $row;
		}
		return $arr;
	}

	// 한개행 가져오기
	function rf_mysql_row($sql, $DB, $func_name=""){
		
		return mysqli_fetch_assoc(rf_mysql_query($sql, $DB, $func_name));
	}

	// mysql_real_escape_string 변환 함수
	function ESC($str, $db_res){
		return mysqli_real_escape_string($db_res,$str);
	}

	// 에러 json
	function error_json( $param = array() ){
		$result['basic'] = $param;
		echo json_encode( $result );
		exit;
	}

	//서버통신
	function https_post($uri, $postdata = null) {
	  $ch = curl_init($uri);
	  curl_setopt($ch, CURLOPT_POST, true);
	  if( $postdata ) curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	  $result = curl_exec($ch);
	  curl_close($ch);

	  return $result;
	}


	// mysql_query 와 mysql_error 를 한꺼번에 처리
	function sql_query($sql,$DB, $error=TRUE)
	{
		if ($error)
			$result = @mysqli_query($DB, $sql) or die("<p>$sql<p>" . mysqli_errno($DB) . " : " .  mysqli_error($DB) . "<p>error file : $_SERVER[PHP_SELF]");
		else
			$result = @mysqli_query($DB,$sql);
		
		return $result;
	}

	// 쿼리를 실행한 후 결과값에서 한행을 얻는다.
	function sql_fetch($sql, $error=TRUE)
	{
		global $DB;
		$result = sql_query($sql, $error);
		//print_r($result);
		if ($error)
			$row = @sql_fetch_array($result) or die("<p>$sql<p>" . mysqli_errno($DB) . " : " .  mysqli_errno($DB) . "<p>error file : $_SERVER[PHP_SELF]");
		else
			$row = sql_fetch_array($result);
		
		return $row;
	}


	// 결과값에서 한행 연관배열(이름으로)로 얻는다.
	function sql_fetch_array($result)
	{
		$row = @mysqli_fetch_assoc($result);
		return $row;
	}


	// $result에 대한 메모리(memory)에 있는 내용을 모두 제거한다.
	// sql_free_result()는 결과로부터 얻은 질의 값이 커서 많은 메모리를 사용할 염려가 있을 때 사용된다.
	// 단, 결과 값은 스크립트(script) 실행부가 종료되면서 메모리에서 자동적으로 지워진다.
	function sql_free_result($result)
	{
		return mysql_free_result($result);
	}

//	function sql_password($value)
//	{
//		// mysql 4.0x 이하 버전에서는 password() 함수의 결과가 16bytes
//		// mysql 4.1x 이상 버전에서는 password() 함수의 결과가 41bytes
//		$row = sql_fetch(" select CONCAT('*', UPPER(SHA1(UNHEX(SHA1('$value'))))) as pass ");
//		return $row['pass'];
//	}

	
	function sql_password($value){
		$_BRIGHTBELLPASS = new _BRIGHTBELLPASS();
		$password = base64_encode($_BRIGHTBELLPASS->encryptToken($value));
		return $password;
	}

	function get_password($hash){
		$_BRIGHTBELLPASS = new _BRIGHTBELLPASS();
		$password = $_BRIGHTBELLPASS->decryptToken($hash);
		return $password;
	}

	//비밀번호 비교 AES256
	function check_password_aes256($pass, $hash){
		
		$_BRIGHTBELLPASS = new _BRIGHTBELLPASS();
		$password = base64_encode($_BRIGHTBELLPASS->encryptToken($pass));
		
		return ($password == $hash);
	}




	//서버통신 (GET통신: http://domain.com?a=aaa&b=aaa, null, false, POST통신 url, array('a'=>'aaa','b'=>'bbb')
	function server_comm($uri, $postdata = null, $post = true, $timeout=10) {
		$ch = curl_init($uri);
		if( $post ){
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout); // 시간제한:초(제한 없음 : 0 )
		$result = curl_exec($ch);
		curl_close($ch);

		// 페이스북에서 리턴되는uid 길이가 정수형을 넘어서 스트링으로 변경
		$rtn = preg_replace('/"uid":(\d+)/', '"uid":"\1"', $result );
		//debug( $rtn ); exit;
		return $rtn;
	}

	function debug($data){
		if( IS_DEBUG ){
			echo '<pre>';
			echo print_r($data, true);
			//echo var_dump($data);
			echo '</pre>';
		}
	}

	function cvt_int( $value ){
		return ( $value !== null ) ? (int)$value : null;
	}


	function https_post_head($token,$serial_number){

		$headers = array();
		$headers[] = "x-access-token: $token";
		$headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=utf-8';
		
		$state_ch = curl_init();
		    curl_setopt($state_ch, CURLOPT_URL,"https://dev.tsharp.io/api/store/pocDevice/info?SERIAL_NUMBER=$serial_number");
		    curl_setopt($state_ch, CURLOPT_RETURNTRANSFER, true);
		    curl_setopt($state_ch, CURLOPT_HTTPHEADER, $headers);
		    $state_result = curl_exec ($state_ch);
		    $state_result = json_decode($state_result); 
		
			print_r($state_result);
		return $state_result;
	}



	function useruid($DB,$table,$column) { 
		$s = strtoupper(md5(uniqid("_BB_",true))); 
		$guidText = 
			''.
			substr($s,0,2).
			substr($s,8,2).
			//substr($s,12,4).
			//substr($s,16,4).
			substr($s,2);
		$UserWhere = " WHERE ".$column." = '".$guidText."' ";
		$userCodesql = " SELECT COUNT(*) AS CNT FROM ".$table." ".$UserWhere;
		$userCode = rf_mysql_row($userCodesql, $DB);
		
		if($userCode['CNT'] != 0){
			useruid($DB);
			return;
		}
		return $guidText;
	}
			 


	function certReset($DB){
		global $BB_DATE;
		$timenow = $BB_DATE;
		$timecompare = date('Y-m-d H:i:s');
		$timetarget = date("YmdHis", strtotime($timenow."+1 minutes"));
		$deleteCardKeySql = " DELETE FROM CERT WHERE CERT_CODE_EXPIRATIONDATE < '$timecompare' "; 
		rf_mysql_query($deleteCardKeySql, $DB);
	}

	function generate4DigitCode() {
		return str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
	}

	function certCode($DB,$table,$column = 'CERT_CODE'){
		do {
			$code = generate4DigitCode();

			$certCodesql = " SELECT COUNT(*) AS CNT FROM ".$table." WHERE ".$column." = '".$code."'";
			$certCodeData = rf_mysql_row($certCodesql, $DB);
			$certCodeCnt = $certCodeData['CNT'];

		} while ($certCodeCnt > 0);
		return $code;
	}