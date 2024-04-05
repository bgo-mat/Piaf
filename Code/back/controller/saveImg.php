<?php

include "../model/user.php";
use user\User;

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
            header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
        }
        exit(0);
    }
}

$bio = isset($_POST['bio']) ? $_POST['bio'] : '';
$token = isset($_POST['token']) ? trim($_POST['token'], '"') : '';
$ban = isset($_POST['banniere']) ? trim($_POST['banniere'], '"') : '';
$av = isset($_POST['avatar']) ? trim($_POST['avatar'], '"') : '';


// URLs par défaut
if ($av) {
    $defaultAvatarURL = $av;
} else {
    $defaultAvatarURL = "http://localhost:8000/img/default/profil.png";
}
if ($ban) {
    $defaultBanniereURL = $ban;
} else {
    $defaultBanniereURL = "http://localhost:8000/img/default/banniere.jpg";
}


$avatarDir = "../img/avatar/";
$banniereDir = "../img/banniere/";

$response = [];
// Avatar
if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] == 0) {
    if (!is_dir($avatarDir)) {
        mkdir($avatarDir, 0777, true);
    }
    $avatarFileName = basename($_FILES['avatar']['name']);
    $avatarPath = $avatarDir . $avatarFileName;
    $avatarURL = "http://localhost:8000/img/avatar/" . $avatarFileName;
    if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $avatarPath)) {
        $avatarURL = $defaultAvatarURL;
    }
} else {
    $avatarURL = $defaultAvatarURL;
}

// Bannière
if (isset($_FILES['banniere']) && $_FILES['banniere']['error'] == 0) {
    if (!is_dir($banniereDir)) {
        mkdir($banniereDir, 0777, true);
    }
    $banniereFileName = basename($_FILES['banniere']['name']);
    $bannierePath = $banniereDir . $banniereFileName;
    $banniereURL = "http://localhost:8000/img/banniere/" . $banniereFileName;
    if (!move_uploaded_file($_FILES['banniere']['tmp_name'], $bannierePath)) {
        $banniereURL = $defaultBanniereURL;
    }
} else {
    $banniereURL = $defaultBanniereURL;
}

$imgDirModel = new User();
$imgDirModel->tokenConnexion = $token;
$userId = $imgDirModel->findUserWithToken();
$imgDirModel->bio = $bio;
$imgDirModel->avatarDir = $avatarURL;
$imgDirModel->banniereDir = $banniereURL;
$imgDirModel->saveImgDir($userId[0]['user_id']);

echo json_encode($response);
