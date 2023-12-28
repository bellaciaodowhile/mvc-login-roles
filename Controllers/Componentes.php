<?php 
    class Componentes extends Controllers{
        public function __construct() {
            parent::__construct();
            session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function componentes() {
            $data['title_page'] = 'Componentes';
            $data['css'] = 'dashboard.css';
            $data['js'] = ['dashboard.js'];
            $this->views->getView($this, 'Componentes', $data);
        }
        public function setComponents() {
            $html = $_POST['html'];
            $css = $_POST['css'];
            $js = $_POST['js'];
            $name =$_POST['name'];
            $user = $_POST['user'];
            $idProject = $_POST['idProject'];
            $category = $_POST['category'];

            if ($html == '' && $css == '' && $js == '' || $name == '') {
                $arrResponse = array('status' => false, 'msg' => 'Debe llenar al menos un campo.');
            } else {
                $arrData = $this->model->setComponents($html, $css, $js, $name, $user, $idProject, $category);
                $arrResponse = array('status' => true, 'msg' => $arrData);
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
        public function createPreviewComponent() {
            $id = $_POST['id'];
            $imageData = $_POST['imageData'];
            $arrData = $this->model->createPreviewComponent($id, $imageData);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function deleteComponent($id) {
            $arrData = $this->model->deleteComponent($id);
            if ($arrData) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error...');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function setTransfer() {
            $componentID = $_POST['componentId'];
            $newCategory = $_POST['newCategory'];
            $arrData = $this->model->setTransfer($componentID, $newCategory);
            if ($arrData) {
                $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error...');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }