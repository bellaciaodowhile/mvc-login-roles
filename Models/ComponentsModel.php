<?php 
    class ComponentsModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function setComponents($html, $css, $js, $name, $user) {
            $s = "INSERT INTO componentes (html, css, js, nombre, user) VALUES (?,?,?,?,?)";
            $arrData = array($html, $css, $js, $name, $user);
            $q = $this->insert($s, $arrData);
            return $q;
        }
        public function getComponents() {
            $s = "SELECT * FROM componentes";
            $q = $this->selectAll($s);
            return $q;
        }
        public function getComponent($id) {
            $s = "SELECT * FROM componentes WHERE id = '$id'";
            $q = $this->selectAll($s);
            return $q;
        }
    }