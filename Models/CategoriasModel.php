<?php 
    class CategoriasModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
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
                    'global' => $row['global'],
                    'subcategory' => $this->subCategories($row['id'])
                );
            }
            return $categories;
        }
        public function getCategory($idProject) {
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
                    'global' => $row['global'],
                    'subcategory' => $this->subCategories($row['id']),
                    'components' => $this->getComponentsCategory($row['id'])
                );
            }
            return $categories;
        }
        public function getComponentsCategory($id) {
            $sql = "SELECT * FROM componentes WHERE category = '$id'";
            $q = $this->selectAll($sql);
            return $q;
        }
        public function getSubcategory($idParent, $idProject) {
            if ($idParent == 'base') {
                $sql = "SELECT * FROM categorias WHERE idParent = '$idParent' and idProject = '$idProject'";
            } else {
                $sql = "SELECT * FROM categorias WHERE idParent = '$idParent'";
            }
            $req = $this->selectAll($sql);
            $categories = array();
            
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idParent' => $row['idParent'],
                    'idProject' => $row['idProject'],
                    'nombre' => $row['nombre'],
                    'tipo' => $row['tipo'],
                    'estado' => $row['estado'],
                    'global' => $row['global'],
                    'subcategory' => $this->subCategories($row['id']),
                    'components' => $this->getComponentsCategory($row['id'])
                );
            }
            return $categories;
        }
        public function getComponentsCategories($id, $idProject) {
            if ($id == 'base') {
                $sql = "SELECT * FROM componentes WHERE category = '$id' and idProject = '$idProject'";
                $req = $this->selectAll($sql);
                return $req;
            } else {
                $sql = "SELECT * FROM componentes WHERE category = '$id'";
                $req = $this->selectAll($sql);
                return $req;
            }
        }
        public function subCategories($id) {
            $sql = "SELECT * FROM categorias WHERE idParent = $id";
            $req = $this->selectAll($sql);
            $categories = array();
	
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idParent' => $row['idParent'],
                    'idProject' => $row['idProject'],
                    'nombre' => $row['nombre'],
                    'subcategory' => $this->subCategories($row['id'])
                );
            }
            return $categories;
        }
        public function setCategory($idProject, $name, $status, $global, $parentCategory, $tipo) {
            $s = "INSERT INTO categorias (idProject, nombre, estado, `global`, idParent, tipo) VALUES (?,?,?,?,?,?)";
            $arr = array($idProject, $name, $status, $global, $parentCategory, $tipo);
            $q = $this->insert($s, $arr);
            return $q;
        }
        public function getTree($idParent) {
            $tree = array();
            
            // Obtener el registro actual
            $sql = "SELECT * FROM categorias WHERE id = '$idParent'";
            $req = $this->select($sql);
            
            // Obtener los tree recursivamente
            if ($req) {
                if ($req['idParent'] != null) {
                    $tree = $this->getTree($req['idParent']);
                }
            }
        
            // Agregar el registro actual a la lista de tree
            $tree[] = $req;
        
            return $tree;
        }
    }