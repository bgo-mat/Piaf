<?php

namespace Hashtag;

use db\Modeldatabase;

require_once "../dbConnexion/dbConnexion.php";
class Hashtag extends Modeldatabase
{
    public $body;
    public $post_id;
    public $htag_id;

    //je ne sais pas comment relier le hastag au post
    public function insertHashtag()
    {
        $query = "INSERT INTO htag (body)
                      VALUES  (:body);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':body', $this->body);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }
    public function lookForIdHashtag()
    {
        $query = "SELECT id FROM htag WHERE body=:body;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':body', $this->body);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function insertIntoJoinhashtag()
    {
        $query = "INSERT INTO joinhtag (htag_id,post_id) VALUES (:htag_id,:post_id)";
         $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':htag_id', $this->htag_id);
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->execute();
        return $this->connection->lastInsertId();
    }
    public function getHastagClassement()
    {
        $query = "SELECT h.body, COUNT(j.htag_id) AS usage_count
                  FROM joinhtag j
                  JOIN htag h ON j.htag_id = h.id
                  GROUP BY j.htag_id
                  ORDER BY usage_count DESC;";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
}
