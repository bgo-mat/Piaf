<?php

use user\User;
use post\Post;

include "../model/user.php";
require_once("../model/post.php");


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
$RequestData = json_decode(file_get_contents("php://input"), true);
$token = isset($RequestData['token']) ? $RequestData['token'] : '';
$id_post = isset($RequestData['id_post']) ? $RequestData['id_post'] : '';


$userMod->tokenConnexion = json_decode($token);
$user_id = $userMod->findUserWithToken();
$id_user = $user_id[0]['user_id'];
$postModel = new Post();
$checkUserLikePost = $postModel->checkIfUserLikePost($id_user, $id_post);

if ($checkUserLikePost === false) {
    $result = $postModel->insertLikeFromPost($id_post, $id_user);
} else {
    $result = $postModel->deleteLikeFromPost($id_post, $id_user);
}


$like = $postModel->selectLikeFromPost($id_post);

echo json_encode($like);
