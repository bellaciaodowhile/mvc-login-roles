<?php 
    class Usuarios extends Controllers{
        public function __construct() {
            parent::__construct();
            session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function usuarios() {
            $data['title_page'] = 'Usuarios';
            $data['css'] = 'dashboard.css';
            $data['js'] = 'dashboard.js';
            $this->views->getView($this, 'Usuarios', $data);
        }
    }