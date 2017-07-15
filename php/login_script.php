<?php
session_start();
$name     = $_POST['user'];
$password = $_POST['pass'];
$_SESSION['user'] = $name;
$_SESSION['pass'] = $password;

if (!isset($name, $password) || empty($name) || empty($password)){
	http_response_code(400);
	die();
}
$file = "../data/users.json";

$json_array= json_decode(file_get_contents($file), true);

$users = array(); 

if (is_array($json_array)) {
	$users = $json_array;
}
$newUser = true;
foreach($users as $user) {
	if ($user["name"] == $name) {
		$newUser = false;
		if ($user["pass"] !== $password) {
			http_response_code(400);
		} 
	}
}
if ($newUser) {
	$users[] = array("name" => $name, "pass" => $password, "id" => count($users) + 1);
}
file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
?>