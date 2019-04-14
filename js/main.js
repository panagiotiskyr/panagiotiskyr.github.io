function removeLoading() {
	$('#content > section > .inside').each(function(indexSection, section) {
		var sectionHeight = $(section).innerHeight();
		$('#loading ul li').each(function(indexLoadingItem, el) {
			if (indexSection == indexLoadingItem) {
				$(el).css('height', sectionHeight + 'px');
			}
		});
	});
    $('#loading').scrollTop($(window).scrollTop());
	$('body').removeClass('loading')
}
function setupMenu(windowResized = false) {
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
	toggleActive($(window).scrollTop());
	if (!windowResized) {
		var lastTop = 0;
		isMobile() ? null : $('body').removeClass('menu-open');
		console.log('setupMenu')
		scrollCheckOn();
		$('#menu-toggle').click(function(event) {
			console.log('menu-toggle')
			console.log(event.target)
			event.stopPropagation();
			isMobile() ? $('body').toggleClass('menu-open') : null;
		});
		$('#menu a').click(function(event) {
			event.preventDefault();
			var scrollToSection = $(this).attr('href');
			scrollCheckOff();
			$('#menu > ul > li > a').removeClass('active');
			isMobile() ? $('body').toggleClass('menu-open') : null;
			console.log('menu a')
			$(event.target).addClass('active');
		    $([document.documentElement, document.body]).animate({
		        scrollTop: $(scrollToSection).offset().top + 1 - parseInt($(scrollToSection).css('padding-bottom'))
		    }, 500, function() {
		    	scrollCheckOn();
		    });
		});
		$('#overlay').click(function(event) {
			event.stopPropagation();
			$('body').toggleClass('menu-open');
		});
	}
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
function isMobile() {
	console.log($('#menu-toggle').css('display') != 'none')
	return $('#menu-toggle').css('display') != 'none';
}

$(document).ready(function() {
	console.log('ready');
	setupMenu();
	setupImages();
	$('a.disabled').click(function(event) {
		event.preventDefault();
	});
	$(window).resize(function(event) {
		setupMenu(true);
		setupImages();
	});
});
$(window).on('load', function(event) {
	console.log('load');
	removeLoading();
});
