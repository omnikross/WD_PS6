<?php
session_start();
$user = $_SESSION['user'];
$message = $_POST['message'];
$time = date('U');

$smile = array(":)", ":(");
$grafic = array("<img src = './image/Smile.png' alt='Smile' align='middle'>",
	"<img src = './image/Sad.png' alt='Smile' align='middle'>"); 	
$new_message = str_replace($smile, $grafic, $message);

$file = "../data/messages.json";
$json_content = json_decode(file_get_contents($file), true);

if (!empty($new_message)) {
	$json_content[] = array("time" => $time, "user" => $user, "message"  => $new_message);
	$content =  array("time" => $time, "user" => $user, "message"  => $new_message);

	file_put_contents($file, json_encode($json_content, JSON_PRETTY_PRINT));
}
echo json_encode($content);
?>