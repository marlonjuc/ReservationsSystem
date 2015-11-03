
/*jQuery DatePicker UI Widget. More documentation http://jqueryui.com/datepicker */

var startDate;
var endDate;

function initDatePicker()
{ 
	$('#datepicker').datepicker( {
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    dateFormat: "yy-mm-dd",
	    selectWeek:true,
	    closeOnSelect:false,
	    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],  
	    onSelect: function(dateText, inst) { 
	        postNewWeek();
	    },
	    onChangeMonthYear: function(year, month, inst) {
	    	//showWeekend();
	    	setTimeout(function(){showWeekend(); addPickerMouseEvents();}, 250);
	    }
	});
	
	getDataBaseDate();
	
	//initShadowBox();

	/*$('body #tableContainer').each(function(){
		TweenLite.to($('#carousel'), .7, {css:{opacity:1}, ease:Power1.easeOut});
	});*/

	/*if(jQuery.browser.mobile)
	{
		initTouchScreenDragGesture();
		addDatePickerMobileButton();
		replaceAndOrderCellItemsMobile();
	}
	else if(navigator.userAgent.match(/iPad/i))
	{
		initTouchScreenDragGesture();
		replaceAndOrderCellItemsTablet();
		placeHomeIcon();
	}*/
	
	//else
	//{
		replaceAndOrderCellItemsTablet();
		placeHomeIcon();
	//}
	
	var refreshInterval = setInterval(function(){window.location = "rooms.php?siteid=1";}, 300000);
	
	$('body').scrollTop(0);
}

function selectCurrentWeek()
{	
	var link = $('#datepicker').find('.ui-datepicker-current-day a').text();
	var tr = $('#datepicker').find('.ui-datepicker-current-day').parent();
	var a = tr.find('a');
	a.addClass('ui-state-active ');
	var td = $('#datepicker').find('.ui-datepicker-week-end');
	var a = td.find('a');
	a.removeClass('ui-state-active ui-state-default');
	a.addClass('ui-datepicker-week-end');
}

function showWeekend()
{	
	$('tbody .ui-datepicker-week-end a').each(function(){
		$(this).removeClass('ui-state-default');
		$(this).addClass('ui-datepicker-week-end');
	});
}

function postNewWeek()
{
	var date = $('#datepicker').datepicker('getDate');
	startDate = formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1));
	endDate = formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 5));
	postingEvent = $.post("php/events.php", {event : "onDateChanged", startDate : startDate, endDate : endDate, date: date});
	postingEvent.done(function(data) {
		postingEvent = $.post("php/getReservations.php", {siteid : getURLParameter('siteid'), floorid : getURLParameter('floorid')});
		postingEvent.done(function(data) {
			window.location.reload();
		});
	});
}

function getDataBaseDate()
{
	var postingEvent = $.post("php/events.php", {event : "onDatePickerReady"});
	postingEvent.done(function(data) {
		$('#datepicker').datepicker('setDate', data);
		//console.log("Date from DataBase: " + data);
		addPickerMouseEvents();
		var date = $('#datepicker').datepicker('getDate');
		startDate = formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1));
	    endDate = formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 5));
	    //console.log("Week: Monday " + startDate + " >> Friday " + endDate);
	    postingEvent = $.post("php/events.php", {event : "onInitialDateReady", startDate : startDate, endDate : endDate});
	    postingEvent.done(function(data) {
	    	selectCurrentWeek();
	    });
	});
}

function addPickerMouseEvents(){
	$('#datepicker .ui-datepicker-calendar tr').mousemove(function() {
	 	$(this).find('td a').addClass('ui-state-hover');
	 });
	$('#datepicker .ui-datepicker-calendar tr').mouseleave(function() {
	 	$(this).find('td a').removeClass('ui-state-hover');
	});
}

function placeHomeIcon()
{
	var leftPosition = 0;
	
	$('body #tableContainer').each(function(){
		
		leftPosition += ($(this).width() + parseInt($(this).css("margin-right")));
	});
	var newLeft = (leftPosition + $('#container').width() - $(".homeIcon").width() - 10);
	//console.log("User's Screen Width: " + $(window).width())
	$(".homeIcon").css('float', 'right');
	$(".homeIcon").css('position', 'relative');
	$(".homeIcon").css('margin-right', '4px');
	if($(window).width() < 1300)
	{
		//$("#carousel").css('width', leftPosition + 'px');
		//$(".homeIcon").css('left', newLeft + 'px');	
	}else
	{
		//$(".homeIcon").css('float', 'right');
		//$(".homeIcon").css('position', 'relative');
		//$(".homeIcon").css('margin-right', '4px');		
	}
	$(".homeIcon").show();
}

function resizeElements()
{
	if($('#infoPanel #content .labelPanel .labelEmail').text().length >= 30)
	{
	 	$('#infoPanel #content .labelPanel .labelEmail').css('font-size', '12px');
	}else
	{
	 	$('#infoPanel #content .labelPanel .labelEmail').css('font-size', '14px');
	}
}

function addDatePickerMobileButton()
{ 	
	//$(".mobileWeekSelector").before($("#datepicker"));
	$("<div class='whiteBorderMask'></div><div class='mobileWeekSelector'>SELECT WEEK HERE <span class='arrow'></span></div>").insertBefore('#datepicker');
	$("#datepicker").hide();
	$("#infoPanel").hide();
	var isDatePickerCollapsed = true;
	$("#datepicker").css("top", "-600px");
	TweenLite.to($(".mobileWeekSelector"), .7, {css:{opacity:1}, ease:Power1.easeOut});
	$('.mobileWeekSelector').on('click', function(){
		if(isDatePickerCollapsed)
		{
			isDatePickerCollapsed = false;
			$("#datepicker").show();
			TweenLite.to($("#datepicker"), .7, {css:{top:'6px'}, ease:Power1.easeOut});
			$(this).children(".arrow").css("background-image", "url(img/ui/calendar/up_arrow_mobile.png)");
		}else{
			isDatePickerCollapsed = true;
			TweenLite.to($("#datepicker"), .7, {css:{top:'-600px'}, ease:Power1.easeOut, onComplete:function(){$("#datepicker").hide();}});
			$(this).children(".arrow").css("background-image", "url(img/ui/calendar/down_arrow_mobile.png)");
		}
	});
}

/*init Own Carousel Touch Scren drag gesture http://www.owlgraphic.com/owlcarousel/*/

function initTouchScreenDragGesture()
{
	var owl = $("#carousel");
 	
	owl.owlCarousel({
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
		itemsTablet: [768,1],
		itemsMobile : [640,1],
		navigation : true
	});
}


function replaceAndOrderCellItemsMobile()
{
	
	$('#tableContainer tr th').each(function() {
   	 	var $this = $(this);
    	var img = $this.find('img').detach();
    	$this.empty().append(img.attr("alt"));
    	
    	if($this.text().indexOf("Conference ") >= 0 )// Nameroom.text.length is too big and tables has too many columns
    	{
    		var nameRoomSplitted = $this.text().replace("Conference Bridge ","Bridge #");
    		$this.text("");
    		$this.empty();
    		$this.text(nameRoomSplitted);
    	}
	});
	
	$("#tableContainer tr th img").attr('src','');
	$("#tableContainer tr .clock").text("TIME");
	
	var numChildsTR = $("#tableContainer tr:first").children().length;
	var tableWidth = $("#tableContainer").width();
	var eachTHWidth = Number($("#tableContainer").width()) / Number(numChildsTR);
	$("#tableContainer tr th").css("width", eachTHWidth + "px");
	$("#tableContainer th").css("height", eachTHWidth / 2 + "px");
	$("#tableContainer td").css("height", eachTHWidth / 2 + "px");
	$("#tableContainer td .add,.add-disabled,.modify").css("height", eachTHWidth / 2 + "px");
	
	// ./img/ui/calendar/add_icon_mobile.png is 43px width x 44px height
	var newBGPositionLeft = ($("#tableContainer td").width() - 43) / 2;
	var newBGPositionTop = ($("#tableContainer td").height() - 44) / 2;
	$("#tableContainer td .add,.add-disabled").css("background-position", newBGPositionLeft + "px " +  newBGPositionTop + "px");
	
	//any padlock icon for mobile version are 41px width x 49px height, for example: ./img/ui/calendar/dark_orange_padlock_mobile.png
	newBGPositionLeft = ($("#tableContainer td").width() - 41) / 2;
	newBGPositionTop = ($("#tableContainer td").height() - 49) / 2;
	$("#tableContainer td .modify").css("background-position", newBGPositionLeft + "px " +  newBGPositionTop + "px");
	
	//replace home icon src
	$(".header a img").attr("src", "img/ui/calendar/button_home_mobile.png");
	$(".homeIcon").css('left', (640 - $(".homeIcon").width()) + 'px');
	$(".homeIcon").show();
	TweenLite.to($(".header"), .7, {css:{opacity:1}, ease:Power1.easeOut});
	if($(".header h1").text().length > 12)
	{
		$(".header h1").css("font-size", "38px");
		$(".header h1").css("line-height", "38px");
	}
}

function replaceAndOrderCellItemsTablet()
{
	TweenLite.to($(".header"), .7, {css:{opacity:1}, ease:Power1.easeOut});
}

/*Initialationo Other user interface components **/

$('.modify').on('click', function(){
	//console.log(this.id);
	var reservationID = this.id;
	var posting = $.post("php/getSpecificReservation.php", {reservationID : reservationID});
	posting.done(function(data) {
		//console.log(">>>>>>> " + data.creator);
		$('#infoPanel #content').html(data);
		resizeElements();
	});
});


$('.add').on('click', function(){
	sendToCreateMeetingPopup(this.id, $(this).attr('date'), $("body h1").text());
});


$('.remove').on('click', function(){
	var reservationID = $("#code").val();
	var userEmail = $("#userEmail").val();
	if(Number(reservationID) > 6000)
	{
		if(validateEmail(userEmail)){
			var posting = $.post("php/removeReservation.php", {reservationID : reservationID, userEmail : userEmail});
			$('.output').css('opacity', 0);
			posting.done(function(data) {
				if(Number(data) === 0)
				{
					$('.output').html("<div class='exclamation'></div>Reservation ID doesn't exist. Or you don't have permission to remove this reservation");
					$('.output').animate({opacity: 1}, 500, function() {});
				}else{
					$('.output').html("Your reservation on " + data + " has been removed succesfully.");		
					$('.output').animate({opacity: 1}, 500, function() {initAutoRefresh();});
				}	
			});
		}else{
			$('.output').html("<div class='exclamation'></div>Email address is invalid. Please check");
			$('.output').animate({opacity: 1}, 500, function() {});
		}
	}else
	{
		$('.output').html("<div class='exclamation'></div>Please ingress a valid Reservation ID.");
		$('.output').animate({opacity: 1}, 500, function() {});
	}
});

function initAutoRefresh()
{
	setTimeout(function(){ window.location.reload();}, 3000);
}


/*ShadowBox Popup Settings. More documentation http://www.shadowbox-js.com */

function initShadowBox(){
	Shadowbox.init({
		 language: 'en',
		 onClose: function(){ window.location.reload(); }
	});
}

/*function sendToCreateMeetingPopup(id, date)
{
	var style = $("body").find("link").attr("href");
	
	var popupWidth = 545;
	var popupHeight = 600;
	
	if(jQuery.browser.mobile)
	{
		popupWidth = 620;
		popupHeight = 640;
	}
	
	Shadowbox.open({
		content: 'createMeeting.php?id=' + id + '&date=' + date + '&style=' + style,
		player:  'iframe',
		width: popupWidth,
		height: popupHeight
	});		
}*/

/*Jeegoopopup Popup Settings. More documentation http://www.tweego.nl/jeegoopopup/ */

function sendToCreateMeetingPopup(id, date, floor)
{
	var style = $("body").find("link").attr("href");
	
	var popupWidth = 575;
	var popupHeight = 640;
	var popupLeft = null;
	var popupTop = null;
	
	if(parseInt(id) === 4 || parseInt(id) === 30)
	{
		var popupHeight = 700;
	}
	
	if(jQuery.browser.mobile)
	{
		popupWidth = 575;
		popupHeight = 640;
		popupTop = 40;
		popupLeft = 20;
	}
	
	 $.jeegoopopup.open({
	    url: 'createMeeting.php?id=' + id + '&date=' + date + '&style=' + style + '&floor=' + floor,
	    width: popupWidth,
	    height: popupHeight,
	   	top:popupTop,
	   	left:popupLeft,
	    skinClass: 'jg_popup_round', 
	    resizable: false,
	    scrolling: true,
	    fixed:false,
	    onClose: function(data){
	        window.location.reload();
	    }
	});
}


/*Miscelaneous fnctions*/

function formatDate(d)
{
    var month = d.getMonth();
    var day = d.getDate();
    month = month + 1;
    month = month + "";
    if (month.length == 1)
    {
        month = "0" + month;
    }
    day = day + "";
    if (day.length == 1)
    {
        day = "0" + day;
    }
    return d.getFullYear() + '-' + month + '-' + day;
}

// copyright 1999 Idocs, Inc. http://www.idocs.com
// Distribute this script freely but keep this notice in place
function numbersonly(myfield, e, dec)
{
	var key;
	var keychar;
	
	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	
	// control keys
	if ((key==null) || (key==0) || (key==8) || 
	    (key==9) || (key==13) || (key==27) )
	   return true;
	
	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	
	// decimal point jump
	else if (dec && (keychar == "."))
	   {
	   myfield.form.elements[dec].focus();
	   return false;
	   }
	else
	   return false;
}


function getURLParameter(sParam) { 
	var sPageURL = window.location.search.substring(1); 
	var sURLVariables = sPageURL.split('&'); 	
	for (var i = 0; i < sURLVariables.length; i++) 	
	{ 
		var sParameterName = sURLVariables[i].split('='); 
		if (sParameterName[0] == sParam) 
		{ 
			return sParameterName[1]; 
		} 
	} 
}

function validateViewports()
{
	/*if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) 
	{
	    $('head').append('<meta name="viewport" content="width=device-width,initial-scale=0.0,maximum-scale=1.0, user-scalable=0">');
	} 
	if ( navigator.userAgent.match(/iPad/i) ) 
	{
	    $('head').append('<meta name="viewport" content="initial-scale=0.0, width=device-width, user-scalable=yes">');
	}
	/*else if ( navigator.userAgent.match(/Android/i) ) 
	{
	    $('head').append('<meta name="viewport" content="initial-scale=0.0, maximum-scale=5.0, user-scalable=1">');
	    if ( navigator.userAgent.match(/Chrome/i)) //Chrome en Galaxy Tab
		{
	    	$('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes">');
		}
	}*/
	//alert("Browser : " + navigator.userAgent);
}

/* Miscelaneous functions*/

function validateEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
  if(regex.test( email)) 
  {
    return true;
  }else 
  {
    return false;
  }
}

