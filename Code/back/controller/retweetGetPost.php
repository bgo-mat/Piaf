<?php

use post\Post;

include "../model/post.php";
include "../model/user.php";

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

$postMod = new Post();


$RequestData = json_decode(file_get_contents("php://input"), true);
$value = isset($RequestData['post_id']) ? $RequestData['post_id'] : '';


$retweet = $postMod->getPostbyPostId($value);

echo json_encode($retweet);
