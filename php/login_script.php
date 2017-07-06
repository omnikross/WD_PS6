<?php
session_start();
$name     = $_POST['user'];
$password = $_POST['pass'];
$_SESSION['user'] = $name;
$_SESSION['pass'] = $password;

if( !isset($name, $password) || empty($name) || empty($password) ){
	http_response_code(400);
	die();
}

$file = "../data/users.json";

$json_array = json_decode(file_get_contents($file), true);

$users = array();

if(is_array($json_array) ) {
	$users = $json_array;
}

if(isset($users[$name]) ) {
	if( $users[$name]['pass'] !== $password ){
		http_response_code(400);
	}
} 
else {
	$users[] = array('name' => $name, 'pass' => $password);

	$new_users = array();
	$i = 0;
	foreach($users as $key => $user) {
		$new_user = $user;
		$new_user['id'] = $i;
		$new_users[ $user['name'] ] = $new_user;
		$i++;
	}

	file_put_contents($file, json_encode($new_users, JSON_PRETTY_PRINT));
}
?>