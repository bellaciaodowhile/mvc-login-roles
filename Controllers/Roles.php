<?php 
    class Roles extends Controllers {
        public function __construct() {
            parent::__construct();
            session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function roles() {
            $data['title_page'] = 'Roles';
            $data['css'] = 'dashboard.css';
            $data['js'] = ['roles.js', 'dashboard.js'];
            $data['active'] = 'roles';
            $this->views->getView($this, 'Roles', $data);
        }
        public function getRoles() {
            $arrData = $this->model->getRoles();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function setRol() {
            $nombre = strClean($_POST['nombre']);
            $descripcion = strClean($_POST['descripcion']);
            $status = intval($_POST['status']);
            $arrData = $this->model->setRol($nombre, $descripcion, $status);

            if ($arrData == 'exist') {
                $arrResponse = array('status' => false, 'msg' => 'Este rol ya existe.');
            } else if ($arrData > 0) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa.');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error.');
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getRol() {
            $id = $_POST['id'];
            $arrData = $this->model->getRol($id);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        } 
        public function updateRol() {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $status = $_POST['status'];
            $arrData = $this->model->updateRol($nombre, $descripcion, $status, $id);
            if ($arrData) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else{
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un problema al actualizar los datos');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function deleteRol() {
            $id = $_POST['id'];
            $arrData = $this->model->deleteRol($id);
            if ($arrData) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else{
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un problema');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }