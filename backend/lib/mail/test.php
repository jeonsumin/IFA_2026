<?php
date_default_timezone_set('Asia/Seoul');

require './phpmailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->SMTPSecure = 'tls';

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "hello@59uare.com";

//Password to use for SMTP authentication
$mail->Password = "99c974799c";

//Set who the message is to be sent from
$mail->setFrom('hello@59uare.com', '서비스관리자');

//Set an alternative reply-to address
//$mail->addReplyTo('ekfqkqhd@naver.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress('studio99c.dev@gmail.com');

//Set the subject line
$mail->Subject = 'PHPMailer GMail SMTP test';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body

$message = '
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
					<img src="https://lh3.googleusercontent.com/tU75o2x7LHHxa-Qg9nPerYkEWTZwNW5av1QZfD71X2i4TTlCTfNLEr0n6bWzRm6FpRyO6aW8zlNd1Rs34dziboIUw4q0uiEEQDq_a3XOv82zkxcOGa_lGBtrUjxfA1sP2zZyJQBeHajja6EIWrA0Nqb0mVfvxBzENRu98qIRDIdzZ3-vieunNgCNvCagy5nbmOOCMKHHrlAfdPejdgOizA439QtSsLFISfUGaE5aH7WsT7tahulosmwyxYHQ1QUpDQqnFNlIDPf3x1w4YmRm0T1sJvj2aorNAZ9RO1jLiOcniPD55Jioj_javugdzZ66zNaR8ibp2sYj5uX_23TM-Elf8eAQ__br0aEjO6eqv_lGY4BuX4g6TOZi05tOOpxuK4W55it_shv-wOEXH5NzNiz6g7ceLQGG4OndRuXOJXNFIXe5V01FLLEBNiYhmZLVGXr37-_wloYafLZZPCnU6wLkfbaKACnP8TYWui7ZUe_bPbe3A2GLwXHl8h9BYdXOHs5bVSkGEuhxVQCT4t00JTEp5vFRWoWzQZSnDjr8X6ChdWLYOv4uuuymABuiE25CsreWHPrN9F6wMvuh7_SdiXw9qi4FN_8qyzkwKcKcJvv4RKrdCX6GkxrVBCK7AvvSE_jSbhLtXJdh9zZhmO-GM0HXvxePGw=w154-h51-no" alt="59UARE" title="logos" style="display: block;width:154px;" />
				</td>
			</tr>
			<tr>
				<td bgcolor="#ffffff">
					<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td><p style="font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:22px;letter-spacing:-0.8px;color:#424244;">서비스 가입을 위한 이메일 인증입니다.</p></td>
					</tr>
					<tr>
						<td style="font-family: Arial, sans-serif, Open Sans;color:#424244;font-size:14px;">
						안녕하세요. 스퀘어 입니다.<br>
						이메일로 회원가입을 하신 고객님을 위한 인증 절차입니다.<br>
						하단의 버튼을 누르시면 인증 절차가 완료되며,<br>
						회원 가입을 완료하시면 스퀘어를 사용하실 수 있습니다.

						</td>
					</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="height:140px;">
					<a href="#" style="text-decoration: none;">
						<div style="width:220px;background:#ee323e;padding:14px 20px 16px 20px;color:#ffffff;font-weight:bold;font-family: Arial, sans-serif, Open Sans;font-size:20px;letter-spacing:-0.8px;text-align:center;vertical-align:center;">
							이메일 인증하기
						</div>
					</a>
				</td>
			</tr>
			<tr>
				<td>
					<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td><p style="font-family: Arial, sans-serif, Open Sans;font-weight:bold;font-size:22px;letter-spacing:-0.8px;color:#424244;">혹시 이메일을 요청하지 않으셨나요?</p></td>
					</tr>
					<tr>
						<td style="color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:14px;">
						걱정하지 마세요. 이메일 주소가 실수로 입력되었을 수 있습니다.<br>
						해당 이메일을 무시하거나, 삭제하시면 됩니다.

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
					<div style="text-align:center;color:#424244;font-family: Arial, sans-serif, Open Sans;font-size:12px;">© STUDIO 99C Inc. All rights reserved.</div>
				</td>
			</tr>
			</table>
		</td>
	</tr>
	</table>
	</body>
</html>

';


$mail->msgHTML($message, dirname(__FILE__));

//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';

//Attach an image file

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}


?>
