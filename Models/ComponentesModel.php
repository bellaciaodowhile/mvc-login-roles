<?php 
    class ComponentesModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function setComponents($html, $css, $js, $name, $user, $idProject, $category) {
            $nameUnique = "component__" . uniqid();
            $s = "INSERT INTO componentes (html, css, js, nombre, user, idProject, category, `image`, idUnique) VALUES (?,?,?,?,?,?,?,?,?)";
            $arrData = array($html, $css, $js, $name, $user, $idProject, $category, $nameUnique, create_unique_id());
            $cssConvert = str_replace('___amp___', '&', str_replace('___plus___', '+', $css));
            $htmlConvert = str_replace('___amp___', '&', str_replace('___plus___', '+', $html));;
            $jsConvert = str_replace('___amp___', '&', str_replace('___plus___', '+', $js));
            $contentComponent = "
                <style>
                ".$cssConvert."
                </style>
                <body>
                ".$htmlConvert."
                <script>
                ".$jsConvert."
                </script>
            </body>";
            file_put_contents("Components/". $nameUnique . ".html", $contentComponent);

            $q = $this->insert($s, $arrData);
            return $q;
        }
        public function updateComponent($html, $css, $js, $name, $user, $idProject, $category, $idComponent) {
            $c = "SELECT * FROM componentes WHERE id = '$idComponent'";
            $cq = $this->selectAll($c);
            if (file_exists("Components/". $cq[0]['image'] . ".html")) {
                unlink("Components/". $cq[0]['image'] . ".html");
            }
            $nameUnique = "component__" . uniqid();
            $s = "UPDATE componentes SET html = ?, css = ?, js = ?, nombre = ?, user = ?, idProject = ?, category = ?, `image` = ? WHERE id = '$idComponent'";
            $arrData = array($html, $css, $js, $name, $user, $idProject, $category, $nameUnique);
            $cssConvert = str_replace('___amp___', '&', str_replace('+', '___plus___', $css));
            $htmlConvert = str_replace('___amp___', '&', str_replace('+', '___plus___', $html));;
            $jsConvert = str_replace('___amp___', '&', str_replace('+', '___plus___', $js));
            $contentComponent = "
                <style>
                ".$cssConvert."
                </style>
                <body>
                ".$htmlConvert."
                <script>
                ".$jsConvert."
                </script>
            </body>";
            file_put_contents("Components/". $nameUnique . ".html", $contentComponent);

            $q = $this->insert($s, $arrData);
            return $q;
        }
        public function getComponents() {
            $s = "SELECT * FROM componentes ORDER BY id DESC";
            $q = $this->selectAll($s);
            return $q;
        }
        public function getComponent($id) {
            $s = "SELECT * FROM componentes WHERE id = '$id' ORDER BY id DESC";
            $q = $this->selectAll($s);
            return $q;
        }
        public function createPreviewComponent($id, $imageData) {
            $s = "UPDATE componentes SET `image` = ? WHERE id = '$id'";
            $arr = array($imageData);
            $q = $this->update($s, $arr);
            return $q;
        }
        public function deleteComponent($id) {
            $c = "SELECT * FROM componentes WHERE id = '$id'";
            $cq = $this->selectAll($c);
            $s = "DELETE FROM componentes WHERE id = '$id'";
            $q = $this->delete($s);
            if ($q) {
                if (file_exists("Components/". $cq[0]['image'] . ".html")) {
                    unlink("Components/". $cq[0]['image'] . ".html");
                }
            }
            return $q;
        }
        public function setTransfer($componentID, $newCategory, $idProject) {
            $s = "UPDATE componentes SET category = ?, idProject = ? WHERE id = '$componentID'";
            $arr = array($newCategory, $idProject);
            $q = $this->update($s, $arr);
            return $q;
        }

        public function updateTemporal() {

            // ! Añadiendo el idUnique en los proyectos
            $se = "SELECT id FROM proyectos";
            $cse = $this->selectAll($se);
            
            foreach ($cse as $key => $value) {
                $idProject = $value['id'];
                $idUnique = create_unique_id();
                $s = "UPDATE proyectos SET idUnique = ? WHERE id = $idProject";
                $cs = array($idUnique);
                $q = $this->update($s, $cs);
            }

            $cate = "SELECT id FROM categorias";
            $cCate = $this->selectAll($cate);
            
            foreach ($cCate as $key => $value) {
                $id = $value['id'];
                $idUnique = create_unique_id();
                $s = "UPDATE categorias SET idUnique = ? WHERE id = $id";
                $cs = array($idUnique);
                $q = $this->update($s, $cs);
            }

            $compo = "SELECT id FROM componentes";
            $cCompo = $this->selectAll($compo);
            
            foreach ($cCompo as $key => $value) {
                $id = $value['id'];
                $idUnique = create_unique_id();
                $s = "UPDATE componentes SET idUnique = ? WHERE id = $id";
                $cs = array($idUnique);
                $q = $this->update($s, $cs);
            }


            // $id = create_unique_id();
            // $s = "UPDATE proyectos SET idUnique = ?";
            // $cs = array($id);
            // $q = $this->update($s, $cs);
            // return $q;
        }

        public function search($query) {
            // * Projects
            $s = "SELECT * FROM proyectos WHERE idUnique = '$query'";
            $cs = $this->select($s);
            // * Categories
            $sCategory = "SELECT * FROM categorias WHERE idUnique = '$query'";
            $cCategory = $this->select($sCategory);
            // * Components
            $sComponents = "SELECT * FROM componentes WHERE idUnique = '$query'";
            $cComponents = $this->select($sComponents);
            if ($cs > 0) {
                return array(
                'type' => 'project', 
                'content' => $this->getCategory($cs['id']), 
                'idProject' => $cs['id'],
                'idUnique' => $cs['idUnique'],
                'name' => $cs['nombre']);
            } else if ($cCategory > 0) {
                return array(
                'type' => 'category', 
                'content' => $this->getCategory($cCategory['idProject']), 
                'idCategory' => $cCategory['id'],
                'idProject' => $cCategory['idProject'],
                'idParent' => $cCategory['idParent'],
                'name' => $cCategory['nombre'],
                'getProject' => $this->getProject($cCategory['idProject']),
                'getTree' => $this->getTree($cCategory['idParent']),
                'idUnique' => $cCategory['idUnique']);
            } else {
                return array(
                'type' => 'components', 
                'content' => $this->getCategory($cComponents['idProject']), 
                'idComponent' => $cComponents['id'],
                'idImage' => $cComponents['image'],
                'idProject' => $cComponents['idProject'],
                'nameComponent' => $cComponents['nombre'],
                'getProject' => $this->getProject($cComponents['idProject']),
                'idUnique' => $cComponents['idUnique'],
                'getTree' => $cComponents['category'] != 'base' ? $this->getTreeCategory($cComponents['category']) : $cComponents['category'],
                'idCategory' => $cComponents['category']);
            }
        }
        public function getProject($id) {
            $s = "SELECT * FROM proyectos WHERE id = '$id'";
            $cs = $this->select($s);
            return $cs;
        }

        public function getTreeCategory($id) {
            $s = "SELECT * FROM categorias WHERE id = '$id'";
            $cs = $this->select($s);
            return $this->getTree($cs['idParent']);
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

        public function getCategory($idProject) {
            $sql = "SELECT * FROM categorias WHERE idParent = 'base' AND (`global` = '1' OR (idProject = '$idProject' AND `global` = '$idProject')) ORDER BY id DESC";
            $req = $this->selectAll($sql);
            $categories = array();
            
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idUnique' => $row['idUnique'],
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
            $sql = "SELECT * FROM componentes WHERE category = '$id' ORDER BY id DESC";
            $q = $this->selectAll($sql);
            return $q;
        }
        public function subCategories($id) {
            $sql = "SELECT * FROM categorias WHERE idParent = $id ORDER BY id DESC";
            $req = $this->selectAll($sql);
            $categories = array();
	
            foreach($req as $row) {
                $categories[] = array(
                    'id' => $row['id'],
                    'idUnique' => $row['idUnique'],
                    'idParent' => $row['idParent'],
                    'idProject' => $row['idProject'],
                    'nombre' => $row['nombre'],
                    'subcategory' => $this->subCategories($row['id'])
                );
            }
            return $categories;
        }
    }