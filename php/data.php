<?php
include ('../connection/db.php');
$time = date('U');

$query = mysqli_query($connection, "SELECT * FROM `messages` WHERE('$time' - `time` <= 3600000)");

$result = $query or die(mysqli_error());
while($count = mysqli_fetch_all($result))
{
	echo json_encode($count);
}

mysqli_close($connection);
?>