<?php
	// Create connection
	$con = mysqli_connect("localhost", "root", "123queso", "prodigiousmeetings");
	//$con = mysqli_connect("meetings.boszdigital.com", "bzmeetings", "marencocomemocos", "bzmeetings");
	//$con = mysqli_connect("localhost", "meetings", "Meet1ngS2014", "meetings");
	$con->set_charset("utf8");
	// Check connection
	if (mysqli_connect_errno())
	{
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  mysqli_close($con);
	}else
	{
		//echo "Shinning Like a New Penny: ";
	}
?> 