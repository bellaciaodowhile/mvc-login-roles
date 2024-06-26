<?php 

	//Retorla la url del proyecto
	function baseUrl()
	{
		return BASE_URL;
	}
    function media()
    {
        return BASE_URL."Assets/";
    }
    function headerAdmin($data="")
    {
        $viewHeader = "Views/Templates/HeaderAdmin.php";
        require_once ($viewHeader);
    }
    function footerAdmin($data="")
    {
        $viewFooter = "Views/Templates/FooterAdmin.php";
        require_once ($viewFooter);        
    }
    function headerDashboard($data="")
    {
        $viewFooter = "Views/Templates/HeaderDashboard.php";
        require_once ($viewFooter);        
    }
    function footerDashboard($data="")
    {
        $viewFooter = "Views/Templates/FooterDashboard.php";
        require_once ($viewFooter);        
    }
    
    
	//Muestra información formateada
	function dep($data)
    {
        $format  = print_r('<pre>');
        $format .= print_r($data);
        $format .= print_r('</pre>');
        return $format;
    }
    //Elimina exceso de espacios entre palabras
    function strClean($strCadena){
        $string = preg_replace(['/\s+/','/^\s|\s$/'],[' ',''], $strCadena);
        $string = trim($string); //Elimina espacios en blanco al inicio y al final
        $string = stripslashes($string); // Elimina las \ invertidas
        $string = str_ireplace("<script>","",$string);
        $string = str_ireplace("</script>","",$string);
        $string = str_ireplace("<script src>","",$string);
        $string = str_ireplace("<script type=>","",$string);
        $string = str_ireplace("SELECT * FROM","",$string);
        $string = str_ireplace("DELETE FROM","",$string);
        $string = str_ireplace("INSERT INTO","",$string);
        $string = str_ireplace("SELECT COUNT(*) FROM","",$string);
        $string = str_ireplace("DROP TABLE","",$string);
        $string = str_ireplace("OR '1'='1","",$string);
        $string = str_ireplace('OR "1"="1"',"",$string);
        $string = str_ireplace('OR ´1´=´1´',"",$string);
        $string = str_ireplace("is NULL; --","",$string);
        $string = str_ireplace("is NULL; --","",$string);
        $string = str_ireplace("LIKE '","",$string);
        $string = str_ireplace('LIKE "',"",$string);
        $string = str_ireplace("LIKE ´","",$string);
        $string = str_ireplace("OR 'a'='a","",$string);
        $string = str_ireplace('OR "a"="a',"",$string);
        $string = str_ireplace("OR ´a´=´a","",$string);
        $string = str_ireplace("OR ´a´=´a","",$string);
        $string = str_ireplace("--","",$string);
        $string = str_ireplace("^","",$string);
        $string = str_ireplace("[","",$string);
        $string = str_ireplace("]","",$string);
        $string = str_ireplace("==","",$string);
        return $string;
    }
    //Genera una contraseña de 10 caracteres
	function passGenerator($length = 10)
    {
        $pass = "";
        $longitudPass=$length;
        $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $longitudCadena=strlen($cadena);

        for($i=1; $i<=$longitudPass; $i++)
        {
            $pos = rand(0,$longitudCadena-1);
            $pass .= substr($cadena,$pos,1);
        }
        return $pass;
    }
    //Genera un token
    function token()
    {
        $r1 = bin2hex(random_bytes(10));
        $r2 = bin2hex(random_bytes(10));
        $r3 = bin2hex(random_bytes(10));
        $r4 = bin2hex(random_bytes(10));
        $token = $r1.'-'.$r2.'-'.$r3.'-'.$r4;
        return $token;
    }

    function create_unique_id(){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $characters_lenght = strlen($characters);
        $random_string = '';
        for($i = 0; $i < 20; $i++){
            $random_string .= $characters[mt_rand(0, $characters_lenght - 1)];
        }
        return $random_string;
    }

    function sessionStart() {
        session_start();

        $inactive = 60 * 60 * 24;
        if (isset($_SESSION['timeout'])) {
            $session_in = time() - $_SESSION['inicio'];
            if ($session_in > $inactive) {
                header('Location:'.BASE_URL.'Logout');
            }
        } else {
            header('Location:'.BASE_URL.'Logout');
        }
    }
    
    

?>