<?php

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

$prompt = $requestData["prompt"];
$param = $requestData["param"];


function call($message, $p)
{

    if ($p === 1) {
        $prompt = "Corrige ce texte :" . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la correction directe de l'orthographe, 
        de la grammaire et de la conjugaison en français. Tu réponds uniquement avec les
        corrections nécessaires, sans introductions ni commentaires supplémentaires.
        Tu fournis des réponses détaillées et précises, en mettant l'accent sur 
        l'exactitude linguistique et la clarté de l'expression.";
        $temperature = 0.5;
        $token = 50;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 2.1) {
        $prompt = "Traduis ce texte du français vers l'anglais:" . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la traduction de
         textes. Tu traduis de manière précise et fluide du français
         vers l'anglais, en conservant le sens et le ton original du message.
         Tu fournis des traductions claires, naturelles, et fidèles au 
         texte source, sans introductions ni commentaires supplémentaires.";
        $temperature = 0.5;
        $token = 50;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 2.2) {
        $prompt = "Traduis ce texte du français vers l'espagnol:" . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la traduction de textes. 
        Tu traduis de manière précise et fluide du français vers l'espagnol, en conservant le 
        sens et le ton original du message. Tu fournis des traductions claires, naturelles, et 
        fidèles au texte source, sans introductions ni commentaires supplémentaires.";
        $temperature = 0.5;
        $token = 50;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 2.3) {
        $prompt = "Traduis ce texte du français vers l'allemand:" . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la traduction de textes. 
        Tu traduis de manière précise et fluide du français vers l'allemand, en conservant
         le sens et le ton original du message. Tu fournis des traductions claires, naturelles,
         et fidèles au texte source, sans introductions ni commentaires supplémentaires.";
        $temperature = 0.5;
        $token = 50;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 3) {
        if($message===""){
            $message="Commente un sujet drole en t'ispirant des actualités de la semaines (fait une recherche sur internet)";
        }
        $prompt = "crée moi un post twitter virale, intégre les hashtag pour une meilleur pertinence
         auprès de mon audience. Je veux que le tweet sois simple, vulgarise un maximum les propos.
         Fait une recherche sur internet si besoin. Ne met pas ta réponse entre guillemet. Le sujet est celui ci :" . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la création de contenus viraux pour Twitter. 
        Ton objectif est de formuler des messages attrayants, pertinents et facilement compréhensibles
         pour une large audience. Tu intègres des hashtags tendance pour augmenter la visibilité du tweet.
         Tu adaptes le langage pour qu'il soit simple et direct, tout en restant fidèle au sujet fourni. 
         Tu es créatif et sais capter l'attention, en mettant l'accent sur la pertinence et l'impact du message. 
         Tu répondras sans introductions ni commentaires supplémentaires";
        $temperature = 1;
        $token = 100;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 4) {
        $prompt = "Fait une recherche sur internet si besoin. Ajoute 4 hashtags 
        pertinents à la fin de ce post : " . $message;
        $system = "Tu es un assistant virtuel spécialisé dans la génération de hashtags pour les 
        réseaux sociaux. Ta tâche est d'ajouter à la fin du message de l'utilisateur une série de hashtags 
        pertinents, populaires et tendance. Tu analyses le contenu du message pour comprendre le sujet, le 
        ton et les éléments clés, et tu génères des hashtags directement liés à ces aspects. Ta réponse doit 
        être composée du message original de l'utilisateur suivi immédiatement des hashtags suggérés, sans 
        introductions supplémentaires ou modifications du message original.";
        $temperature = 1;
        $token = 120;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 5) {
        $prompt = "Fait une recherche sur internet si besoin. Enjolive ce tweet en ajoutant des émojis. 
        s'il n'y en as pas, ajoute 2 hashtag pertinents, populaires et tendance : " . $message;
        $system = "Tu es un assistant virtuel spécialisé dans l'enjolivement de tweets. 
        Ta tâche est d'ajouter des émojis pour rendre le tweet plus attrayant et expressif. 
        Tu identifies les mots-clés ou les phrases importantes pour les mettre en évidence, 
        et tu sélectionnes des émojis appropriés qui correspondent au ton et au sujet du tweet.
         Ta réponse doit être le tweet original de l'utilisateur, mais amélioré avec ces éléments visuels, 
         sans introductions supplémentaires ou modifications du contenu original.";
        $temperature = 1;
        $token = 120;
        $model = "gpt-4-0125-preview";
        $endpoint = "https://api.openai.com/v1/chat/completions";
        $param = 1;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }

    if ($p === 6) {
        $prompt = "Tu es un modèle DALL-E spécialisé dans la création d'images basées sur des descriptions 
        textuelles. Tu interprètes le tweet fourni et génères une image qui représente visuellement le contenu
         et le ton du tweet. L'image doit être pertinente, créative et capturer l'essence du message.l'image ne
          doit absolument pas contenir de texte. Génère une image illustrant ce tweet : " . $message;
        $system = "";
        $temperature = 1;
        $token = 120;
        $model = "dall-e-3";
        $endpoint = "https://api.openai.com/v1/images/generations";
        $param = 2;
        return executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param);
    }
}

function executeCall($prompt, $system, $temperature, $token, $model, $endpoint, $param)
{
    $endpoint = $endpoint;
    $apiKey = "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";

    if ($param === 1) {
        $data = array(
            "model" => $model,
            "messages" => array(
                array(
                    "role" => "system",
                    "content" => $system
                ),
                array(
                    "role" => "user",
                    "content" => $prompt
                )
            ),
            "max_tokens" => $token,
            "temperature" => $temperature
        );
    } elseif ($param === 2) {
        $data = array(
            "model" => $model,
            "prompt" => $prompt,
            "n" => $temperature,
            "size" => "1024x1024"
        );
    }



    $headers = array(
        "Content-Type: application/json",
        "Authorization: Bearer " . $apiKey
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}


$val = call($prompt, $param);

$result = [
    'response' => $val,
];



echo json_encode($result);
