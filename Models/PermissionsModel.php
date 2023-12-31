<?php 
    class PermissionsModel extends MySql {
        public function __construct() {
            parent::__construct();
        }
        public function getModulesApp() {
            $sql = "SELECT * FROM modulos WHERE `status` != 0";
            $q = $this->selectAll($sql);
            return $q;
        }
        public function getPermissions($id) {
            $s = "SELECT * FROM permisos WHERE rolid = '$id'";
            $q = $this->selectAll($s);
            return $q;
        }
        public function setPermission($idRol, $idModule, $r, $w, $u, $d) {
            $s = "INSERT INTO permisos (rolid, moduloid, r, w, u, d) VALUES (?,?,?,?,?,?)";
            $arrData = array($idRol, $idModule, $r, $w, $u, $d);
            $q = $this->insert($s, $arrData);
            return $q;
        }
        public function deletePermission($idRol) {
            $s = "DELETE FROM permisos WHERE rolid = '$idRol'";
            $q = $this->delete($s);
            return $q;
        }
    
    }