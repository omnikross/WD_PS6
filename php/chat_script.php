<?php
include('../connection/db.php');
session_start();
$name = $_SESSION['user'];
$message = $_POST['message'];
$time = date('U');

if ( !empty($message) ) 
{
	mysqli_query($connection, "INSERT INTO `messages` (`time`, `name`, `message`) VALUES ('$time', '$name', '$message')");
}
mysqli_close($connection); 

$content =  array("time" => $time, "user" => $user, "message"  => $message);
echo json_encode($content);
?>