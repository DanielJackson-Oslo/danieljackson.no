// js.js
// (c) Daniel Jackson, utherless otherwise noted.
// Released free for non-commercial use. Steal and share.
// For commercial use, please contact me at daniel@snilldesign.no



var markerPosition;
var processing = false;

// Generic delay function
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

$(window).resize(function() {
	console.log("resize");
	delay(function(){ 
		resizeBottomPadding()},300);
	delay(function(){ 
		redrawCarousel()},300);
});
// Setting up the bottom padding:
function resizeBottomPadding() {
	var viewPortHeight = $(window).height();
	var heightOfContactPage = $("#bottomBox").height();
	var correctPadding = viewPortHeight - heightOfContactPage - 10;
	if (correctPadding < 20) {
		correctPadding = 20;
	}
	$("#bottomBox").css("padding-bottom",correctPadding + "px");
}


// Getting the current waypoints highlighted when scrolling 
$("#content .wp").waypoint(function() {
	if (processing) {
		// Sorry, clicky is doing his work. You'll have to wait. 
	} else {
		// Remove all
		$('#menubar li a').each(function() {
			$(this).removeClass("current");
		});
		// Find corresponding menu item and add to it
		var id = $(this).attr("id");
		$('#menubar li a[href="#'+id+'"]').addClass("current"); 
		
		// Find correct marker position: 
		var currentPosition = $('#menubar li a[href="#'+id+'"]').position().top;
		markerPosition = (currentPosition + 10);
		
		// Stop any current animation from completing and place the marker
		$('#menubar').stop().animate({backgroundPosition: "right " + markerPosition + "px"},150);
	}
}, {
	offset: '0',
	continuous: true
});


// if it's clicked then ignore crolling and just go there
$('#menubar li a').click(function() {
	// Hinder scrolling from triggering during click

	processing = true;
	
	// Remove all
	$('#menubar li a').each(function() {
		$(this).removeClass("current");
	});
	// Find corresponding menu item and add to it
	$(this).addClass("current"); 
	
	// Find correct marker position: 
	var currentPosition = $(this).position().top;
	markerPosition = (currentPosition + 10);
	
	// Stop any current animation from completing and place the marker
	$('#menubar').stop().animate({backgroundPosition: "right " + markerPosition + "px"},150);
		
	// Release scrolling again, now that we've finished up:
	delay(function() {
		processing = false;
	},500); // TODO: Fix s� det ikke er en arbitr�r mengde, men den faktisk venter til alt er ferdig.
});

var carouselWidth = $('#main .carousel').width();
$(document).ready(function() {

	// Set the bottom padding correctly according to size of screen and #bottom page:
	resizeBottomPadding();

	// Set up Carousel:
	$('#main .carousel').css('position','relative');
	$('#main .carousel').css('height','325px');
	var startingPosition = 0;
	var numberOfImages = $('#main .carousel div').length;
	$('#main .carousel div').each(function() {
		$(this).css('position','absolute');
		$(this).css('top','0');
		$(this).css('left',startingPosition);
		startingPosition = startingPosition + Math.floor(carouselWidth / (numberOfImages));
	});
});

// Set Carousel right on hover:
$('#main .carousel div').hover(function() {
	// Remove class from all:
	$("#main .carousel div").removeClass("current");
	// Find position
	var currentPosition = $("#main .carousel div").index($(this));
	// Set to right class:
	$(this).addClass("current");
	
	// Move current accordingly, unless at start:
	var startingPosition = 0;
	if (currentPosition > 0) {
		startingPosition = Math.floor(carouselWidth * 0.05 * currentPosition);
	} 
	$(this).stop().animate({'left' : startingPosition},200);
	// Move all others:
	$("#main .carousel div").each(function() {
		var nonHoverCurrentPosition = $("#main .carousel div").index($(this));
		var nonHoverStartingPosition = 0;
		// If after then give them a slice each:
		if (nonHoverCurrentPosition > currentPosition) {
			var nonHoverStartingPosition = Math.floor(carouselWidth - carouselWidth * 0.05 * ($("#main .carousel div").length - nonHoverCurrentPosition));
			$(this).stop().animate({'left' : nonHoverStartingPosition},200);
		// If before
		} else if (nonHoverCurrentPosition < currentPosition) {
			var nonHoverStartingPosition = Math.floor(carouselWidth * 0.05 * nonHoverCurrentPosition);
			$(this).stop().animate({'left' : nonHoverStartingPosition},200);
		}
	});
	
});

// Set it right on resize:
function redrawCarousel() {
	// Find new width: 
	carouselWidth = $('#main .carousel').width();

	// Find position
	var currentPosition = $("#main .carousel div").index($("#main .carousel div.current"));
	
	// Move current accordingly, unless at start:
	var startingPosition = 0;
	if (currentPosition > 0) {
		startingPosition = Math.floor($('#main').width() * 0.05 * currentPosition);
	} 
	$("#main .carousel div.current").stop().animate({'left' : startingPosition},200);
	// Move all others:
	$("#main .carousel div").each(function() {
		var nonHoverCurrentPosition = $("#main .carousel div").index($(this));
		var nonHoverStartingPosition = 0;
		// If after then give them a slice each:
		if (nonHoverCurrentPosition > currentPosition) {
			var nonHoverStartingPosition = Math.floor($('#main').width() - $('#main').width() * 0.05 * ($("#main .carousel div").length - nonHoverCurrentPosition));
			$(this).stop().animate({'left' : nonHoverStartingPosition},200);
		// If before
		} else if (nonHoverCurrentPosition < currentPosition) {
			var nonHoverStartingPosition = Math.floor($('#main').width() * 0.05 * nonHoverCurrentPosition);
			$(this).stop().animate({'left' : nonHoverStartingPosition},200);
		}
	});
}


	var menuButton = document.getElementById("menuButton")
	var menu = document.getElementById("menu")
	menuButton.addEventListener("click", function(event) {
		if (menu.style.display === "block") {
			menu.style.display = "none"
		} else {
			menu.style.display = "block"
		}
	})
