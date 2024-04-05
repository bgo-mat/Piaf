<?php

namespace user;

use db\Modeldatabase;

require_once "../dbConnexion/dbConnexion.php";

class User extends Modeldatabase
{
    public $name;
    public $username;
    public $email;
    public $password;
    public $emailStatus;
    public $status;
    public $avatarDir;
    public $banniereDir;
    public $tokenConnexion;
    public $birthdate;
    public $bio;
    public function submitInscription()
    {
        $query = "INSERT INTO user (username, name, email, pass, birthdate, email_verified, created_at, status)
                      VALUES  (:username, :name, :email, :password, :birthdate, NOW(), NOW(), :status);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':birthdate', $this->birthdate);
        $stmt->bindParam(':status', $this->status);
        $stmt->execute();
        return  $this->connection->lastInsertId();
    }
    public function tokenInscription($userId)
    {
        $query = "INSERT INTO token (token_connexion, user_id)
                      VALUES  (:token_connexion, :user_id);";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':token_connexion', $this->tokenConnexion);
        $stmt->bindParam(':user_id', $userId);

        $stmt->execute();
        return  $this->connection->lastInsertId();
    }
    public function tokenVerificationMail($user_id)
    {
        $query = "SELECT token_connexion FROM token WHERE user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function findUserWithToken()
    {
        $query = "SELECT user_id FROM token WHERE token_connexion = :token;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':token', $this->tokenConnexion);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function activeAccount($user_id)
    {
        $query = "UPDATE user 
                  SET email_verified = :email_verified, status = :status
                  WHERE id = :user_id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':email_verified', $this->emailStatus);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function changeStatusAccount($user_id, $status)
    {
        $query = "UPDATE user 
                  SET status = :status
                  WHERE id = :user_id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function deactiveAccount($user_id)
    {
        $query = "UPDATE user 
                  SET status = :status
                  WHERE id = :user_id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return true;
    }

    public function saveImgDir($user_id)
    {
        $query = "UPDATE user 
                  SET photo_user = :photo_user, banniere_user = :banniere_user, bio = :bio
                  WHERE id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':bio', $this->bio);
        $stmt->bindParam(':photo_user', $this->avatarDir);
        $stmt->bindParam(':banniere_user', $this->banniereDir);
        $stmt->execute();
        return  $this->connection->lastInsertId();
    }

    public function connexionVerification()
    {
        $query = "SELECT * FROM user WHERE email= :email;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function deleteToken($user_id)
    {
        $query = "DELETE FROM token WHERE user_id = :user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function updatePassword()
    {
        $query = "UPDATE user 
                  SET pass = :password
                  WHERE email = :email;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->execute();
        return true;
    }

    public function getInfoUser($user_id)
    {
        $query = "SELECT * FROM user WHERE id=:user_id;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
    public function searchUserWithPseudo()
    {
        $searchTerm =  $this->username . "%" ;
        $query = "SELECT * FROM user WHERE username LIKE :username;";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':username', $searchTerm);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }
}
