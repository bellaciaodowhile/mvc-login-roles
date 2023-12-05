<?php 
    class Components extends Controllers{
        public function __construct() {
            parent::__construct();
            session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function setComponents() {
            $html = $_POST['html'];
            $css = $_POST['css'];
            $js = $_POST['js'];
            $name =$_POST['name'];
            $user = $_POST['user'];

            $arrData = $this->model->setComponents($html, $css, $js, $name, $user);
            if ($html == '' && $css == '' && $js == '') {
                $arrResponse = array('status' => false, 'msg' => 'Debe llenar al menos un campo.');
            } else if ($name == '') {
                $arrResponse = array('status' => false, 'msg' => 'Debe colocar el nombre del componente.');
            } else {
                $arrResponse = array('status' => true, 'msg' => 'Componente guardado.');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getComponents() {
            $arrData = $this->model->getComponents();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function getComponent() {
            $arrData = $this->model->getComponent($_POST['id']);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
    }