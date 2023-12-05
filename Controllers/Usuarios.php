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
            $data['js'] = ['dashboard.js'];
            $data['active'] = 'usuarios';
            $this->views->getView($this, 'Usuarios', $data);
        }
        public function getUsers() {
            $arrData = $this->model->getUsers();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function setUsers() {
            $nombre = strClean($_POST['nombre']);
            $apellido = strClean($_POST['apellido']);
            $usuario = strClean($_POST['usuario']);
            $contrasena = strClean($_POST['contrasena']);
            $estado = intval($_POST['estado']);
            $tipo = strClean($_POST['tipo']);
            $arrData = $this->model->setUsers($nombre, $apellido, $usuario, $contrasena, $estado, $tipo);
            if ($arrData == 'exist') {
                $arrResponse = array('status' => false, 'msg' => '¡Este usuario ya existe!');
            } else if (!empty($arrData)) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else{
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un problema');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getUser() {
            $id = $_POST['id'];
            $arrData = $this->model->getUser($id);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function updateUsers() {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $usuario = $_POST['usuario'];
            $contrasena = $_POST['contrasena'];
            $status = $_POST['status'];
            $tipo = $_POST['tipo'];
            $arrData = $this->model->updateUsers($nombre, $apellido, $usuario, $contrasena, $status, $tipo, $id);
            if (!empty($arrData)) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else{
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un problema al actualizar los datos');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function deleteUser() {
            $id = $_POST['id'];
            $arrData = $this->model->deleteUser($id);
            if ($arrData) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else{
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un problema');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }