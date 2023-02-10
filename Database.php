<?php 

class Database {


public function connectDb() {
  

  $data = require __DIR__ . '/settings.php';

  return  new PDO('mysql:host=' . $data['hsost'] . ';dbname=' . $data['dbname'], $data['name'], $data['password']);
     

}
 



}

 





 ?>