<?php

use user\User;
use post\Post;

include "../model/user.php";
require_once("../model/post.php");

header("Content-type: application/json");

// CORS headers
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

$checkUserLikePost = $postModel->countRetweet($id_post, $id_user);

echo json_encode($checkUserLikePost);
