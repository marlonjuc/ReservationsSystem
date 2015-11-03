<?php

	require "database_connection.php";
	
	if(isset($_POST['reservationID']) && is_numeric($_POST['reservationID']) && isset($_POST['userEmail']))
	{
		$reservationID = $_POST['reservationID'];
		$userEmail = $_POST['userEmail'];
		
		$result = mysqli_query($con, "CALL RemoveReservation('$reservationID', '$userEmail')");	
		$row = mysqli_fetch_array($result);
		
		if(intval($row[0]) === 0)
		{
			echo $row[0];
		}else
		{
			$roomID = $row['room'];
			$creator = $row['creator'];
			require "database_connection.php";
			$result2 = mysqli_query($con, "CALL getRoom('$roomID')");
			$row2 = mysqli_fetch_array($result2);
			$roomName = $row2[0];
			echo $row['date'] . "\nat room " . $roomName . ".\nCreator " . $creator;
			//sendEmail($roomName, $roomID, $row['date'], $row['creator'], $row['manager']);
		}
	}			
			
	/*function sendEmail($roomName, $roomID, $date, $creator, $manager)
	{
		try{
			$from_email = "911@prodigious.cr";
			$replay_email = "911@prodigious.cr";
			$message = "Dear user, \n\nYour reservation for '". $date . "' at room '". $roomName . "' has been removed succesfully \nRegards";
			
			if(intval($roomID) === 29)// is medical appointment
			{
				$replay_email = $manager . "," . "911@prodigious.cr, manuela.quiros@prodigious.cr, doctor@prodigious.cr";
				$message = "Dear user, \n\nYour reservation for '". $date . "' at Doctor's office has been removed succesfully \nRegards";
			}
			if(intval($roomID) === 17 || intval($roomID) === 18)// is Colombia Site
			{
				$replay_email = "911@prodigious.cr";
				$message = "Dear user, \n\nYour reservation for '". $date . "' at room '". $roomName . "' has been removed succesfully \nRegards";
			}
			
			$headers = "From: " . $from_email . "\r\n";
			$headers .= "CC: " . $replay_email . "\r\n";
			
			mail($creator, "Reservation removed", $message , $headers );
		}catch( Exception $e){}
	}*/
	
	/*function sendEmail($roomName, $roomID, $date, $creator, $manager)
	{
		try{
			require '../mail/PHPMailerAutoload.php';
	
			$mail = new PHPMailer();
			$mail->IsSMTP();  // telling the class to use SMTP
			$mail->Host     = "10.66.17.16"; // SMTP server
			$mail->SMTPAuth = false;    
			$mail->From     = "911@prodigious.cr";
			$mail->AddAddress($creator);
			$mail->isHTML(true); 
			
			$mail->Subject  = "Reservation removed";
			$mail->Body     = "Dear user, \n\nYour reservation for '". $date . "' at room '". $roomName . "' has been removed succesfully \nRegards";
			$mail->WordWrap = 50;
			if(!$mail->Send()) {
				//echo 'Message was not sent.';
				//echo 'Mailer error: ' . $mail->ErrorInfo;
			} else {
				//echo 'Message has been sent.';
			}
		}catch( Exception $e){}
	}*/
	
	
?>
		