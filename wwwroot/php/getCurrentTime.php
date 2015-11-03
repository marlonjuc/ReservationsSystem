<?php
	
	require "database_connection.php";
	
	$timeZone = 'America/Costa_Rica';
    date_default_timezone_set($timeZone);
	
	$result = mysqli_query($con, "CALL getCurrentTime()");
	
	$row = mysqli_fetch_array($result);
	
	if($row) 
	{
		//necessary dicrease one hour server side curTime, since is not CST
		$curentTime = new DateTime('2014-01-01 ' . $row[0]);
		$curentTime->sub(new DateInterval('PT1H'));
		$_SESSION["db_time"] = $curentTime->format('H:i:s');
		//$_SESSION["db_time"] = $row[0];
	}
	
?>