<?php 
    class RolesModel extends MySql {
        public function __construct() {
            parent::__construct(); 
        }
        public function getRoles() {
            $sql = "SELECT * FROM roles";
            $q = $this->selectAll($sql);
            return $q;
        }
        public function setRol($nombre, $descripcion, $status) {
            $return;
            $s = "SELECT * FROM roles WHERE nombrerol = '$nombre'";
            $q = $this->select($s);
            if (!empty($q)) {
                $return = 'exist';
            } else {
                $insert = "INSERT INTO roles (nombrerol, descripcion, `status`) VALUES (?,?,?)";
                $arrData = array($nombre, $descripcion, $status);
                $qInsert = $this->insert($insert, $arrData);
                $return = $qInsert;
            }
            return $return;
        }
        public function getRol($id) {
            $s = "SELECT * FROM roles WHERE idRol = '$id'";
            $q = $this->select($s);
            return $q;
        }
        public function updateRol($nombre, $descripcion, $status, $id) {
            $s = "UPDATE roles SET nombrerol = ?, descripcion = ?, `status` = ? WHERE idRol = '$id'";
            $arrData = array($nombre, $descripcion, $status);
            $q = $this->update($s, $arrData);
            return $q;
        }
        public function deleteRol($id) {
            $s = "DELETE FROM roles WHERE idRol = '$id'";
            $q = $this->delete($s);
            return $q;
        }
    }