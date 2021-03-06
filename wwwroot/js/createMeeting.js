function parseMinutes(minutes) {
    if(minutes < 10)
    {
    	
    	return '0' + minutes;
    }else
    {
    	return '' + minutes;
    }
}

function populateComboBox()
{	
	var untilBlockDate = new Date(meetingDate);
	//$('#blocks').append('<option value=0></option>');
	if(Number(roomID) === 29)// Medical appointments just one single block, half hour, 0:30 minutes
	{
		availableBlocks = 2;
		$('#blocks').prop('disabled', 'disabled');
	}
		for(var i = 1; i < availableBlocks; i++)
		{	
			untilBlockDate.setMinutes(untilBlockDate.getMinutes() + 30);
			
			$('#blocks').append('<option value='+ i + '>' + i + ' Block(s): (' + meetingDate.getHours() + ':' + parseMinutes(meetingDate.getMinutes()) + ' ► ' + untilBlockDate.getHours() + ':' + parseMinutes(untilBlockDate.getMinutes()) + ')</option>');
		}
}

function validateTypeRoomReservation()
{
	if(Number(roomID) === 4 || Number(roomID) === 30)//those rooms are password protected
	{
		$('#updateForm .passwordField').show();
	}
	else
	{
		$('#updateForm .passwordField').hide();
	}
}

function validateDoctorReservation()
{
	if(Number(roomID) === 29)
	{
		$('#updateForm .managerField').show();
	}else
	{
		$('#updateForm .managerField').hide();
	}
}


function validateMotionLabsReservation()
{
    if(Number(roomID) === 31 || Number(roomID) === 32)
    {
        $('#containerPopup h3').text("Please write down all the information to reserve a workstation");
        $("#updateForm :submit").val("Reserve");
    }
}



function initDOM(){
	
	resetForm();
		
	$("#reset").click(function( event ) {
		resetForm();	
		//window.parent.Shadowbox.close();
		window.parent.$.jeegoopopup.close(); 
		window.parent.location.reload();	
	});
	
	$("#updateForm").submit(function( event ) {
		// Stop form from submitting normally
		event.preventDefault();
		// Get some values from elements on the page:
		var $form = $(this);
		roomID = roomID;
		floorName = floorName;
		date = $form.find("input[name='date']").val();
		time = $form.find("input[name='time']").val();
		room = $form.find("input[name='room']").val();
		blocks = $("#blocks").val();
		description = $("#description").val();
		dateTime = date + " " + time;
		email = $form.find("input[name='email']").val();
		managerEmail = $form.find("input[name='managerEmail']").val();
		passwordTraining = $form.find("input[name='password']").val();
		passwordHumanResources = $form.find("input[name='password']").val();
		console.log(roomID + " --- " + date  + " ---- " + time + " " + blocks + " ---" + description + " ---- " + email + " ------ " + managerEmail + " ---- " + floorName);
		$('#output').css("opacity", 0);
		$('.required').css("opacity", 0);
		
		if(!$("#description").val() && !$form.find("input[name='email']").val())
		{
			$('#output').animate({opacity: 1}, 500, function() {});
			$("#description").next('.required').css("opacity", 1);
			$form.find("input[name='email']").next('.required').css("opacity", 1);
			$("#output").empty().append("Please complete the fields.");		
			return;
		}
		
		if(validateEmail(email))
		{
			if($("#description").val())
			{			
				/*Doctors Office*/
				if(Number(roomID) === 29)
				{
					if(validateEmail(managerEmail))
					{
						$('#output').css("opacity", 0);
						postReservation(roomID, dateTime, room, blocks, description, email, managerEmail, floorName);
					}else
					{
						$('#output').animate({opacity: 1}, 500, function() {});
						$form.find("input[name='managerEmail']").next('.required').css("opacity", 1);
						$("#output").empty().append("Email address is invalid. Please check.");
					}
				}
					//if is Training Room validate password
				if(Number(roomID) === 4)
				{
					if(passwordTraining === "Prodigiousle@rning123!")
					{
						$('#output').css("opacity", 0);
						postReservation(roomID, dateTime, room, blocks, description, email, managerEmail, floorName);
					}else
					{
						$('#output').animate({opacity: 1}, 500, function() {});
						$form.find("input[name='password']").next('.required').css("opacity", 1);
						$("#output").empty().append("Password is wrong.");
					}
				}//if is Human Resources Room validate password
				if(Number(roomID) === 30)
				{
					if(passwordHumanResources === "ProdigiousHR1!")
					{
						$('#output').css("opacity", 0);
						postReservation(roomID, dateTime, room, blocks, description, email, managerEmail, floorName);
					}else
					{
						$('#output').animate({opacity: 1}, 500, function() {});
						$form.find("input[name='password']").next('.required').css("opacity", 1);
						$("#output").empty().append("Password is wrong.");
					}			
				}	
				if(Number(roomID) != 30 && Number(roomID) != 4 && Number(roomID) != 29)
				{	
					$('#output').css("opacity", 0);
					postReservation(roomID, dateTime, room, blocks, description, email, managerEmail, floorName);		
				}	
			}else
			{
				$('#output').animate({opacity: 1}, 500, function() {});
				$("#description").next('.required').css("opacity", 1);
				$("#output").empty().append("Please add a description.");		
			}
		}else
		{
			$('#output').animate({opacity: 1}, 500, function() {});
			$form.find("input[name='email']").next('.required').css("opacity", 1);
			$("#output").empty().append("Email address is invalid. Please check.");	
		}		
	});
}

function postReservation(roomID, dateTime, room, blocks, description, email, managerEmail, floorName)
{
	//console.log("Room ID " + roomID + " Date " + dateTime +  " Room Name " + room + " Blocks " + blocks + " Description " + description + " Email " + email + " Manager " + managerEmail + " Floor " + floorName);
	// Send the data using post
	var posting = $.post("php/addReservation.php", {roomID:roomID, dateTime:dateTime, room:room, blocks:blocks, description:description, email:email, managerEmail:managerEmail, floorName: floorName});
	// Put the results in div
	posting.done(function( data ) {
		$('#output').animate({opacity: 1}, 500, function() {});
		if(Number(data) > 0)
		{
			if(Number(roomID) === 29)
			{
				$("fieldset").hide();
				$("#containerPopup h3").hide();
				$("#output").empty().append("Your medical appointment for " + dateTime + " at Doctor&#39;s office has been submitted succesfully. Regards.");	
			}else
			{
				$("fieldset").hide();
				$("#containerPopup h3").hide();
				$("#output").empty().append("Your reservation for " + dateTime + " at " + room + " has been submitted succesfully.\nYour reservation code is: " + data);
			}
			$(":submit").append("<div class='lockButton'></div>");
			$(":submit").attr("disabled", true);
			$("#updateForm textarea").attr("disabled", true);
			$("#updateForm :text").attr("disabled", true);
			$("#updateForm").append("<div class='lockButton'></div>");
			$("#reset").val("Close");
			//setTimeout(function(){ window.parent.Shadowbox.close();}, 18000);
			setTimeout(function(){ window.parent.$.jeegoopopup.close();}, 18000);
		}else
		{
			$("fieldset").hide();
			$("#containerPopup h3").hide();
			$("#output").empty().append("We are not available to submit your request now. Please try again later.");
			$(":submit").attr("disabled", true);
			$("#updateForm").append("<div class='lockButton'></div>");
			$("#reset").val("Close");
		}
	});
}

function resetForm()
{
	//$("#updateForm :text").val("");
	//$("textarea").val("");
	//$("#updateForm select").val("");
	$("#output" ).empty();
	$('#output').css("opacity", 0);
	$('.required').css("opacity", 0);
}

/* Miscelaneous functions*/

function validateEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
  if(regex.test( email) && email.match("prodigious.cr") || email.match("publicisgroupe.net")) 
  {
    return true;
  }else 
  {
    return false;
  }
}
