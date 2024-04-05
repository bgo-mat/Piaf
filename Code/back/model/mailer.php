<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

class UserController
{
    public function sendConfirmationEmail($toEmail, $toName, $confirmationCode, $token)
    {
        $mail = new PHPMailer(true);
        try {
            // Configuration du serveur SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 't35982061@gmail.com';
            $mail->Password = 'gtrcfrvgscprdliw ';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Destinataires
            $mail->setFrom('t35982061@gmail.com', 'Piaf');
            $mail->addAddress($toEmail, $toName);

            // Contenu
            $mail->isHTML(true);
            $mail->Subject = 'Confirmation d\'inscription';
            $mail->Body = '<html>

<head>
    <title>Welcome Email</title>
    <style>
body{background-color:#f4f4f4;margin:0;padding:0;display:flex;justify-content:center;
    align-items:center;height:100vh;font-family:"Roboto",sans-serif}a{text-decoration:none;
    color:#fff !important}.blocLogo{margin-bottom:10px}.blocLogoMail{border-bottom:1px
     #000 solid}.text{color:#000}p{margin-top:40px;text-decoration:none;color:#000
     }.logo{margin:0;width:5vw;color:#fff}h2{margin-bottom:10px;color:#000}.blocLogoMail
     {display:flex;justify-content:center;flex-direction:column;align-items:center}.card{
     background:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.1);width:530px;padding:20px}
     .twitter-logo{height:30px;margin-bottom:20px}.button{background-color:#000;color:#fff;border:none;
     padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;
     margin:10px 0;cursor:pointer;border-radius:20px;width:100%}
</style>
</head>
<body>
<div class="card">
    <div class="blocLogoMail">
        <div class="blocLogo">
            <img src=" " alt="logo" class="logo">
        </div>

        <h2>Confirmation de votre compte</h2>
    </div>

    <p class="p text">Hey ' . $toName . ',</p>
    <p>Félicitations et bienvenue ! Pour activer votre compte et commencer votre expérience, 
    veuillez cliquer sur le lien de confirmation ci-dessous.</p>

    <button class="button"><a href="http://localhost:3000/mainPage?token=' . $token . '&status=0"
     class="a">Confirmer mon compte</a></button>
</div>
</body>
</html>';



            $mail->send();
        } catch (Exception $e) {
            echo "L'envoi du message a échoué. Erreur : {$mail->ErrorInfo}";
        }
    }

    public function sendResetPasswordMail($toEmail)
    {
        $mail = new PHPMailer(true);
        try {
            // Configuration du serveur SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 't35982061@gmail.com';
            $mail->Password = 'gtrcfrvgscprdliw ';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Destinataires
            $mail->setFrom('t35982061@gmail.com', 'Piaf');
            $mail->addAddress($toEmail);

            // Contenu
            $mail->isHTML(true);
            $mail->Subject = 'Réinitialisation de votre mot de passe';
            $mail->Body = '<html>

<head>
    <title>Welcome Email</title>
    <style>
body{background-color:#f4f4f4;margin:0;padding:0;display:flex;justify-content:center;
align-items:center;height:100vh;font-family:"Roboto",sans-serif}a{text-decoration:none;
color:#fff !important}.blocLogo{margin-bottom:10px}.blocLogoMail{border-bottom:1px #000 solid
}.text{color:#000}p{margin-top:40px;text-decoration:none;color:#000}.logo{margin:0;width:5vw;color:#fff
}h2{margin-bottom:10px;color:#000}.blocLogoMail{display:flex;justify-content:center;
flex-direction:column;align-items:center}.card{background:#fff;border-radius:8px;
box-shadow:0 4px 8px rgba(0,0,0,.1);width:530px;padding:20px}.twitter-logo{height:30px;
margin-bottom:20px}.button{background-color:#000;color:#fff;border:none;padding:10px 20px;
text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:10px 0;
cursor:pointer;border-radius:20px;width:100%}
</style>
</head>
<body>
<div class="card">
    <div class="blocLogoMail">
        <div class="blocLogo">
            <img src=" " alt="logo" class="logo">
        </div>

        <h2>Modification de mot de passe</h2>
    </div>

    <p class="p text">Hey </p>
    <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe et continuer à
     accéder en toute sécurité à votre compte.</p>

    <button class="button"><a href="http://localhost:3000/forgetpassword" 
    class="a">Modifier mon mot de passe</a></button>
</div>
</body>
</html>';



            $mail->send();
        } catch (Exception $e) {
            echo "L'envoi du message a échoué. Erreur : {$mail->ErrorInfo}";
        }
    }
}
