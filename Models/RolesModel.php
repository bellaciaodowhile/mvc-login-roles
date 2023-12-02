<?php 
    class RolesModel extends MySql {
        public function __construct() {
            parent::__construct(); 
        }
        public function getRoles() {
            $sql = "SELECT * FROM roles WHERE `status` != 0";
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
    }