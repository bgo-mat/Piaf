<?php

include "../model/user.php";

use user\User;

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
            header("Access-Control-Allow-Headers: Accept, Content-Type,
             Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
        }
        exit(0);
    }
}

$requestData = json_decode(file_get_contents("php://input"), true);

$email = $requestData["email"];

$password = $requestData["password"];

$salt = "vive le projet tweet_academy";

$hash = hash('ripemd160', $password . $salt);

$connect = new User();
$connect->email = $email;

$tabResult = [];

$token = bin2hex(openssl_random_pseudo_bytes(16));

$passwordByEmail = $connect->connexionVerification();

if ($passwordByEmail[0]['pass'] === $hash) {
    $connect->tokenConnexion = $token;
    $connect->tokenInscription($passwordByEmail[0]['id']);
    $tabResult = [
        "token" => $token,
        "info" => $passwordByEmail
    ];
    echo json_encode($tabResult);
} else {
    echo json_encode(false);
}
