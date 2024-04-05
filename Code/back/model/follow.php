<?php

namespace user;

use PDO;
use db\Modeldatabase;

class Follow extends Modeldatabase
{
    public function getFollowFromUser($user_id)
    {
        $query = "SELECT COUNT(follow.follower_user_id) 
                  FROM follow 
                  JOIN user ON follow.follower_user_id = user.id 
                  WHERE follow.follower_user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function getFollowersCount($userId)
    {
        $query = "SELECT COUNT(*) AS followersCount FROM follow WHERE followed_user_id = :userId";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['followersCount'];
    }
    public function getFollowingCount($userId)
    {
        $query = "SELECT COUNT(*) AS followingCount FROM follow WHERE follower_user_id = :userId";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['followingCount'];
    }
    public function getFollowerFromUser($user_id)
    {
        $query = "SELECT COUNT(follow.followed_user_id) 
                  FROM follow 
                  JOIN user ON user.id = follow.followed_user_id
                  WHERE follow.followed_user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function followOtherUser($followerId, $followedId)
    {
        $query = "INSERT INTO follow (follower_user_id, followed_user_id, followed_created_at)
                  VALUES  (:follower_user_id, :followed_user_id,  NOW());";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':follower_user_id', $followerId);
        $stmt->bindParam(':followed_user_id', $followedId);
        $stmt->execute();
        $followCount = $this->getFollowersCount($followedId);
        $followingCount = $this->getFollowingCount($followerId);
        $response = [
            'followCount' => $followCount,
            'followingCount' => $followingCount,
        ];

        return $response;
    }
    public function unfollow($followerId, $followedId)
    {
        $query = "DELETE FROM follow 
                  WHERE follower_user_id = :follower_user_id
                  AND followed_user_id = :followed_user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':follower_user_id', $followerId);
        $stmt->bindParam(':followed_user_id', $followedId);
        $stmt->execute();
        $followCount = $this->getFollowersCount($followedId);
        $followingCount = $this->getFollowingCount($followerId);
        $response = [
            'followCount' => $followCount,
            'followingCount' => $followingCount,
        ];

        return $response;
    }
    public function isFollowing($followerId, $followedId)
    {

        $query = "SELECT COUNT(*) FROM follow 
              WHERE follower_user_id = :follower_user_id
              AND followed_user_id = :followed_user_id;";

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':follower_user_id', $followerId, PDO::PARAM_INT);
        $stmt->bindParam(':followed_user_id', $followedId, PDO::PARAM_INT);
        $stmt->execute();
        $isFollowing = $stmt->fetchColumn() > 0;

        $followCount = $this->getFollowersCount($followedId);
        $followingCount = $this->getFollowingCount($followedId);


        $response = [
            'isFollowing' => $isFollowing,
            'followCount' => $followCount,
            'followingCount' => $followingCount,
        ];

        return $response;
    }

    public function getUserRecommendation($userId)
    {
        $query = "SELECT * FROM user WHERE id NOT IN
                  (SELECT followed_user_id FROM follow WHERE follower_user_id = :userId) 
                     AND id != :userId ORDER BY RAND();";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getInfoFollowerFromUser($user_id)
    {
        $query = "SELECT user.*
                  FROM follow
                  JOIN user ON follow.follower_user_id = user.id
                  WHERE follow.followed_user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }

    public function getInfoFollowedFromUser($user_id)
    {
        $query = "SELECT user.*
                  FROM follow
                  JOIN user ON follow.followed_user_id = user.id
                  WHERE follow.follower_user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
}
