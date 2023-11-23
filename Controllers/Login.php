<?php 
    class Login extends Controllers {
        public function __construct() {
            parent::__construct();
        }
        public function login() {
            $data['title_page'] = 'Login';
            $data['js'] = 'login.js';
            $data['css'] = 'login.css';
            $this->views->getView($this, 'Login', $data);
        }
    }