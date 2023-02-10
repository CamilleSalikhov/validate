<?php

class ValidationController {


  public function __construct($Gateway) {
    $this-> gateway = $Gateway;

  }
     

  public function handleRequest($method) {

    switch ($method) {
      case 'POST':
       $data = json_decode(file_get_contents("php://input") , true);
        
       //
       $charLang = array();
       $bold;
       $eng = 0;
       $rus = 0;
       $lang;


       for ($i = 0 ; $i < count($data["value"])  ; $i++) {
        

        if (strlen($data["value"][$i]) === mb_strlen($data["value"][$i]) ){
          if (preg_match('/[a-zA-Z]/', $data["value"][$i])) {
            array_push($charLang, 1 ); //у символов тоже 1
          $eng++;
          } else {

        array_push($charLang, 3 );
          }


           
        } else {
          array_push($charLang, 2 );
          $rus++;
        }
         
       }



       if ($eng > $rus) {
        $bold = 2;
        $lang = "Английский";
       } else if ($eng <=  $rus) {
        $bold = 1;
        $lang = "Русский";
       }



      if ($data['type'] === 'submit') {
        $this->gateway->addItem($data);

       http_response_code(201);

       echo json_encode([
        "message" => "item was successfully added",
         "code" => $charLang,
         "bold" => $bold,
         "original" => $data["value"],
         "lang" => $lang

       ]);


      } else {

        echo json_encode([
        "message" => "validating",
         "code" => $charLang,
         "bold" => $bold,
         "original" => $data["value"],
         "lang" => $lang

       ]);


      }

        



        break;

      case 'GET': 
        echo json_encode($this->gateway->getItems())  ;
        
        break;

       
      
      default:
       http_response_code(405);
       header("Allow: POST, GET");
        break;
    }



  }



}














  ?>