<?php



 
require __DIR__ . "/ValidationController.php";
require __DIR__ . "/Database.php";
require __DIR__ . "/ErrorHandler.php";
require __DIR__ . "/Gateway.php";

header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json; charset=UTF-8');
set_exception_handler("ErrorHandler::handleException");


$call = explode('/', $_SERVER['REQUEST_URI']);

if ($call[1] != 'validate') {
  http_response_code(404);
  exit;
}

$database = new Database();
 
$gateway = new Gateway($database);



$controller = new ValidationController($gateway);

$controller->handleRequest($_SERVER['REQUEST_METHOD']);