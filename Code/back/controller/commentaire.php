<?php

use post\Post;
use user\User;

require_once("../model/post.php");
require_once("../model/user.php");

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
$requestData = json_decode(file_get_contents("php://input"), true);

$tokenUser = isset($requestData['token']) ? $requestData['token'] : '';
$post = isset($requestData['text']) ? $requestData['text'] : '';
$post_id = isset($requestData['post_id']) ? $requestData['post_id'] : '';

$userMod = new User();
$userMod->tokenConnexion = json_decode($tokenUser);
$userId = $userMod->findUserWithToken();
$id_user = $userId[0]['user_id'];


$postModel = new Post();

$status = "1";

$sendValue = $postModel->insertCommentaireFromPost($post_id, $id_user, $post, $status);
