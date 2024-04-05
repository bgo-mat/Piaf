<?php

namespace post;

use PDO;
use db\Modeldatabase;

require_once "../dbConnexion/dbConnexion.php";

class Post extends Modeldatabase
{
    public $image;
    public $texte;
    public $timestamp;
    public $id_user;
    public $status;
    public $htag;
    public $htag_id;
    public $post_id;

    public function getAllImage($post_id)
    {
        $query = "SELECT images_url FROM images
                  WHERE images.post_id = :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function getAllTweet($limit, $offset)
    {
        $query = "SELECT * FROM post
              JOIN user ON post.user_id = user.id
              ORDER BY post.created_at DESC
              LIMIT :limit OFFSET :offset";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();
        foreach ($result as $key => $r) {
            $result[$key]['images'] = $this->getAllImage($r['id']);
        }
        return $result;
    }
    public function getAllTweetMyProfil($user_id, $limit, $offset)
    {
        $query = "SELECT * FROM post
              JOIN user ON post.user_id = user.id
              WHERE user_id = :user_id
              ORDER BY post.created_at DESC
              LIMIT :limit OFFSET :offset";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();
        foreach ($result as $key => $r) {
            $result[$key]['images'] = $this->getAllImage($r['id']);
        }
        return $result;
    }
    function getPostsFromHashtag($hashtags, $limit, $offset)
    {
        $query = "SELECT p.*, user.id AS user_id, user.username, user.photo_user
        FROM post p
        INNER JOIN user ON p.user_id = user.id
        INNER JOIN joinhtag jh ON p.id = jh.post_id
        INNER JOIN htag h ON jh.htag_id = h.id
        WHERE h.body = :hashtag
        LIMIT :limit OFFSET :offset";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':hashtag', $hashtags, PDO::PARAM_STR);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result =  $stmt->fetchAll();
        foreach ($result as $key => $r) {
            $result[$key]['images'] = $this->getAllImage($r['id']);
        }
        return $result;
    }



    public function sendPost()
    {
        $query = "INSERT INTO post (body, user_id, created_at, status)
                      VALUES  (:text, :id_user, NOW(), :status);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':text', $this->texte);
        $stmt->bindParam(':id_user', $this->id_user);
        $stmt->bindParam(':status', $this->status);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }
    public function sendHtag()
    {
        $query = "INSERT INTO htag (body) VALUES (:htag);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':htag', $this->htag);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }
    public function sendInJoinHtag()
    {
        $query = "INSERT INTO htag (htag_id,post_id) VALUES (:htag_id,:post_id);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':htag_id', $this->htag_id);
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }

    public function sendImage()
    {
        $query = "INSERT INTO images (post_id,images_url) VALUES (:post_id,:image);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }

    //LIKE
    public function selectLikeFromPost($post_id)
    {
        $query = "SELECT count(likes.post_id) FROM likes 
                  JOIN post ON likes.post_id = post.id 
                   WHERE likes.post_id = :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function checkIfUserLikePost($userId, $post_id)
    {
        $query = "SELECT COUNT(*) AS userLikesPost FROM likes
              WHERE likes.post_id = :post_id AND likes.user_id = :user_id;";

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['userLikesPost'] > 0;
    }

    public function insertLikeFromPost($post_id, $user_id)
    {
        $query = "INSERT INTO likes (user_id, post_id, created_at) VALUES (:user_id, :post_id, NOW());";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    }
    public function deleteLikeFromPost($post_id, $user_id)
    {
        $query = "DELETE FROM likes WHERE user_id = :user_id AND post_id = :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        // Vérifier si la suppression a été effectuée
        if ($stmt->rowCount() > 0) {
            return "Le like a été supprimé.";
        } else {
            return "Aucun like correspondant à supprimer.";
        }
    }

    //COMMENTAIRES
    public function insertCommentaireFromPost($post_id, $user_id, $texte, $status)
    {
        $query = "INSERT INTO post (body, user_id, post_id,  created_at, status)
                  VALUES  (:text, :id_user, :post_id, NOW(), :status);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':id_user', $user_id);
        $stmt->bindParam(':text', $texte);
        $stmt->bindParam(':status', $status);


        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function getAllCommentFomPost($post_id)
    {
        $query = "SELECT * FROM post 
                  WHERE post_id = :post_id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function countCommentFromPost($post_id)
    {
        $query = "SELECT count(post_id) FROM post
                  WHERE post_id= :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function deleteCommentFromPost($post_id, $user_id)
    {
        $query = "DELETE FROM post WHERE user_id = :user_id AND post_id = :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    }
  //RETWEET
    public function countRetweetsFromPost($post_id)
    {
        /*$query = "SELECT COUNT(id) AS retweet_count FROM post
                 WHERE post_id = :post_id;";*/

        $query = "SELECT COUNT(*) FROM post WHERE post_id = :post_id AND body = '';";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }


    public function getPostById($post_id)
    {
        $query = "SELECT * FROM post
                 WHERE id = :post_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }

    public function getPostbyPostId($post_id)
    {
        $query = "SELECT * FROM post WHERE id = (SELECT post_id FROM post WHERE id = :post_id );";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }

    public function countRetweet($post_id, $id_user)
    {
        $query = "SELECT COUNT(*) FROM post WHERE post_id = :post_id AND user_id = :id_user";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':post_id', $post_id);
        $stmt->bindParam(':id_user', $id_user);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
}
