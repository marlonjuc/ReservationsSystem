<?php
	
	session_start();
	
	if (isset($_POST["event"]) == "onDatePickerReady")
	{
		echo $_SESSION["date"];	
	}
	if (isset($_POST["event"]) == "onInitialDateReady")
	{
		if (isset($_POST["startDate"]) && isset($_POST["endDate"]))
		{
			$_SESSION["startDate"] = $_POST["startDate"];
			$_SESSION["endDate"] = $_POST["endDate"];
		}
	}
	if (isset($_POST["event"]) == "onDateChanged")
	{
		if (isset($_POST["startDate"]) && isset($_POST["endDate"]) && isset($_POST["date"]))
		{
			$_SESSION["startDate"] = $_POST["startDate"];
			$_SESSION["endDate"] = $_POST["endDate"];
			$_SESSION["date"] = $_POST["startDate"];
		}
	}

?>