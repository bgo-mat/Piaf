<?php

use post\Post;
use user\User;

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
$userModel = new User();

$RequestData = json_decode(file_get_contents("php://input"), true);
$offset = isset($RequestData['offset']) ? $RequestData['offset'] : 0;
$limit = isset($RequestData['limit']) ? $RequestData['limit'] : 10;
$token = isset($RequestData['token']) ? $RequestData['token'] : '';
$otherId = isset($RequestData['otherId']) ? $RequestData['otherId'] : '';
$htag = isset($RequestData['hashtag']) ? $RequestData['hashtag'] : '';




$finalTab = [];


if (!empty($htag)) {
    $result = $postMod->getPostsFromHashtag($htag, $limit, $offset);
} elseif ($otherId && !$token) {
    $result = $postMod->getAllTweetMyProfil($otherId, $limit, $offset);
} elseif ($token) {
    $userModel->tokenConnexion = json_decode($token);
    $user_id = $userModel->findUserWithToken();
    $id_user = $user_id[0]['user_id'];
    $result = $postMod->getAllTweetMyProfil($id_user, $limit, $offset);
} else {
    $result = $postMod->getAllTweet($limit, $offset);
}

foreach ($result as $post) {
    $like = $postMod->selectLikeFromPost($post[0]);
    $commentaire = $postMod->countCommentFromPost($post[0]);
    $retweet = $postMod->countRetweetsFromPost($post[0]);
    $finalTab[] = [
        'post' => $post,
        'likes' => $like,
        'commentaire' => $commentaire,
        'retweet' => $retweet
    ];
}

echo json_encode($finalTab);
