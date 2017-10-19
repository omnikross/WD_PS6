<?php
include('../connection/db.php');
session_start();
$name     = $_POST['user'];
$password = $_POST['pass'];
$_SESSION['user'] = $name;
$_SESSION['pass'] = $password;

if (!isset($name, $password) || empty($name) || empty($password)){
	http_response_code(400);
	die();
}
$count = mysqli_query($connection, "SELECT `name` FROM  `users` WHERE(`name` = '$name')");
$nameAndPass = mysqli_query($connection, "SELECT * FROM  `users` WHERE(`name` = '$name' AND `password` = '$password')");

if (mysqli_num_rows($count) == 0)
{
	mysqli_query($connection, "INSERT INTO `users` (`name`, `password`) VALUES ('$name', '$password')");
} else 
{
	if(mysqli_num_rows($nameAndPass) == 1)
	{
		return true;
	}
	if(mysqli_num_rows($nameAndPass) == 0) 
	{
		http_response_code(400);
		die();
	}
}

mysqli_close($connection); 
?>