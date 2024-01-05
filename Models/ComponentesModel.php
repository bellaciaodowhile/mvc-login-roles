<?php 
    class ComponentesModel extends MySql{
        public function __construct() {
            parent::__construct();
        }
        public function setComponents($html, $css, $js, $name, $user, $idProject, $category) {
            $nameUnique = "component__" . uniqid();
            $s = "INSERT INTO componentes (html, css, js, nombre, user, idProject, category, `image`) VALUES (?,?,?,?,?,?,?,?)";
            $arrData = array($html, $css, $js, $name, $user, $idProject, $category, $nameUnique);
            $cssConvert = str_replace('___amp___', '&', $css);
            $htmlConvert = str_replace('___amp___', '&', $html);
            $jsConvert = str_replace('___amp___', '&', $js);
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
            $cssConvert = str_replace('___amp___', '&', $css);
            $htmlConvert = str_replace('___amp___', '&', $html);
            $jsConvert = str_replace('___amp___', '&', $js);
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
            $s = "SELECT * FROM componentes";
            $q = $this->selectAll($s);
            return $q;
        }
        public function getComponent($id) {
            $s = "SELECT * FROM componentes WHERE id = '$id'";
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
    }