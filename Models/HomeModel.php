<?php 
    class HomeModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function setUser(string $nombre, int $edad) {
            $strQuery = "INSERT INTO usuarios (nombre, edad) values (?,?)";
            $arrData = array($nombre, $edad);
            $res = $this->insert($strQuery, $arrData);
            return $res;
        }
        public function getUser(string $id) {
            $strQuery = "SELECT * FROM usuarios WHERE id = $id";
            $res = $this->select($strQuery);
            return $res;
        }
        public function getUsers() {
            $strQuery = "SELECT * FROM usuarios";
            $res = $this->selectAll($strQuery);
            return $res;
        }
        public function updateUser(int $id, string $nombre, int $edad) {
            $strQuery = "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = $id";
            $arrData = array($nombre, $edad);
            $res = $this->update($strQuery, $arrData);
            return $res;
        }
        public function deleteUser(int $id) {
            $strQuery = "DELETE FROM usuarios WHERE id = $id";
            $res = $this->delete($strQuery);
            return $res;
        }
    }