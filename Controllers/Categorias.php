<?php 
    class Categorias extends Controllers{
        public function __construct() {
            sessionStart();
            parent::__construct();
            // session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function categorias() {
            $data['title_page'] = 'Categorías - Componentes';
            $data['css'] = 'dashboard.css';
            $data['js'] = ['dashboard.js'];
            $this->views->getView($this, 'Categorias', $data);
        }
        public function getCategories($idProject) {
            $arrData = $this->model->getCategories($idProject);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function getCategory($idProject) {
            $arrData = $this->model->getCategory($idProject);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function getSubcategory($idParent) {
            $idProject = $_POST['idProject'];
            $arrData = $this->model->getSubcategory($idParent, $idProject);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function setCategory() {
            $idProject = $_POST['idProject'];
            $name = $_POST['name'];
            $status = $_POST['status'] == 1 ? 'active': 'inactive';
            $global = $_POST['global'] == 0 ? $idProject : 1;
            $parentCategory = $_POST['parentCategory'];
            $tipo = $_POST['tipo'];

            if ($name == '') {
                $arrResponse = array('status' => false, 'msg' => 'Debe llenar todos los campos');
            } else if($global == '1' && $parentCategory != 'base') {
                $arrResponse = array('status' => false, 'msg' => 'No puede añadir una subcategoría privada a una categoría global');
            } else {
                $arrData = $this->model->setCategory($idProject, $name, $status, $global, $parentCategory, $tipo);
                if ($arrData > 0) {
                    $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error...');
                }
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getComponentsCategories($id) {
            $idProject = $_POST['idProject'];
            $arrData = $this->model->getComponentsCategories($id, $idProject);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function getTree($id) {
            $arrData = $this->model->getTree($id);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
    }