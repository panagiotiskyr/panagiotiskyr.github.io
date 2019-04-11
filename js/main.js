
function setupMenu() {
	function toggleActive(scroll) {
		$('#menu > ul > li > a').removeClass('active');
		if (scroll > $('#certifications').offset().top) {
			$('#menu > ul > li > a[href="#certifications"]').addClass('active');
		} else if (scroll > $('#projects').offset().top) {
			$('#menu > ul > li > a[href="#projects"]').addClass('active');
		} else if (scroll > $('#experience').offset().top) {
			$('#menu > ul > li > a[href="#experience"]').addClass('active');
		} else if (scroll > $('#education').offset().top) {
			$('#menu > ul > li > a[href="#education"]').addClass('active');
		} else {
			$('#menu > ul > li > a[href="#about"]').addClass('active');
		}
	}
	var scrollCheckOn = function() {
		$(window).on('scroll', function(event) {
			var scroll = $(window).scrollTop();
			toggleActive(scroll);	
		});
	}
	var scrollCheckOff = function() {
		$(window).off('scroll');
	}
	toggleActive($(window).scrollTop());
	scrollCheckOn();
	$('#menu-toggle').click(function(event) {
		$('body').toggleClass('menu-open');
	});
	$('#menu a').click(function(event) {
		event.preventDefault();
		var scrollToSection = $(this).attr('href');
		scrollCheckOff();
		$('#menu > ul > li > a').removeClass('active');
		$('body').toggleClass('menu-open');
		$(event.target).addClass('active');
	    $([document.documentElement, document.body]).animate({
	        scrollTop: $(scrollToSection).offset().top + 1
	    }, 300, function() {
	    	scrollCheckOn();
	    });
	});
}

$( document ).ready(function() {
	setupMenu();
	$('a.disabled').click(function(event) {
		event.preventDefault();
	});
});