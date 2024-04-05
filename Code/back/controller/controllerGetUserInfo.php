<?php

use user\User;
use user\Follow;

include "../model/user.php";
include "../model/follow.php";
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

$userMod = new User();
$followMod = new Follow();
$RequestData = json_decode(file_get_contents("php://input"), true);
$token = isset($RequestData['token']) ? $RequestData['token'] : '';

$userMod->tokenConnexion = json_decode($token);
$user_id = $userMod->findUserWithToken();
/*$follow = $user*/
$val = $userMod->getInfoUser($user_id[0]['user_id']);

$toto = $followMod->getFollowFromUser($user_id[0]['user_id']);
$totoFollowed = $followMod->getFollowerFromUser($user_id[0]['user_id']);


$new = [];
array_push($new, $toto);
array_push($new, $val);
array_push($new, $totoFollowed);


echo json_encode($new);
