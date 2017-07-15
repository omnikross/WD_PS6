<?php
session_start();
$user = $_SESSION['user'];
$message = $_POST['message'];
$time = date('U');

$file = "../data/messages.json";
$json_content = json_decode(file_get_contents($file), true);

if (!empty($message)) {
	$json_content[] = array("time" => $time, "user" => $user, "message"  => $message, "id" => count($json_content) + 1);
	$content =  array("time" => $time, "user" => $user, "message"  => $message);

	file_put_contents($file, json_encode($json_content, JSON_PRETTY_PRINT));
}
echo json_encode($content);
?>