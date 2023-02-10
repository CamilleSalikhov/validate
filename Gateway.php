<?php 

class Gateway {


  private $conn;
  public function __construct(Database $database) {

    $this->conn = $database->connectDb();

  }

  public function addItem($data) {
    $stringData = implode($data["value"]);

    $sql = "INSERT INTO History (id, history) VALUES (:id, :value)";
    $stmt = $this->conn->prepare($sql);
    $id = random_int( 1, 500000);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
     
    $stmt->bindValue(":value", $stringData, PDO::PARAM_STR);




    $stmt->execute();

  }

  public function getItems() {
    $sql = "SELECT History.history FROM History";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute();

    $data = [];

    while($item = $stmt-> fetch(PDO::FETCH_ASSOC)) {

      $data[] = $item;
    }

    return $data;
     
     



  }



 


}

 





 ?>