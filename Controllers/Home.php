<?php 
    class Home extends Controllers{
        public function __construct() {
            parent::__construct();
        }
        public function home() {
            $data['title_page'] = 'Controlador Home';
            $data['css'] = 'home.js';
            $data['js'] = 'home.js';
            $this->views->getView($this, 'Home', $data);
        }
        public function addUser() {
            $data = $this->model->setUser('Ramon',22);
            print_r($data);
        }
        public function usuario(string $id) {
            $data = $this->model->getUser($id);
            print_r($data);
        }
        public function usuarios(string $id) {
            $data = $this->model->getUsers($id);
            echo '<pre>';
            print_r($data);
            echo '</pre>';
        }
        public function actualizar() {
            $data = $this->model->updateUser(1,'Leonel',23);
            echo '<pre>';
            print_r($data);
            echo '</pre>';
        }
        public function eliminarUsuario(int $id) {
            $data = $this->model->deleteUser($id);
            echo '<pre>';
            print_r($data);
            echo '</pre>';
        }
        public function dashboard() {
            // $nombre = $_POST['nombre'];
            // $apellido = $_POST['apellido'];
            // echo json_encode([$nombre, $apellido], JSON_UNESCAPED_UNICODE);
            echo json_encode('arrData', JSON_UNESCAPED_UNICODE);
        }
    }