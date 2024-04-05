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

$imgURLs = $_POST['img'] ?? '';
$token = $_POST['user_id'] ?? '';
$post_id = $_POST['post_id'] ?? '';

$imgPostDir = "../img/post/";

if (!is_dir($imgPostDir)) {
    mkdir($imgPostDir, 0777, true);
}

if ($imgURLs != "") {
    $userModel = new User();
    $userModel->tokenConnexion = json_decode($token);
    $user_id = $userModel->findUserWithToken();

    $postModel = new Post();
    $postModel->id_user = $user_id[0]['user_id'];

    foreach ($imgURLs as $imageUrl) {
        $extension = strtolower(pathinfo($imageUrl, PATHINFO_EXTENSION));
        $filename = uniqid("post_", true) . '.' . $extension;
        $filePath = $imgPostDir . $filename;
        file_put_contents($filePath, file_get_contents($imageUrl));
        $imgURL = "http://localhost:8000/img/post/" . $filename;

        $postModel->image = $imgURL;
        $postModel->post_id = $post_id;
        $postModel->sendImage();
    }

    $retour = "ok";
} else {
    $retour = "erreur";
}

echo json_encode($retour);
