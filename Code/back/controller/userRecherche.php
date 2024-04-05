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
$requestData = json_decode(file_get_contents("php://input"), true);

$username = isset($requestData['username']) ? $requestData['username'] : '';
$userMod = new User();
$followMod = new Follow();
if ($username === "") {
    echo json_encode("aucun utilisateur trouvé");
} else {
    $userMod->username = $username;
    $result = $userMod->searchUserWithPseudo();

    $finalTab = [];
    for ($i = 0; $i < count($result); $i++) {
        $follow = $followMod->getFollowerFromUser($result[0][0]);
        $followed = $followMod->getFollowFromUser($result[0][0]);
        $finalTab[] = [
            'user' => $result,
            'follow' => $follow,
            'followed' => $followed
        ];
    }

    echo json_encode($finalTab);
}
