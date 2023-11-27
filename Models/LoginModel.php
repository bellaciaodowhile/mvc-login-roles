<?php 
    class LoginModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function setLogin($u, $p) {
            $s = "SELECT * FROM personas WHERE usuario = '$u' AND contrasena = '$p'";
            $q = $this->selectAll($s);
            return $q;
        }
    }