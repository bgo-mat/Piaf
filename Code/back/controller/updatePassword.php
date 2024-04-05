<?php

use user\User;

include "../model/user.php";
include "../model/mailer.php";


header("Content-type: application/json");

if (isset($_SERVER['HTTP_REFERER'])) {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');


    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }


    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
        }

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
        }
        exit(0);
    }
}

$RequestData = json_decode(file_get_contents("php://input"), true);

$email = isset($RequestData['email']) ? $RequestData['email'] : '';
$password = isset($RequestData['password']) ? $RequestData['password'] : '';

$salt = "vive le projet tweet_academy";


$hashedPassword = hash('ripemd160', $password . $salt);
$inscriptionModel = new User();

$inscriptionModel->email = $email;
$inscriptionModel->password = $hashedPassword;
$result = $inscriptionModel->updatePassword();


echo json_encode($result);
