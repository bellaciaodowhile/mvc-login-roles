<?php 
    require_once 'Config/Config.php'; # Constantes
    require_once 'Helpers/Helpers.php'; # Helpers

    $url = !empty($_GET['url']) ? $_GET['url'] : 'login/login';
    $arrUrl = explode('/',$url);
    $controller = ucfirst($arrUrl[0]);
    $model = ucfirst($arrUrl[0]);
    $method = ucfirst($arrUrl[0]);
    $params = "";
    if (!empty($arrUrl[1])) {
        if ($arrUrl[1] != "") {
            $method = $arrUrl[1];
        }
    }
    if (!empty($arrUrl[2])) {
        if ($arrUrl[2] != "") {
            for ($i=2; $i < count($arrUrl); $i++) { 
                $params .= $arrUrl[$i].',';
            }
            $params = trim($params, ',');
        }
    }

    require_once 'Libraries/'.'Core/Autoload.php';
    require_once 'Libraries/'.'Core/Load.php';

