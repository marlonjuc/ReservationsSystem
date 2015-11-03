<?php
	//session_unset();
	//session_destroy();
	session_start();
?> 
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
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/responsive.css">
        <!--<link rel="stylesheet" type="text/css" href="css/shadowbox.css">-->
        <link rel="stylesheet" type="text/css" href="css/jeegoopopup.css">
		<link rel="stylesheet" type="text/css" href="css/owl/owl.carousel.css">
		<link rel="stylesheet" type="text/css" href="css/owl/owl.theme.css">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="js/greensock/TweenLite.min.js"></script>
        <script type="text/javascript" src="js/greensock/easing/EasePack.min.js"></script>
        <script type="text/javascript" src="js/greensock/plugins/CSSPlugin.min.js"></script>
        <script type="text/javascript" src="js/plugins/detectmobilebrowser.js"></script><!--Detect Mobile Devices-->
        <script type="text/javascript" src="js/plugins/owl.carousel.js"></script>
        <!--<script type="text/javascript" src="js/plugins/shadowbox.js"></script>-->
        <script type="text/javascript" src="js/plugins/jquery.jeegoopopup.1.0.0.js"></script>
    </head>
    <body>
    	<?php
    		
    		include('php/getReservations.php');
			include('php/removeReservation.php');
			include("php/getCurrentTime.php");
		?> 
		<div id="container">
			
			<div id="datepicker"></div>
			
			<div id="infoPanel">
				<div class="infoPanelHeader">Meeting Information</div>
				<div id="content">
					<div class="labelPanel"><b>Date: </b></div></br>
					<div class="labelPanel"><b>Owner: </b></div></br>
					<div class="labelPanel"><b>Description: </b></div></br>
					<div class="labelPanel"><b>Room Name: </b></div></br>
				</div>
				<div class="infoPanelFooter">
					<span class="title">Code</span>
					<input type="number" name="code" value="" id="code" maxlength="7" onKeyPress="return numbersonly(this, event)"/>
					<span class="title">Email</span>
					<input type="input" name="userEmail" value="" id="userEmail" maxlength="45"/>
					<div class="remove"></div>
				</div>
			</div>
			<div class="output"></div>
		</div>
		 <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
		 <script src="js/reservations.js"></script>
		 <script type="text/javascript">
	        $(document).ready(function() {
	            // Handler for .ready() called.
	            initDatePicker();            
	            validateViewports();
	         });
        </script>
    </body>
</html>