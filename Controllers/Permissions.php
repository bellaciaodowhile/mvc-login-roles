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
                        if ($arrModules[$i]['idmodulo'] == $arrPermissionsRol[$i]['moduloid']) {
                            $arrModules[$i]['permissions'] = $arrPermissions;
                        }
                    }
                }
                $arrPermissionRol['modulos'] = $arrModules;

                echo json_encode($arrPermissionRol, JSON_UNESCAPED_UNICODE);
            }
        }
        public function setPermission() {
            $idRol = strClean($_POST['idRol']);
            $idModulo = strClean($_POST['idModuloCurrent']);
            $r = strClean($_POST['r']) == false ? 0 : 1;
            $w = strClean($_POST['w']) == false ? 0 : 1;
            $u = strClean($_POST['u']) == false ? 0 : 1;
            $d = strClean($_POST['d']) == false ? 0 : 1;
            
            // $this->model->deletePermission($idRol, $idModulo);
            // $arrData = $this->model->setPermission($idRol, $idModulo, $r, $w, $u, $d);

            // if ($arrData > 0) {
            //     $arrResponse = array('status' => 'Permisos registrados correctamente');
            // } else {
            //     $arrResponse = array('status' => 'Error al guardar los permisos...');
            // }
            
            echo json_encode($r, JSON_UNESCAPED_UNICODE);

        }
    }