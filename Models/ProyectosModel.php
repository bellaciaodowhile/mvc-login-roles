<?php 
    class ProyectosModel extends MySql {
        public function __construct() {
            parent::__construct(); 
        }
        public function getLanguages() {
            $s = "SELECT * FROM lenguajes";
            $q = $this->selectAll($s);
            return $q;
        }
        public function setProjects($nombre, $status, $members, $descripcion, $langs) {
            $v = "SELECT nombre FROM proyectos WHERE nombre = '$nombre'";
            $qv = $this->select($v);
            if ($qv) {
                $return = 'exist';
            } else {
                $s = "INSERT INTO proyectos (nombre, `status`, miembros, descripcion, lenguajes) VALUES (?,?,?,?,?)";
                $arrData = array($nombre, $status, $members, $descripcion, $langs);
                $q = $this->insert($s, $arrData);
                $return = $q;
            }
            return $return;
        }
        public function getProjects() {
            $s = "SELECT * FROM proyectos";
            $q = $this->selectAll($s);
            $data = [];
            foreach ($q as $key => $value) {
                $usersIds= explode(',', $value['miembros']);
                $arrUsers = [];
                foreach ($usersIds as $key => $idUser) {
                    $users = "SELECT id, nombre, apellido, usuario, tipo FROM personas WHERE id = '$idUser'";
                    $usersQ = $this->select($users);
                    $arrUsers[] = $usersQ;
                }
                $langsIds= explode(',', $value['lenguajes']);
                $arrlangs = [];
                foreach ($langsIds as $key => $idlang) {
                    $langs = "SELECT * FROM lenguajes WHERE id = '$idlang'";
                    $langsQ = $this->select($langs);
                    $arrlangs[] = $langsQ;
                }
                $data[] = array(
                    'id' => $value['id'],
                    'nombre' => $value['nombre'],
                    'status' => $value['status'],
                    'descripcion' => $value['descripcion'],
                    'langs' => $arrlangs,
                    'members' => $arrUsers,
                );   
            }
            return $data;
        }
    }