<?php
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
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/responsive.css">
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="js/greensock/TweenLite.min.js"></script>
        <script type="text/javascript" src="js/greensock/easing/EasePack.min.js"></script>
        <script type="text/javascript" src="js/greensock/plugins/CSSPlugin.min.js"></script>
        <script type="text/javascript" src="js/plugins/detectmobilebrowser.js"></script><!--Detect Mobile Devices-->
    </head>
    <body>
    	
    	<?php
    		include('php/main.php');
    		include('php/getFloors.php');		
		?> 
		 <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
		 <script src="js/rooms.js"></script>
		 <script type="text/javascript">
	        $(document).ready(function() {
	            // Handler for .ready() called.
	            addMouseEvents();
	            showSection();
	            validateViewports();
	         });
        </script>
    </body>
</html>