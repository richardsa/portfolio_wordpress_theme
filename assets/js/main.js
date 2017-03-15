$(function() {
	
	// Cache the window object
	var $window = $(window);
	
	// Parallax background effect
	// Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
	
	$('section[data-type="background"]').each(function() {
		
		var $bgobj = $(this); // assigning the object
		
		$(window).scroll(function() {
			
			// scroll the background at var speed
			// the yPos is a negative value because we're scrolling it UP!
			
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
			
			// Put together our final background position
			var coords = '50% '+ yPos + 'px';
			
			// Move the background
			$bgobj.css({ backgroundPosition: coords });
			
		}); // end window scroll
		
	});
	
});

// prevent sticky nav from overlapping content
// when using internal links
var shiftWindow = function() { scrollBy(0, -50) };
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);
