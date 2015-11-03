<?php
	require_once "database_connection.php";
	//require '../mail/PHPMailerAutoload.php';
    
	$timeZone = 'America/Costa_Rica';
    date_default_timezone_set($timeZone);
	
	if(isset($_POST["roomID"]) && isset($_POST["dateTime"]) && isset($_POST["room"]) && isset($_POST["blocks"]) && isset($_POST["description"]) && isset($_POST["email"]) && isset($_POST["managerEmail"]) && isset($_POST["floorName"])){
		$roomID = $_POST["roomID"];
		$dateTime = new DateTime($_POST["dateTime"]);
		$parseDate = $dateTime->format('Y-m-d H:i:s');
		$roomName = $_POST["room"];
		$blocks = $_POST["blocks"];
		$description = $_POST["description"];
		$email = $_POST["email"];
		$managerEmail = $_POST["managerEmail"];
		$floorName = $_POST["floorName"];
		$week = 0;
		
		$result = mysqli_query($con, "CALL AddReservation('$description','$parseDate','$week','$blocks','$email','$managerEmail','$roomID')");
		$row = mysqli_fetch_array($result);
		if($row)
		{
			echo $row[0];
			//sendEmail($roomID, $roomName, $parseDate, $email, $managerEmail, $row[0], $floorName);
		}
		
	}else{
		$_SESSION['ERROR'] = "Reservation couldn't created";
	}
	
	/*function sendEmail($roomID, $room, $date, $creator, $manager, $code, $floorName)
	{
		try{
			$from_email = "911@prodigious.cr";
			$replay_email = "911@prodigious.cr";
			$message = "Dear user, \n\nYour reservation for '". $date . "' at room '". $room . "' on floor '". $floorName . "' has been submitted succesfully \nYour reservation code is '" . $code . "' \n Regards";
					
			if(intval($roomID) === 29)// is medical appointment
			{
				$replay_email = $manager . "," . "medicalappointments@prodigious.cr, manuela.quiros@prodigious.cr, doctor@prodigious.cr";
				$message = "Dear user, \n\nYour medical appointment for '". $date . "' at Doctor's office has been submitted succesfully \nFor removing this appointment please contact Reception Desk\n Regards";
				mail("manuela.quiros@prodigious.cr", "Medical Appointment created", "New Medical Appointment Created by : " . $creator . " on Date : " . $date . "\nCode : " . $code, "From: reservation@prodigious.cr");
			}
			if(intval($roomID) === 17 || intval($roomID) === 18)// is Colombia Site
			{
				$replay_email = "manuela.quiros@prodigious.cr";
				$message = "Dear user, \n\nYour reservation for '". $date . "' at room '". $room . "' on floor '" . $floorName . "' has been submitted succesfully \nYour reservation code is '" . $code . "' \n Regards";
			}
			
			$headers = "From: " . $from_email . "\r\n";
			$headers .= "CC: " . $replay_email . "\r\n";
			
			mail($creator, "Reservation created", $message, $headers );
		}catch( Exception $e){}
	}*/
	
	/*function sendEmail($roomID, $room, $date, $creator, $manager, $code, $floorName)
	{
		try{
			$mail = new PHPMailer();
			$mail->IsSMTP();  // telling the class to use SMTP
			$mail->Host = "10.66.17.16"; // SMTP server
			$mail->SMTPAuth = false;    
			$mail->From = "911@prodigious.cr";
			$mail->AddAddress($creator);
			$mail->isHTML(true); 
			
			$mail->Subject  = "Reservation created";
			$mail->Body     = "Dear user, \n\nYour reservation for '". $date . "' at room '". $room . "' on floor '" . $floorName . "' has been submitted succesfully \nYour reservation code is '" . $code . "' \n Regards";
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