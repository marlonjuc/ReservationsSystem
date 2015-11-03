

function addMouseEvents()
{
	$('.floor').on('click', function(){
		$(this).children('span').children('a').css('text-decoration', 'none');
		window.location = $(this).children('span').children('a').attr('href');
	});
	
	$('.floor').on('mouseover', function(){
		$(this).children('span').children('a').css('text-decoration', 'underline');
	});
	
	$('.floor').on('mouseout', function(){
		$(this).children('span').children('a').css('text-decoration', 'none');
	});
}

function showSection()
{
	TweenLite.to($(".section"), .7, {css:{opacity:1}, ease:Power1.easeOut});
}

function validateViewports()
{
	/*if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) 
	{
	    $('head').append('<meta name="viewport" content="width=device-width, user-scalable=1">');
	} */
	if(navigator.userAgent.match(/iPad/i))
	{
	    $('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes">');
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
