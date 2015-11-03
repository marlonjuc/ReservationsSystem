<?php
	require_once "database_connection.php";
		
	$rooms = array();
	
	if(isset($_GET['siteid']) && isset($_GET['floorid']))
	{
		$siteID = $_GET["siteid"];
		$floorID = $_GET["floorid"];
		
		$result = mysqli_query($con, "CALL GetRooms('$floorID');");
		
		while($rows = mysqli_fetch_array($result))
		{
			array_push($rooms, array("ID"=>$rows["ID"],"Name"=>$rows['Name'],"IconPath"=>$rows["IconPath"]));
		}
	}
?>