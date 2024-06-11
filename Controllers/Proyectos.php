<?php 
    class Proyectos extends Controllers{
        public function __construct() {
            sessionStart();
            parent::__construct();
            // session_start();
            if (empty($_SESSION['login'])) {
                header('Location:'.BASE_URL.'login');
            }
        }
        public function proyectos() {
            $data['title_page'] = 'Proyectos';
            $data['css'] = 'dashboard.css';
            $data['js'] = ['dashboard.js'];
            $data['active'] = 'proyectos';
            $this->views->getView($this, 'Proyectos', $data);
        }
        public function getSelectUsers() {
            return $arrData = array(0 => 'Hola', 1 => 'Como', 2 => 'estas');
        }
        public function getLanguages() {
            $arrData = $this->model->getLanguages();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function setProjects() {
            $nombre = strClean($_POST['nombre']);
            $status = intval($_POST['status']);
            $members = json_decode($_POST['members']);
            $descripcion = strClean($_POST['descripcion']);
            $langs = json_decode($_POST['langs']);
            $membersString = implode(',', $members);
            $langsString = implode(',', $langs);
            if ($nombre == '' || count($members) == 0 || $descripcion == '' || count($langs) == 0 ) {
                $arrResponse = array('status' => false, 'msg' => 'Debe llenar todos los campos');
            } else {
                $arrData = $this->model->setProjects($nombre, $status, $membersString, $descripcion, $langsString);
                if ($arrData > 0) {
                    $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
                } else if ($arrData == 'exist') {
                    $arrResponse = array('status' => false, 'msg' => 'El nombre del proyecto ya existe');
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error');
                }
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getProjects() {
            $arrData = $this->model->getProjects();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function getProject($id) {
            $arrData = $this->model->getProject($id);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function updateProject() {
            $id = intval($_POST['id']);
            $title = $_POST['title'];
            $description = $_POST['description'];
            $status = intval($_POST['status']);
            $langs = json_decode($_POST['langs']);
            $langsString = implode(',', $langs);
            $members = json_decode($_POST['members']);
            $membersString = implode(',', $members);

            if ($title == '' || count($members) == 0 || $description == '' || count($langs) == 0 ) {
                $arrResponse = array('status' => false, 'msg' => 'Debe llenar todos los campos');
            } else {
                $arrData = $this->model->updateProject($id, $title, $description, $status, $membersString, $langsString);
                if ($arrData > 0) {
                    $arrResponse = array('status' => true, 'msg' => 'Operación exitosa!');
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error');
                }
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        public function getProjectsComponents() {
            $arrData = $this->model->getProjectsComponents();
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
        public function deleteProject($idProject) {
            $arrData = $this->model->deleteProject($idProject);
            echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        }
    }