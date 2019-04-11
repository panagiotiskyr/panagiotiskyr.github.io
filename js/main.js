
function removeLoading() {
	console.log('removeLoading');
	$('#content > section').each(function(indexSection, section) {
		var sectionHeight = $(section).innerHeight();
		$('#loading ul li').each(function(indexLoadingItem, el) {
			if (indexSection == indexLoadingItem) {
				console.log($(el).find('.content'))
				$(el).find('.content').css('height', sectionHeight);
			}
		});
	});
	$('body').removeClass('loading')
}
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
		$(document).on('scroll', function(event) {
			var scroll = $(window).scrollTop() + parseInt($('section').css('padding-bottom')),
				newTop = $(window).scrollTop();
			if (lastTop != newTop) {
				lastTop = newTop;
				toggleActive(scroll);	
			}
		});
	}
	var scrollCheckOff = function() {
		$(document).off('scroll');
	}
	var lastTop = 0;
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
	        scrollTop: $(scrollToSection).offset().top + 1 - parseInt($(scrollToSection).css('padding-bottom'))
	    }, 500, function() {
	    	scrollCheckOn();
	    });
	});
	$('#overlay').click(function(event) {
		$('body').toggleClass('menu-open');
	});
}
function setupImages() {
	$('picture').each(function(index, el) {
		var pic = $(el),
			img = $(el).find('img'),
			sectionElement = pic.parent(),
			sectionRatio   = sectionElement.innerWidth() / sectionElement.innerHeight(),
			imageRatio  = img.innerWidth() / img.innerHeight();
		if (sectionRatio >= imageRatio) {
			pic.removeClass('wide');
			pic.addClass('long');
		} else {
			pic.removeClass('long');
			pic.addClass('wide');
		}
		img.on('load', function(event) {
			setupImages();
		});
	});
}
$(document).ready(function() {
	console.log('ready');
	setupMenu();
	setupImages();
	$('a.disabled').click(function(event) {
		event.preventDefault();
	});
	$(window).resize(function(event) {
		setupMenu();
		setupImages();
	});
	$(window).on('load', function(event) {
		console.log('load');
		removeLoading();
	});
});