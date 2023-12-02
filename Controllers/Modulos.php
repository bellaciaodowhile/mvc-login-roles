<?php 
    class Modulos extends Controllers{
        public function __construct() {
            parent::__construct();
            session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function modulos() {
            $data['title_page'] = 'Controlador Modulos';
            $data['css'] = 'dashboard.css';
            $data['js'] = 'dashboard.js';
            $data['active'] = 'dashboard';
            $this->views->getView($this, 'Modulos', $data);
        }
    }