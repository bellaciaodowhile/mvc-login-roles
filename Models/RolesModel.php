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
    }