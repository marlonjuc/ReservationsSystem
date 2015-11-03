<?php
	require_once "php/database_connection.php";
	
	$result = mysqli_query($con, "CALL GetSites()");
	echo "<div id='container'><table class='db-table'><tr>";
	while($rows = mysqli_fetch_array($result))
	{
		echo "<th><a href='floors.php?siteid=".$rows['ID']."'>".$rows['Name']."</a></th>";
	}
	echo "</tr></table></div>";
	
?>