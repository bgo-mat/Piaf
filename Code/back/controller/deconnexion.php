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

$deconnexionModel = new User();
//on recupere l'id de l'user avec son token
$deconnexionModel->tokenConnexion = json_decode($token);
$user_id = $deconnexionModel->findUserWithToken();

//Si id il y a on delete le token
if ($user_id) {
    $result = $deconnexionModel->deleteToken($user_id[0]['user_id']);

    echo json_encode(true);
} else {
    echo json_encode($user_id);
}
