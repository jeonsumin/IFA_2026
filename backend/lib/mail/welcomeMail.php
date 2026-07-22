<?php

require './phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.office365.com';
$mail->Port       = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth   = true;
$mail->Username = 'info@kpr.co.kr';
$mail->Password = 'Pr1989!@';
$mail->SetFrom('info@kpr.co.kr', '시스템관리자');
$mail->addAddress('minheejung@brightbell.co.kr', 'ToEmail');
$mail->SMTPDebug  = 3;
$mail->Debugoutput = function($str, $level) {echo "debug level $level; message: $str";}; //$mail->Debugoutput = 'echo';
$mail->IsHTML(true);

$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}


?>