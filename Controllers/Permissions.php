<?php 
    class Permissions extends Controllers {
        public function __construct() {
            parent::__construct();
        }
        public function getPermissions(int $id) {
            if ($id > 0) {
                $arrModules = $this->model->getModulesApp();
                $arrPermissionsRol = $this->model->getPermissions($id);
                $arrPermissions = array('r' => 0, 'w' => 0, 'u' => 0, 'd' => 0);
                $arrPermissionRol = array('idRol' => $id);
                if (empty($arrPermissionsRol)) {
                    for ($i=0; $i < count($arrModules); $i++) { 
                        $arrModules[$i]['permissions'] = $arrPermissions; 
                    }
                } else {
                    for ($i=0; $i < count($arrModules); $i++) { 
                        $arrPermissions = array(
                            'r'=> $arrPermissionsRol[$i]['r'],
                            'w'=> $arrPermissionsRol[$i]['w'],
                            'u'=> $arrPermissionsRol[$i]['u'],
                            'd'=> $arrPermissionsRol[$i]['d']
                        );
                        if ($arrModules[$i]['idModulo'] == $arrPermissionsRol[$i]['moduloid']) {
                            $arrModules[$i]['permissions'] = $arrPermissions;
                        }
                    }
                }
                $arrPermissionRol['modulos'] = $arrModules;

                echo json_encode($arrPermissionRol, JSON_UNESCAPED_UNICODE);
            }
        }
        public function setPermission() {

            $data = json_decode($_POST['arrData']);
            $idRol = intval($data[0]->idRol);

            $this->model->deletePermission($idRol);
            foreach ($data as $permission) {
                $idModule = $permission->idModule;
                $r = intval($permission->r);
                $w = intval($permission->w);
                $u = intval($permission->u);
                $d = intval($permission->d);
                $requestPermission = $this->model->setPermission($idRol, $idModule, $r, $w, $u, $d);
            }
            if ($requestPermission > 0) {
                $arrResponse = array('status' => true, 'msg' => 'Permisos asignados correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error al guardar los permisos...');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }