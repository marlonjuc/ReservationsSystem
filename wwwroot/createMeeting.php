<!DOCTYPE html>
<!--[if IE 7]>         <html class="ie7"> <![endif]-->
<!--[if IE 8]>         <html class="ie8"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Prodigious Latin America - Reservations</title>
        <meta name="description" content="This page is a customized web application to manage a list of meeting rooms. And create reservations It was built using DataBases/Back-End/Front-End Technologies. MySQL/PHP/JavaScript/jQuery/CSS/HTML" />
		<meta name="author" content="Prodigious Latin America - DTS Digital Studio" />
        <meta name="keywords" content="">
        
       <meta name="viewport" content="width=device-width, user-scalable=no" />
        
        <link rel="icon" href="http://prodigious.cr/favicon.ico" type="image/x-icon" />

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" type="text/css" href="css/createMeeting.css">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="js/greensock/TweenLite.min.js"></script>
        <script type="text/javascript" src="js/greensock/easing/EasePack.min.js"></script>
        <script type="text/javascript" src="js/greensock/plugins/CSSPlugin.min.js"></script>
        <script type="text/javascript" src="js/plugins/detectmobilebrowser.js"></script><!--Detect Mobile Devices-->
    </head>
    <body>
		 <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
		 <script src="js/createMeeting.js"></script>
		 <script type="text/javascript">
	        $(document).ready(function() {
	            // Handler for .ready() called.
	           initDOM();
	         });
        </script>
    </body>
</html>
<?php

require_once "php/database_connection.php";

$timeZone = 'America/Costa_Rica';
date_default_timezone_set($timeZone); 

if (isset($_GET['id']) or is_numeric($_GET['id']) && isset($_GET['date']) && isset($_GET['floor'])) 
{
	$roomID = $_GET['id'];
	$floorName = $_GET['floor'];
	$startDate = new DateTime($_GET['date']);
	$lastBlock = new DateTime($startDate->format('Y-m-d'));
	$lastBlock->add(new DateInterval('PT18H30M'));
	$initBlock = $startDate->format('Y-m-d H:i:s');
	$endingBlock = $lastBlock->format('Y-m-d H:i:s');
	
	$blocks = array ("07:30:00"=>1,"08:00:00"=>2,"08:30:00"=>3,"09:00:00"=>4,"09:30:00"=>5,"10:00:00"=>6,
	"10:30:00"=>7,"11:00:00"=>8,"11:30:00"=>9,"12:00:00"=>10,"12:30:00"=>11,"13:00:00"=>12,
	"13:30:00"=>13,"14:00:00"=>14,"14:30:00"=>15,"15:00:00"=>16,"15:30:00"=>17,"16:00:00"=>18,
	"16:30:00"=>19,"17:00:00"=>20,"17:30:00"=>21,"18:00:00"=>22,"18:30:00"=>23);
	
	$result = mysqli_query($con, "CALL GetNextAvailableBlock($roomID,'$initBlock','$endingBlock')");
	$rows = mysqli_fetch_array($result);
	
	$positionInitialBlock = $blocks[$startDate->format('H:i:s')];
	$blocksLength = count($blocks) + 1;
	
	echo "<link id='style' rel='stylesheet' href='".$_GET['style']."'>";
	
	if($rows)
	{
		$nextRowEndingBlock = new DateTime($rows['date']);
		$positionEndingBlock = $blocks[$nextRowEndingBlock->format('H:i:s')];
		$availableBlocks = $positionEndingBlock - $positionInitialBlock;
	}else
	{
		$availableBlocks = $blocksLength - $positionInitialBlock;
	}
	
	//at the end of the first result set.
	mysqli_free_result($result);
	//move to next result set
	mysqli_next_result($con);
	$result2 = mysqli_use_result($con);
	$row2 = mysqli_fetch_assoc($result2);
	
	loadMeetingData($startDate, $row2['Name'], $availableBlocks, $roomID, $floorName);
}

function loadMeetingData($date, $roomName, $availableBlocks, $roomID, $floorName)
{
	echo "<script>
			var roomID = '" . $roomID ."';
			var floorName = '" . $floorName ."';
			var availableBlocks = '" . ($availableBlocks + 1) ."';
			var year = '".$date->format('Y'). "';
			var month = '".$date->format('m'). "';
			var day = '".$date->format('d'). "';
			var hour = '".$date->format('H'). "';
			var minutes = '".$date->format('i'). "';
			var seconds = '".$date->format('s'). "';
			var meetingDate = new Date(year, month, day, hour, minutes, seconds);
	</script>";
	
	echo "<div id='containerPopup'>
			<h3>Please write down all the information to create a new meeting</h3>
			<form id='updateForm' >
			    <fieldset >
			        <div id='note'></div>
			        <div id='fields'>
			            <label>Date: </label>
			            <input type='text' name='date' value='".$date->format('Y-m-d')."' disabled='disabled'/><br />
			            <label>Hour: </label>
			            <input type='text' name='time' value='".$date->format('H:i:s')."'  disabled='disabled'/><br />
			            <label>Room Name: </label>
			            <input type='text' name='room' value='".$roomName."'  disabled='disabled'/><br />
			            <label>Blocks: </label>
			            <select id='blocks'> 
						</select><br />
			            <label>Description: </label>
			            <textarea id='description' rows='5' cols='25' maxlength='255'></textarea><span class='required'>*</span><br />
			            <label>Creator Email: </label>
			            <input type='text' name='email' value='' autocapitalize='off'/><span class='required'>*</span><br />
			             <div class='passwordField'>
				            <label>Password: </label>
				            <input type='password' name='password' value='' autocapitalize='off'/><span class='required'>*</span><br />
				        </div>
			            <div class='managerField'>
				            <label>Manager Email: </label>
				            <input type='text' name='managerEmail' value='' autocapitalize='off'/><span class='required'>*</span><br />
				        </div>
			            <input type='submit' value='Create Meeting' class='button'/>
			            <input type='reset' id='reset' value='Cancel' class='button'/>
			            <br/>
			        </div>
			    </fieldset>
			    <div id='output'></div>
			</form>
		</div>";
		echo "<script>
				validateDoctorReservation();
				validateTypeRoomReservation();
				validateMotionLabsReservation();
				populateComboBox();	
			 </script>";
}
?>
