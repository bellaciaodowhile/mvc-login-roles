<?php 
    class Login extends Controllers {
        public function __construct() {
            session_start();
            if (isset($_SESSION['login'])) {
                header('Location:'.BASE_URL.'dashboard');
            }
            parent::__construct();
        }
        public function login() {
            $data['title_page'] = 'Login';
            $data['js'] = ['login.js'];
            $data['css'] = 'login.css';
            $this->views->getView($this, 'Login', $data);
        }
        public function setLogin() {
    
            $p = hash('SHA256',$_POST['p']);
            $arrData = $this->model->setLogin($_POST['u'], $p);
            
            if (!empty($arrData)) {
                if ($arrData[0]['status']) {
                    $arrResponse = array('status' => true, 'msg' => 'Validación exitosa!');
                    $_SESSION['idUser'] = $arrData[0]['id'];
                    $_SESSION['nombre'] = $arrData[0]['nombre'];
                    $_SESSION['tipo'] = $arrData[0]['tipo'];
                    $_SESSION['login'] = true;
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Usuario inactivo');
                }
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Ha ocurido un error al iniciar sesión...');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }