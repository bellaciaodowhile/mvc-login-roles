<?php 
    class ProyectosModel extends MySql {
        public function __construct() {
            parent::__construct(); 
        }
        public function getLanguages() {
            $s = "SELECT * FROM lenguajes";
            $q = $this->selectAll($s);
            return $q;
        }
        public function setProjects($nombre, $status, $members, $descripcion, $langs) {
            $v = "SELECT nombre FROM proyectos WHERE nombre = '$nombre'";
            $qv = $this->select($v);
            if ($qv) {
                $return = 'exist';
            } else {
                $s = "INSERT INTO proyectos (nombre, `status`, miembros, descripcion, lenguajes) VALUES (?,?,?,?,?)";
                $arrData = array($nombre, $status, $members, $descripcion, $langs);
                $q = $this->insert($s, $arrData);
                $return = $q;
            }
            return $return;
        }
        // public function getProjects() {
        //     $s = "SELECT * FROM proyectos ORDER BY id DESC";
        //     $q = $this->selectAll($s);
        //     $data = [];
        //     foreach ($q as $key => $value) {
        //         $usersIds= explode(',', $value['miembros']);
        //         $arrUsers = [];
        //         foreach ($usersIds as $key => $idUser) {
        //             $users = "SELECT id, nombre, apellido, usuario, tipo FROM personas WHERE id = '$idUser'";
        //             $usersQ = $this->select($users);
        //             $arrUsers[] = $usersQ;
        //         }
        //         $langsIds= explode(',', $value['lenguajes']);
        //         $arrlangs = [];
        //         foreach ($langsIds as $key => $idlang) {
        //             $langs = "SELECT * FROM lenguajes WHERE id = '$idlang'";
        //             $langsQ = $this->select($langs);
        //             $arrlangs[] = $langsQ;
        //         }
        //         $data[] = array(
        //             'id' => $value['id'],
        //             'nombre' => $value['nombre'],
        //             'status' => $value['status'],
        //             'descripcion' => $value['descripcion'],
        //             'langs' => $arrlangs,
        //             'members' => $arrUsers,
        //         );   
        //     }
        //     return $data;
        // }


        public function getCategories($idProject) {
            $sql = "SELECT * FROM categorias WHERE idParent = 'base' AND (`global` = '1' OR (idProject = '$idProject' AND `global` = '$idProject'))";
            $req = $this->selectAll($sql);
            $categories = array();
	
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idParent' => $row['idParent'],
                    'nombre' => $row['nombre'],
                    'tipo' => $row['tipo'],
                    'estado' => $row['estado'],
                    'subcategory' => $this->subCategories($row['id'])
                );
            }
            return $categories;
        }
        public function subCategories($id) {
            $sql = "SELECT * FROM categorias WHERE idParent = $id";
            $req = $this->selectAll($sql);
            $categories = array();
	
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idParent' => $row['idParent'],
                    'nombre' => $row['nombre'],
                    'subcategory' => $this->subCategories($row['id'])
                );
            }
            return $categories;
        }


        public function getProjects() {
            $s = "SELECT * FROM proyectos ORDER BY id DESC";
            $q = $this->selectAll($s);
            $data = [];
            foreach ($q as $key => $value) {
                $usersIds = explode(',', $value['miembros']);
                $arrUsers = [];
                foreach ($usersIds as $key => $idUser) {
                    $users = "SELECT id, nombre, apellido, usuario, tipo FROM personas WHERE id = '$idUser'";
                    $usersQ = $this->select($users);
                    $arrUsers[] = $usersQ;
                }
                $langsIds = explode(',', $value['lenguajes']);
                $arrlangs = [];
                foreach ($langsIds as $key => $idlang) {
                    $langs = "SELECT * FROM lenguajes WHERE id = '$idlang'";
                    $langsQ = $this->select($langs);
                    $arrlangs[] = $langsQ;
                }
                
                // Consulta para obtener las categorías y subcategorías según el ID del proyecto
                $data[] = array(
                    'id' => $value['id'],
                    'nombre' => $value['nombre'],
                    'status' => $value['status'],
                    'descripcion' => $value['descripcion'],
                    'langs' => $arrlangs,
                    'members' => $arrUsers,
                    'categorias' => $this->getCategories($value['id']),
                );   
            }
            return $data;
        }
        public function getProject($id) {
            $s = "SELECT * FROM proyectos WHERE id = '$id'";
            $q = $this->selectAll($s);
            $data = [];
            foreach ($q as $key => $value) {
                $usersIds= explode(',', $value['miembros']);
                $arrUsers = [];
                foreach ($usersIds as $key => $idUser) {
                    $users = "SELECT id, nombre, apellido, usuario, tipo FROM personas WHERE id = '$idUser'";
                    $usersQ = $this->select($users);
                    $arrUsers[] = $usersQ;
                }
                $langsIds= explode(',', $value['lenguajes']);
                $arrlangs = [];
                foreach ($langsIds as $key => $idlang) {
                    $langs = "SELECT * FROM lenguajes WHERE id = '$idlang'";
                    $langsQ = $this->select($langs);
                    $arrlangs[] = $langsQ;
                }
                $data[] = array(
                    'id' => $value['id'],
                    'nombre' => $value['nombre'],
                    'status' => $value['status'],
                    'descripcion' => $value['descripcion'],
                    'langs' => $arrlangs,
                    'members' => $arrUsers,
                );   
            }
            return $data;
        }
        public function updateProject($id, $title, $descripcion, $status, $membersString, $langsString) {
            $u = "UPDATE proyectos SET nombre = ?, descripcion = ?, `status` = ?, miembros = ?, lenguajes = ? WHERE id = '$id'";
            $data = array($title, $descripcion, $status, $membersString, $langsString);
            $q = $this->update($u, $data);
            return $q;
        }
        public function getProjectsComponents() {

        }
        public function deleteProject($idProject) {
            $categories = "DELETE FROM categorias WHERE idProject = '$idProject'";
            $cCategories = $this->delete($categories);
            $components = "DELETE FROM componentes WHERE idProject = '$idProject'";
            $cComponents = $this->delete($components);
            $project = "DELETE FROM proyectos WHERE id = '$idProject'";
            $cProject = $this->delete($project);
            if ($cProject) {
                return $cProject;
            }
        }
    }