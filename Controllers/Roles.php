<?php 
    class Roles extends Controllers {
        public function __construct() {
            parent::__construct();
        }
        public function roles() {
            $data['title_page'] = 'Roles';
            $data['js'] = 'roles.js';
            $this->views->getView($this, 'Roles', $data);
        }
        public function getRoles() {
            $arrData = $this->model->getRoles();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
    }