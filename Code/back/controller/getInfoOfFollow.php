<?php

use user\User;
use user\Follow;

include "../model/user.php";
include "../model/follow.php";


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

$requestData = json_decode(file_get_contents("php://input"), true);

$tokenUser = isset($requestData['tokenUser']) ? $requestData['tokenUser'] : '';
$idOther = isset($requestData['idOther']) ? $requestData['idOther'] : '';
$resultFollower = [];
$resultFollowed = [];


if ($tokenUser) {
    $userMod->tokenConnexion = json_decode($tokenUser);
    $userId = $userMod->findUserWithToken();
    $idFollower = $userId[0]['user_id'];
    $resultFollower = $followMod->getInfoFollowerFromUser($idFollower);
    $resultFollowed = $followMod->getInfoFollowedFromUser($idFollower);
} elseif ($idOther) {
    $idFollower = $idOther;
    $resultFollower = $followMod->getInfoFollowerFromUser($idFollower);
    $resultFollowed = $followMod->getInfoFollowedFromUser($idFollower);
}

$resultFollow = [
    "Follower" => $resultFollower,
    "Followed" => $resultFollowed
];




echo json_encode($resultFollow);
