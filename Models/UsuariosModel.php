<?php 
    class UsuariosModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function getUsers(){
            $sql = "SELECT * FROM personas";
            $result = $this->selectAll($sql);
            return $result;
        }
        public function setUsers($nombre, $apellido, $usuario, $contrasena, $estado, $tipo) {
            $return;
            $s = "SELECT usuario FROM personas WHERE usuario = '$usuario'";
            $q = $this->select($s);
            if (!empty($q)) {
                $return = 'exist';
            } else {
                $contrasena = hash('SHA256', $contrasena);
                $sql = "INSERT INTO personas (nombre, apellido, usuario, contrasena, `status`, tipo) VALUES (?,?,?,?,?,?)";
                $arrData = array($nombre, $apellido, $usuario, $contrasena, $estado, $tipo);
                $qInsert = $this->insert($sql, $arrData);
                $return = $qInsert;
            }
            return $return;
        }

    }