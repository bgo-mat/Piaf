<?php

namespace db;

require_once __DIR__ . '/../vendor/autoload.php';

use PDO;
use Dotenv\Dotenv;

class Modeldatabase
{
    private $host;
    private $dbname;
    private $user;
    private $password;
    protected $connection;

    public function __construct()
    {
        //charge fichier .env
        $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
        $dotenv->load();

        $this->host = $_ENV['DB_HOST'];
        $this->dbname = $_ENV['DB_NAME'];
        $this->user = $_ENV['DB_USER'];
        $this->password = $_ENV['DB_PASSWORD'];

        try {
            $this->connection = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->user, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
