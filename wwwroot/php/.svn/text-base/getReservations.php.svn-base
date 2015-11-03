<?php
	require "database_connection.php";
	include_once "getRooms.php";
	include_once("getCurrentTime.php");
	
	$timeZone = 'America/Costa_Rica';
    date_default_timezone_set($timeZone); 
	
	if((isset($_GET['siteid']) && isset($_GET['floorid']) && intval($_GET['floorid']) != 9) || isset($_POST['siteid']) && isset($_POST['floorid']) && intval($_POST['floorid']) != 9)// remove this validation intval(_METHOD['floorid'])) != 9 when doctors reservation needed
	{
		
		$siteID = $_GET["siteid"] ?: isset($_POST['siteid']);
		$floorID = $_GET["floorid"] ?: isset($_POST['floorid']);
		$week = array();
		
		$startDate = new DateTime($_SESSION['startDate']. ' 00:00:00');
		$tuesday = new DateTime($_SESSION['startDate']. ' 00:00:00');
		$tuesday->add(new DateInterval('P1D'));
		$wednesday = new DateTime($_SESSION['startDate']. ' 00:00:00');
		$wednesday->add(new DateInterval('P2D'));
		$thursday = new DateTime($_SESSION['endDate']. ' 00:00:00');
		$thursday->sub(new DateInterval('P1D'));
		$endDate = new DateTime($_SESSION['endDate']. ' 23:59:00');
		
		$week = array($startDate, $tuesday, $wednesday, $thursday, $endDate);
		
		$blocks = array("07:30:00", "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00");
		$medicalAppointmentsBlocks = array("07:30:00", "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00");
		
		$reservations = array();
		
		$weekLength = count($week);
		$roomsLength = count($rooms); // array variable $rooms, see getRooms.php;
		$blocksLength = count($blocks);
		
		require "database_connection.php";
		$result = mysqli_query($con, "CALL getFloor('$floorID')");
		$row = mysqli_fetch_array($result);
		
		if($row)
		{
			//assign floor style
			echo "<link id='style' rel='stylesheet' href='".$row['StylePath']."'>";
			
			$floorName = $row['Name'];
			$floorID = $row['ID'];
			
			if($floorName === "One Story Plan")
			{
				$floorName = "Colombia";
			}
			
			if(intval($floorID) == 9)
			{
				$blocksLength = count($medicalAppointmentsBlocks);
			}
			
			echo "<div class='header'><h1>".strtoupper($floorName)."</h1><div class='headerIcon'></div><h2>MEETING ROOM CALENDAR</h2><a href='rooms.php?siteid=1'><img src='img/ui/calendar/button_home.png' class='homeIcon'></a> </div>";
			
			echo "<div id='carousel' class='owl-carousel owl-theme'>";
			
			for($i = 0; $i < $weekLength; $i++)
			{
				echo "<div id='tableContainer' class='item'><table id='".$week[$i]->format('Y,m,d')."' class='db-table'>";
				echo "<caption>".$week[$i]->format('D') ." ". $week[$i]->format('M d Y')."</caption>";
				echo "<tr><th class='clock'></th>";
				
				for($j = 0; $j < $roomsLength; $j++)
				{
					echo "<th><img src='".$rooms[$j]["IconPath"]."' alt='".$rooms[$j]["Name"]."'></th>";		
				}
				
				echo "</tr>";
				
				for($k = 0; $k < $blocksLength; $k++)
				{
					echo "<tr id='".$blocks[$k]."'>";
					echo "<td class='block'>". substr($blocks[$k], 0, 5) ."</td>";
					
					for($l = 0; $l < $roomsLength; $l++)
					{
						echo "<td><div id='".$rooms[$l]["ID"] . " " . $week[$i]->format('Y-m-d') . " " . $blocks[$k]."'><div id='".$rooms[$l]["ID"] ."' date='". $week[$i]->format('Y-m-d') . " " . $blocks[$k] . "' class='add'></div></div></td>";
					}
					
					echo "</tr>";
				}		
				echo "</table></div>";
			}
			echo "</div>";
			callReservations($rooms, $week);
			
		}else//If none result returned from DataBase
		{
			echo "<script>window.parent.location = 'rooms.php?siteid=1';</script>";
		}
		
	}else//if none parameter provided 
	{
		echo "<script>window.parent.location = 'rooms.php?siteid=1';</script>";
	}

	
	function callReservations($rooms, $week)
	{
		$weekLength = count($week);
		$roomsLength = count($rooms);
			
		for($i = 0; $i < $weekLength; $i++)
		{	
			for($j = 0; $j < $roomsLength; $j++)
			{
				getReservations($rooms[$j]["ID"], $week[$i]->format('Y-m-d'), $week[$i]->format('Y-m-d'));		
			}
		}
		assembleReservations();
  	}
	
	function getReservations($roomID, $startDate, $endDate)
	{
		require "database_connection.php";
		
		global $reservations;
		$result = mysqli_query($con, "CALL getReservations('$roomID','$startDate')");
		
		if($result)
		{
			while($rows = mysqli_fetch_array($result))
			{	
				array_push($reservations, $rows);		
		    }
		}
	}
	
	function assembleReservations()
	{
		global $reservations;
		global $week;
		
		$reservationsLength = count($reservations);
		$weekLength = count($week);
		
		$db_date = new DateTime($_SESSION["db_date"] ." " . $_SESSION["db_time"]);
		//$db_time = new Time($_SESSION["db_time"]);
		
		echo "<script>
				var year = '".$db_date->format('Y'). "';
				var month = '".$db_date->format('m'). "';
				var day = '".$db_date->format('d'). "';
				var hour = '".$db_date->format('H'). "';
				var minutes = '".$db_date->format('i'). "';
				var seconds = '".$db_date->format('s'). "';
				var db_date = new Date(year, month - 1, day, hour, minutes, seconds);
				//console.log('Current Time : ' + '".$_SESSION["db_time"]."');
			</script>";
		
		for($i = 0; $i < $reservationsLength; $i++)
		{
			$divID = $reservations[$i]['room'] . " " . $reservations[$i]['date'];
			$reservationID = $reservations[$i]['id'];
			$creator = $reservations[$i]['creator'];
			$blocks = $reservations[$i]['blocks'];
			$blockDate = new DateTime($reservations[$i]['date']);
						
			for($countBlocks = 0; $countBlocks < $blocks; $countBlocks++)
			{
				echo "<script>
					var newElem = document.createElement('div');
		            newElem.innerHTML = '';
		            newElem.className = 'modify';
		            newElem.id = '$reservationID';
		            var div = document.getElementById('$divID');
		            div.innerHTML = '';
		            div.appendChild(newElem);
				</script>";
				if($blocks > 1)
				{
					$blockDate->add(new DateInterval('PT1800S'));
					$divID = $reservations[$i]['room'] . " " . $blockDate->format('Y-m-d H:i:s');
				}
			}	
		}
		echo "<script>
			$('#tableContainer table').each(function(){
				var parse = $(this).attr('id').match(/(\d+)/g); //issue with JS Date on Safari
				var tableDate = new Date(parse[0], parse[1]-1, parse[2]);
				tableDate.setHours(18);
				tableDate.setMinutes(30);
				tableDate.setSeconds(0);
				
				if(tableDate < db_date)
				{
					$(this).css('opacity', 0.5);
					$(this).find('td div div').removeClass('add');
					$(this).find('td div div').addClass('add-disabled');
					
				}else
				{
					var parse = $(this).attr('id').match(/(\d+)/g); //issue with JS Date on Safari	
					var sameDay = new Date(parse[0], parse[1]-1, parse[2]);				
					//var sameDay = new Date($(this).attr('id'));
					sameDay.setHours(hour);
					sameDay.setMinutes(minutes);
					sameDay.setSeconds(seconds);
					
					if(sameDay.getTime() === db_date.getTime())
					{
						//IS TODAY
						validateBlockDay($(this).attr('id'));
					}
				}
			});	
			
			//Desactivate Today Rows until DB Time
			function validateBlockDay(tableID)
			{	
				$('#tableContainer table tr').each(function(){
					if($(this).closest('table').attr('id') === tableID)
					{
						var rowTime = $(this).attr('id');
						var db_time = '".$db_date->format('H:i:s'). "';
						if(rowTime <= db_time)
						{	
							//console.log('On ' + tableID + ' desactivate ' + $(this).attr('id'));
							$(this).css('opacity', 0.5);
							$(this).find('td div div').removeClass('add');
							$(this).find('td div div').addClass('add-disabled');
						}
						//else, if mayor so is available.
					}
				});	
			}
		</script>";
	}
?>