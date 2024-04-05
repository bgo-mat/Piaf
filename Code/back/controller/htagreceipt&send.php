<?php

include "../model/hashtag.php";

use hashtag\Hashtag;

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

$postID =  isset($requestData['post_id']) ? $requestData['post_id'] : '';

$hashtagReceipt = isset($requestData['hashtag']) ? $requestData['hashtag'] : '';

$hashtagSend = new Hashtag();

for ($i = 0; $i < count($hashtagReceipt); $i++) {
    $hashtagSend->body = $hashtagReceipt[$i];
    $result = $hashtagSend->lookForIdHashtag();
    if (!empty($result)) {
        $hashtagSend->htag_id = $result[0]["id"];
        $hashtagSend->post_id = $postID;
        $hashtagSend->insertIntoJoinhashtag();
    } else {
        $id_htag = $hashtagSend->insertHashtag();
        $hashtagSend->htag_id = $id_htag;
        $hashtagSend->post_id = $postID;
        $hashtagSend->insertIntoJoinhashtag();
    }
}




/*$joinhtag = new Hashtag();
$joinhtag->body = $hashtagReceipt;
$idhtag = $joinhtag->lookForIdHashtag();

$sendIntoJoinHashtag = new Hashtag();
$sendIntoJoinHashtag->post_id = $postID;
$sendIntoJoinHashtag->htag_id = $idhtag;
$sendIntoJoinHashtag->insertIntoJoinhashtag();*/


echo json_encode($hashtagReceipt);
