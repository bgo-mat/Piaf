<?php

namespace message;

use PDO;
use db\Modeldatabase;

require_once "../dbConnexion/dbConnexion.php";

class Message extends Modeldatabase
{
    public $sender_id;
    public $receiver_id;
    public $body;

    public function getConversationsByUserId($userId)
    {
        $query = "SELECT conv.id as conv_id, messages.id as 
                  message_id, messages.body, messages.sender_id,
                conv.receivers_id, messages.created_at
              FROM conv
              JOIN messages ON conv.messages_id = messages.id
              WHERE conv.sender_id = :user_id OR conv.receivers_id = :user_id
              GROUP BY conv.id
              ORDER BY messages.created_at ASC";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }


    public function insertMessage($sender_id, $receiver_id, $body)
    {
        $insertMessageQuery = "INSERT INTO messages (sender_id, body, created_at) VALUES (:sender_id, :body, NOW())";
        $stmt = $this->connection->prepare($insertMessageQuery);
        $stmt->bindParam(':sender_id', $sender_id, PDO::PARAM_INT);
        $stmt->bindParam(':body', $body, PDO::PARAM_STR);

        if (!$stmt->execute()) {
            return false;
        }

        $messageId = $this->connection->lastInsertId();

        $insertConvQuery = "INSERT INTO conv (messages_id, sender_id, receivers_id) 
                            VALUES (:message_id, :sender_id, :receiver_id)";
        $stmt = $this->connection->prepare($insertConvQuery);
        $stmt->bindParam(':message_id', $messageId, PDO::PARAM_INT);
        $stmt->bindParam(':sender_id', $sender_id, PDO::PARAM_INT);
        $stmt->bindParam(':receiver_id', $receiver_id, PDO::PARAM_INT);

        if (!$stmt->execute()) {
            return false;
        }
        return true;
    }
}
