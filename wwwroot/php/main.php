<?php
	session_unset();
	session_destroy();
	session_start();
	
	require_once "database_connection.php";
	
	$timeZone = 'America/Costa_Rica';
    date_default_timezone_set($timeZone); 
		
	$query  = "CALL getCurrentDate();";
	$query .= "CALL getCurrentTime();";
	$query .= "CALL First_Day_Of_Week();";
	$query .= "CALL Last_Day_Of_Week()";
	$multiQueryResults = array();
	
	if (mysqli_multi_query($con, $query)) {
    do {
        /* store first result set, then next query cursos placed*/
        if ($result = mysqli_store_result($con)) {
            while ($row = mysqli_fetch_row($result)) {
				array_push($multiQueryResults, $row[0]);
            }
            mysqli_free_result($result);
        }
    } while (mysqli_next_result($con));
	
	$_SESSION["date"] = $multiQueryResults[0];
	$_SESSION["db_date"] = $multiQueryResults[0];
	
	//necessary dicrease one hour server side curTime, since is not CST
	$curentTime = new DateTime('2014-01-01 ' . $multiQueryResults[1]);
	$curentTime->sub(new DateInterval('PT1H'));
	$_SESSION["db_time"] = $curentTime->format('H:i:s');
	//$_SESSION["db_time"] = $multiQueryResults[1];
	
	$date = new DateTime($multiQueryResults[2]);
	$_SESSION["startDate"] = $date->format('Y-m-d');
	$date = new DateTime($multiQueryResults[3]);
	$_SESSION["endDate"] = $date->format('Y-m-d');
}
	
?>
