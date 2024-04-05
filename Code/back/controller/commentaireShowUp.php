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

$post_id = isset($requestData['id_post']) ? $requestData['id_post'] : '';

$postModel = new Post();
$sendValue = $postModel->getPostById($post_id);

echo json_encode($sendValue);
