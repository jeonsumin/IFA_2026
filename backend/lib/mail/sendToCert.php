<?php
$mail_html = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>HTML Email Template</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
	<!-- OUTERMOST CONTAINER TABLE -->
	<table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
		<tr>
			<td>

			<!-- 600px - 800px CONTENTS CONTAINER TABLE -->
			<table border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
					<td>
						<a href="http://www.kpr.co.kr" target="_blank"><img src="http://kprerp.brightbell.co.kr/img/logo/kpr_logo.png" alt="dotmeeting" title="logos" style="display: block;" /></a>
					</td>
				</tr>
				<tr>
					<td bgcolor="#ffffff" style="padding-top:10px;text-align:center;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td><p style="text-align:center;font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:32px;letter-spacing:-0.8px;color:#424244;">인증 번호 발송 메일입니다.</p></td>
						</tr>
						<tr>
							<td style="text-align:center;font-family: Arial, sans-serif, Open Sans;color:#424244;font-size:14px;padding:10px 0px;">
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
							인증번호 : <span style="color:#ee323e;">'.$key.'</span>
							</p>

						</div>
					</td>
				</tr>
				<tr>
					<td style="text-align:center;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td><p style="text-align:center;font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:22px;letter-spacing:-0.8px;color:#424244;">인증번호는 3분 후에 사용 불가합니다.</p></td>
						</tr>
						<tr>
							<td style="text-align:center;color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:14px;padding-top:10px;">
								인증번호를 시스템에 입력해주세요.
							</td>
						</tr>
						</table>
					</td>
				</tr>

				<tr>
					<td style="padding-top:50px;padding-bottom:20px;">
					</td>
				</tr>
				
				<tr>
					<td style="text-align:center;color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:12px;border-top:1px solid #e5e5e5;padding-top:20px;">
						© KPR Inc. All rights reserved.
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
