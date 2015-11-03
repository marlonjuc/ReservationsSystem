<?php
	require_once "database_connection.php";

	if(isset($_GET['siteid']))
	{
		$siteID = $_GET["siteid"];
		
		echo "<div id='wrapper'><div class='logo'></div><div class='separator'></div><div class='top_paint'></div><div class='section'>";
		
		if($_GET["siteid"] === '1')
		{
			$result = mysqli_query($con, "CALL GetFloors('$siteID')");
			
			
			while($rows = mysqli_fetch_array($result))
			{
				if($rows['ID'] != 10)//No Laptop necessary
				{
					echo "<div class='floor floor_".$rows['ID']."'><span class='octagon'><a href='reservations.php?siteid=".$siteID."&floorid=".$rows['ID']."'>".$rows['Name']."</a></span></div>";
				}
			}
				
			//get Colombia Site as well
			require "database_connection.php";
			$result = mysqli_query($con, "CALL GetFloors('2')");
			$row = mysqli_fetch_array($result);
			if($row['Name'] === 'One Story Plan')
			{
				$floorName = 'Colombia';
				echo "<div class='floor floor_".$row['ID']."'><span class='octagon'><a href='reservations.php?siteid=2&floorid=".$row['ID']."'>".$floorName."</a></span></div>";
			}
		}else
		{
			//get just Colombia Site
			require "database_connection.php";
			$result = mysqli_query($con, "CALL GetFloors('2')");
			$row = mysqli_fetch_array($result);
			if($row['Name'] === 'One Story Plan')
			{
				$floorName = 'Colombia';
				echo "<div class='floor singleFloor floor_".$row['ID']."'><span class='octagon'><a href='reservations.php?siteid=2&floorid=".$row['ID']."'>".$floorName."</a></span></div>";
			}
		}
		
		echo "</div><div class='separator'></div><h4>For booking select your location</h4><div class='bottom_paint'></div></div>";
	}
	
?>