<?php
	require_once "database_connection.php";
	
	$timeZone = 'America/Costa_Rica';
    date_default_timezone_set($timeZone); 
	
	if (isset($_POST['reservationID'])) 
	{
		$reservationID = $_POST['reservationID'];
		$result = mysqli_query($con, "CALL SearchReservationInfo('$reservationID')");
		$row = mysqli_fetch_array($result);
		
		$date = new DateTime($row['date']);
		$creator = $row['creator'];
		$description = $row['description'];
		$roomName = "";
		//at the end of the first result set.
		mysqli_free_result($result);

		//move to next result set
		mysqli_next_result($con);
		$result2 = mysqli_use_result($con);
		$row2 = mysqli_fetch_assoc($result2);
		$roomName = $row2['Name'];
		
		echo "<div class='labelPanel'><b>Date: </b></br>".$date->format('Y-m-d')."</div></br>
				<div class='labelPanel'><b>Owner: </b></br><span class='labelEmail'>".$creator."</span></div></br>
				<div class='labelPanel'><b>Description: </b></br>".$description."</div></br>
				<div class='labelPanel'><b>Room Name: </b></br>".$row2['Name']."</div></br>";
	} else 
	{
  		echo "None Reservation ID provided.";
	}

?>