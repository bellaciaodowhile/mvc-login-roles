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
        public function getUser($id) {
            $s = "SELECT * FROM personas WHERE id = '$id'";
            $q = $this->select($s);
            return $q;
        }
        public function updateUsers($nombre, $apellido, $usuario, $contrasena, $status, $tipo, $id) {
            $v = "SELECT contrasena FROM personas WHERE id = '$id'";
            $qv = $this->select($v);
            if ($qv['contrasena'] == $contrasena) {
                $s = "UPDATE personas SET nombre = ?, apellido = ?, usuario = ?, contrasena = ?, `status` = ?, tipo = ? WHERE id = '$id'";
                $arrData = array($nombre, $apellido, $usuario, $contrasena, $status, $tipo);
                $q = $this->update($s, $arrData);
                $return = $q;
            } else {
                $s = "UPDATE personas SET nombre = ?, apellido = ?, usuario = ?, contrasena = ?, `status` = ?, tipo = ? WHERE id = '$id'";
                $contrasena = hash('SHA256', $contrasena);
                $arrData = array($nombre, $apellido, $usuario, $contrasena, $status, $tipo);
                $q = $this->update($s, $arrData);
                $return = $q;
            }
            return $q;
        }
        public function deleteUser($id) {
            $s = "DELETE FROM personas WHERE id = '$id'";
            $q = $this->delete($s);
            return $q;
        }

    }