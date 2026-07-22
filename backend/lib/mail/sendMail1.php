<?php
$mail_html = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
	<style type="text/css" media="screen">
	[style*=’Open Sans’] {
	font-family: Open Sans, Arial, sans-serif !important
	}
	</style>
	</head>
	<body>
	
	<table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
	<tr>
		<td>
			<table align="center" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="left" style="padding: 30px 0 10px 0;">
					<img src="http://www.kpr.co.kr/images/30_logo.png" alt="KPR" title="logos" style="display: block;width:154px;" />
				</td>
			</tr>
			<tr>
				<td bgcolor="#ffffff">
					<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td><p style="font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:22px;letter-spacing:-0.8px;color:#424244;">인증 번호 발송 메일입니다.</p></td>
					</tr>
					<tr>
						<td style="font-family: Arial, sans-serif, Open Sans;color:#424244;font-size:14px;">
						요청하신 인증번호는 아래와 같습니다.

						</td>
					</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td align="center" style="text-aling:center;vertical-align: middle;padding:20px 0px;">
					<div style="border:1px solid #e5e5e5;padding:20px 30px;">
						<p style="font-family: Arial, sans-serif, Open Sans;font-size:18px;text-align:center;color:#424244;">
						인증번호 : <span style="color:#ee323e;">'.$code.'</span>
						</p>

					</div>
				</td>
			</tr>
			<tr>
				<td>
					<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td><p style="font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:22px;letter-spacing:-0.8px;color:#424244;">인증번호는 3분 후에 사용 불가합니다.</p></td>
					</tr>
					<tr>
						<td style="color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:14px;">
							<a href="https://www.59uare.com" style="text-decoration: none;">스퀘어 홈페이지</a> 또는 <a href="https://www.59uare.com" style="text-decoration: none;">인스타그램</a>에서 보다 다양한 정보를 확인하실 수 있습니다.
						</td>
					</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="padding-top:50px;padding-bottom:20px;">
					<div style="background:#e5e5e5;height:2px;"></div>
				</td>
			</tr>
			<tr>
				<td>
					<div style="text-align:center;color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:12px;">© KPR Inc. All rights reserved.</div>
				</td>
			</tr>
			</table>
		</td>
	</tr>
	</table>
	</body>
</html>
';

?>
