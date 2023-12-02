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
    }