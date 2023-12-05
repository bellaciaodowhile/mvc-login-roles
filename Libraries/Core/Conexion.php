<?php 
    class Conexion {

        private $conect;
        public function __construct()
        {
            $connetingString = "mysql:hos=".DB_HOST.";dbname=".DB_NAME.";".DB_CHARSET;
            try {
                $this->conect = new PDO($connetingString, DB_USER, DB_PASSWORD);
                $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); #Esto nos ayuda a poder detectar los errores con más facilidad
                $this->conect->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            } catch (Exception $err) {
                $this->conect = 'Error de conexión';
                echo 'ERROR: '.$err->getMessage(); #Esto es para poder mostrar el erro que se haya encontrado según la instrucción anterior
            }
        }
        public function connect() {
            return $this->conect;
        }

        // $connectingString = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET;
        // try {
        //     $this->conect = new PDO($connectingString, DB_USER, DB_PASSWORD);
        //     $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //     $this->conect->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // } catch (Exception $err) {
        //     $this->conect = 'Error de conexión';
        //     echo 'ERROR: '.$err->getMessage();
        // }
    }
    