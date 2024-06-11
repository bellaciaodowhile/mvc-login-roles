<?php 
    class Logout {
        public function __construct() {
            session_start();
            session_unset();
            session_destroy();
            // ini_set('session.cookie_lifetime', 0);
            header('Location:'.BASE_URL.'login');
        }
    }