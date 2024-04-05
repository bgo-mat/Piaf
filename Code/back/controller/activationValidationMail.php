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
            header("Access-Control-Allow-Headers: Accept, Content-Type,
             Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
        }
        exit(0);
    }
}
$RequestData = json_decode(file_get_contents("php://input"), true);

$token = isset($RequestData['token']) ? $RequestData['token'] : '';

//FIND USER WITH TOKEN

$tokenVerificationModel = new User();
$tokenVerificationModel->tokenConnexion = $token;


$user_id = $tokenVerificationModel->findUserWithToken();

$result = $tokenVerificationModel->tokenVerificationMail($user_id[0]['user_id']);

if ($result[0]["token_connexion"] === $token) {
    $tokenVerificationModel->emailStatus = "1";
    $tokenVerificationModel->status = "1";
    $result2 = $tokenVerificationModel->activeAccount($user_id[0]['user_id']);

    echo json_encode("bienvenu");
} else {
    echo json_encode("aucun token trouver");
}
