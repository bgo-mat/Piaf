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
$post = $_POST['post'] ?? '';
$gif = $_POST['gif'] ?? '';
$token = $_POST['user_id'] ?? '';
$userModel = new User();
$userModel->tokenConnexion = json_decode($token);
$user_id = $userModel->findUserWithToken();
$imgPostDir = "../img/post/";
$imgURLs = [];
if (!empty($_FILES['img']['name'])) {
    if (!is_dir($imgPostDir)) {
        mkdir($imgPostDir, 0777, true);
    }
    $fileCount = count($_FILES['img']['name']);
    for ($i = 0; $i < $fileCount; $i++) {
        $error = $_FILES['img']['error'][$i];
        if ($error === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['img']['tmp_name'][$i];
            $name = $_FILES['img']['name'][$i];
            $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            $validExtensions = ['jpg', 'jpeg', 'png'];
            error_log("Number of files received: " . count($_FILES['img']['name']));
            if (in_array($extension, $validExtensions)) {
                $filename = uniqid("post_", true) . '.' . $extension;
                $filePath = $imgPostDir . $filename;
                if (move_uploaded_file($tmpName, $filePath)) {
                    $imgURLs[] = "http://localhost:8000/img/post/" . $filename;
                }
            }
        }
    }
}

$postModel = new Post();

$postModel->texte = $post;
$postModel->id_user = $user_id[0]['user_id'];
$postModel->status = "1";
$result = $postModel->sendPost();

foreach ($imgURLs as $img) {
    $postModel->image = $img;
    $postModel->post_id = $result;
    $postModel->sendImage();
}

echo json_encode($result);
