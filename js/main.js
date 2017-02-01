(function init() {
	"use strict";

	// Used for running functions when CSS transitions/animations end.
	var transEnd 	= 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		animEnd 	= 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';


	// Hide the page "loading" overlay.
	function hidePageLoadingOverlay() {
		$('.loading-page-overlay').addClass('hiding').one( transEnd, function() {
			$(this).removeClass('hiding').addClass('hidden');
			$('body').removeClass('overflow__hidden');
		});
	}

	// Set the appropriate classes to the website images so that they cover their whole container.
	function bgImgsSizing( imgElemArr, compareTo ) {
		var picParent,
			picImg,
			picParentRatio,
			picRatio;
		function changePicSize( pic, compareTo ) {
			if ( compareTo ) {
				picParentRatio = compareTo[0] / compareTo[1];
			} else {
				picParent = $(pic).parents('.picture-container') > 0 ? $(pic).parents('.picture-container') : $(pic).parent();
				picParentRatio = $(picParent)[0].clientWidth / $(picParent)[0].clientHeight;
			}
			picImg 	   	   = $(pic).children('img');
			picRatio	   = $(picImg)[0].clientWidth / $(picImg)[0].clientHeight;
			if ( picParentRatio < picRatio ) {
				$(pic).removeClass('wide');
				$(pic).addClass('tall');
			} else {
				$(pic).removeClass('tall');
				$(pic).addClass('wide');
			}
		}
		if ( !imgElemArr ) {
			$('.background__image').each(function( i, pic ) {
				changePicSize( pic );
			});
		} else {
			imgElemArr.map(function( pic ) {
				changePicSize( pic, compareTo );
			});
		}
	}

	// Scroll to the selected content when the user clicks on a navigation link.
	function navScrollToContent() {
		$('body').on( 'click touchend', '.main-nav a, .secondary-nav a', function(event) {
			event.preventDefault();
			var targetContentClass = $(this).attr('data-nav-link'),
				targetContent = $('body').find('section.' + targetContentClass ),
				targetContentDistFromTop = $(targetContent).offset().top;
			$('body').animate({
				scrollTop: targetContentDistFromTop - 20
			}, 600)

			// If the user clicked on a Main Nav link then close the navigation.
			if ( $('.main-nav__wrapper').hasClass('open') ) $('.main-nav__wrapper').removeClass('open');
		});
	}

	// How the "Main Navigation" will respond to user actions ( hover, click, tap ).
	function mainNavUserActions() {

		// Functions to open/close the navigation menu.
		// They are used several times so they are kept in separate functions.
		function navOpen( navElement ) {
			$(navElement).parents('.main-nav__wrapper').addClass('open');
		}
		function navClose( navElement ) {
			$(navElement).parents('.main-nav__wrapper').removeClass('open');
		}

		$('body').on('click touchstart', '.main-nav__wrapper:not(.open) .nav-icon', function( event ) {
			event.preventDefault();
			event.stopPropagation();
			navOpen( event.target );
		});
		$('body').on('click touchstart', '.main-nav__wrapper.open .nav-icon', function( event ) {
			event.preventDefault();
			event.stopPropagation();
			navClose( event.target );
		});
		$('body').on('mouseenter', '.main-nav__wrapper:not(.open) .nav-icon', function( event ) {
			navOpen( event.target );
		});
		$('body').on('mouseleave', '.main-nav__wrapper.open', function( event ) {
			navClose( event.target );
		});

	};

	// If the user scrolls past a certain point add/remove some classes to the navigation.
	// For styling purposes only.
	function mainNavScrollStyle() {
		var homeSectionHeight = $('.section.home').outerHeight();
		if ( $(window).scrollTop() > homeSectionHeight * .8 ) {
			$('.main-nav__wrapper .nav-icon').addClass('scrolled');
		} else {
			$('.main-nav__wrapper .nav-icon').removeClass('scrolled');
		}
	}

	// Fade in the "home" section bottom navigation links.
	// TODO: change the animations to full CSS transitions.
	function homeBottomNav() {
		setTimeout( function() {
			$('.site-description').animate({
				'opacity': '1'
			}, 1000)
		}, 500)
		$('.secondary-nav li > a').each( function( index, el ) {
			setTimeout( function() {
				$(el).animate({
					'opacity': '1'
				}, 1000)
			}
			, index * 100 + 1200)
		});
	};

	// Handle the animation for the profile picture on the "about" section, when it is visible by the user as he scrolls.
	function profilePic() {
		if ( $(window).scrollTop() + $(window).height() >= $('.about').offset().top + 220 ) {
			$('.about .section__description').addClass('image-visible').one( transEnd, function() {
				$(this).addClass('overflow__auto');
			});
		}
	}

	// The "about" section navigation functionality.
	function aboutNavFunctionality() {
		$('body').on('click', '.about-nav a', function( event ) {
			event.preventDefault();
			var targetContentClass = $(this).attr('data-link'),
				targetContent = $(this).parents('.about').find('.about-content .' + targetContentClass ),
				targetContentDistFromTop = $(targetContent).offset().top;
			$('.about-nav a').removeClass('active');
			$(this).addClass('active');
			if ( $('.about .about-content').css( 'float' ) === 'right' ) {
				$('body').animate({
					scrollTop: targetContentDistFromTop - 40
				}, 600)
			} else {
				$('body').animate({
					scrollTop: targetContent.offset().top - 40 - $('.about .about-nav').outerHeight()
				}, 600)
			}
		});
	}

	// Style the "about" section elements ( Description and Navigation ) according to the user's window size.
	function aboutElementsHeight() {
		// Check for the page's layout.
		// If the screen is small then it is going to need different functionality that a big screen.
		if ( $('.about .about-content').css( 'float' ) === 'right' ) {
			// The section title with the profile pic have to be at most the same height as the window.
			$('.about .section__description').css( 'max-height', $(window).height() - 40 );
			// The navigation has to be at least the same height as the content/details.
			$('.about .about-nav').css( 'min-height', $('.about .section__description').outerHeight() );
		}
	}

	// The "about" section elements ( title/profile-pic and navigation ) behavior when the user scrolls
	function aboutElementsScrollBehavior() {
		(function picAndDesc() {

			// Check for the page's layout.
			// If the screen is small the the section title with the profile pic do not need any check.
			if ( $('.about .about-content').css( 'float' ) === 'right' ) {
				var aboutTopOnWindowTop = $(window).scrollTop() + 20 >= $('.about').offset().top,
					aboutBonOnWindowBot = $(window).scrollTop() + $(window).height() >= 20 + $('.about').offset().top + $('.about').innerHeight();
				if ( aboutTopOnWindowTop && !aboutBonOnWindowBot ) {
					$('.about .section__description').css({
						'position': 'fixed',
						'width'	  : ( $(window).width() - 40 ) * 0.33333,
						'top'	  : '20px',
						'left'	  : '20px',
						'bottom'  : ''
					});
				} else if ( aboutBonOnWindowBot ) {
					$('.about .section__description').css({
						'position': 'absolute',
						'width'	  : '',
						'top'	  : '',
						'left'	  : '',
						'bottom'  : '0'
					});
				} else {
					$('.about .section__description').css({
						'position': '',
						'width'	  : '',
						'top'	  : '',
						'left'	  : '',
						'bottom'  : ''
					});
				}
			}
		})();
		(function nav() {

			// Check for the page's layout.
			// If the screen is small then it is going to need different functionality.
			if ( $('.about .about-content').css( 'float' ) === 'right' ) {
				var navTopOnAboutTop = $(window).scrollTop() + 20 >= $('.about').offset().top,
					navBonOnAboutBot = $(window).scrollTop() + $('.about .about-nav > ul').outerHeight() + 20 >= $('.about').offset().top + $('.about').outerHeight();
				if ( navTopOnAboutTop && !navBonOnAboutBot ) {
					$('.about .about-nav > ul').css({
						'position': 'fixed',
						'top'	  : '20px',
						'bottom'  : ''
					});
				} else if ( navBonOnAboutBot ) {
					$('.about .about-nav > ul').css({
						'position': 'absolute',
						'top'	  : '',
						'bottom'  : '0'
					});
				} else {
					$('.about .about-nav > ul').css({
						'position': '',
						'top'	  : '',
						'bottom'  : ''
					});
				}
			} else {
				var navTopOnAboutTop = $(window).scrollTop() + 20 >= $('.about .about-content').offset().top,
					navBonOnAboutBot = $(window).scrollTop() + $('.about .about-nav').outerHeight() + 20 >= $('.about .about-content').offset().top + $('.about .about-content').outerHeight();
				if ( navTopOnAboutTop && !navBonOnAboutBot ) {
					$('body').addClass('nav__lower');
					$('.about .about-nav').css({
						'position': 'fixed',
						'width'	  : $(window).width() - 40,
						'top'	  : '20px',
						'left'	  : '20px',
						'bottom'  : ''
					});
				} else if ( navBonOnAboutBot ) {
					$('body').removeClass('nav__lower');
					$('.about .about-nav').css({
						'position': 'absolute',
						'top'	  : 'auto',
						'left'	  : '0',
						'bottom'  : '0'
					});
				} else {
					$('body').removeClass('nav__lower');
					$('.about .about-nav').css({
						'position': '',
						'top'	  : '',
						'left'	  : '',
						'bottom'  : ''
					});
				}
			}
		})();
	}

	// Animate the project's details window when the user clicks to open/close its details.
	function projectClick() {

		// The user clicks to open the project's details.
		$('body').on('click', '.grid__list-item > div:not(.project-showing)', function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var itemClicked = $(this),
				windowWidth  = $(window).width(),
				windowHeight = $(window).height(),
				itemToWidth,
				itemToHeight,
				itemToTop,
				itemToLeft;
			if ( $('.grid__custom .item-title').css( 'border-left' )[0] === '0' ) {
				itemToWidth  = windowWidth - 80;
				itemToHeight = windowHeight - 80;
				itemToTop    = $(window).scrollTop() - itemClicked.offset().top + 40;
				itemToLeft   = -1 * itemClicked.offset().left + 40;
			} else {
				itemToWidth  = windowWidth - 60;
				itemToHeight = windowHeight - 60;
				itemToTop    = $(window).scrollTop() - itemClicked.offset().top + 30;
				itemToLeft   = -1 * itemClicked.offset().left + 30;
			}
			$('body').addClass('overflow__hidden');
			$('body').addClass('nav__hidden');
			itemClicked.addClass('loading initial-state');
			itemClicked.animate({
				'width' : itemToWidth,
				'height': itemToHeight,
				'top'	: itemToTop,
				'left'	: itemToLeft
			}, 400, function() {
				itemClicked.addClass('is-full-width');
				itemClicked.css({
					'width' : '',
					'height': '',
					'top'	: '',
					'left'	: ''
				});
				if ( $('.about .about-content').css( 'float' ) === 'right' ) {
					bgImgsSizing( 
						[ $(this).children('.item-image') ],
						[ itemToWidth * 0.33, windowHeight - 80 ] );
				} else {
					bgImgsSizing( 
						[ $(this).children('.item-image') ],
						[ itemToWidth, Number( $(this).children('.item-image').css( 'height' ) ) ] );
				}
				itemClicked.addClass('project-showing').one( transEnd, function() {
					itemClicked.find('.grid__list-item-loading-transition').animate({
						'opacity': 0
					}, 400, function() {
						itemClicked.removeClass('initial-state loading');
						$(this).css('opacity', '');
					});
				});
			});
		});

		// The user clicks to close the project's details.
		$('body').on('click', '.grid__list-item > div.project-showing .item-close', function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var itemClicked = $(this).parents('.project-showing'),
				itemParent  = itemClicked.parent('.grid__list-item'),
				itemParentWidth  = itemParent.innerWidth() - 10,
				itemParentHeight = itemParent.innerHeight(),
				windowWidth  = $(window).width(),
				windowHeight = $(window).height(),
				itemToWidth,
				itemToHeight,
				itemToTop,
				itemToLeft;
			if ( $('.grid__custom .item-title').css( 'border-left' )[0] === '0' ) {
				itemToWidth  = windowWidth - 80;
				itemToHeight = windowHeight - 80;
				itemToTop    = $(window).scrollTop() - itemParent.offset().top + 40;
				itemToLeft   = -1 * itemParent.offset().left + 40;
			} else {
				itemToWidth  = windowWidth - 60;
				itemToHeight = windowHeight - 60;
				itemToTop    = $(window).scrollTop() - itemParent.offset().top + 30;
				itemToLeft   = -1 * itemParent.offset().left + 30;
			}
			itemClicked.addClass('loading initial-state').one( 'transitionend', function() {
				itemClicked.css({
					'position': 'absolute',
					'width'   : itemToWidth,
					'height'  : itemToHeight,
					'top'	  : itemToTop,
					'left'	  : itemToLeft
				});
				itemClicked.removeClass('is-full-width');
				itemClicked.animate({
					'width' : itemParentWidth,
					'height': itemParentHeight,
					'top'	: 0,
					'left'	: 0
				}, 400, function() {
					$('body').removeClass('overflow__hidden');
					setTimeout( function() {
						$('body').removeClass('nav__hidden');
					}, 500 );
					bgImgsSizing( [ $(this).children('.item-image') ] );
					itemClicked.removeClass('project-showing').one( transEnd, function() {
						itemClicked.css({
							'position': '',
							'width'   : '',
							'height'  : '',
							'top'	  : '',
							'left'	  : ''
						});
						itemClicked.find('.grid__list-item-loading-transition').animate({
							'opacity': 0
						}, 400, function() {
							itemClicked.removeClass('initial-state loading');
							$(this).css('opacity', '');
						});
					});
				});
			});
		});
	}

	// The "Contact Form" functionality when it is submitted.
	// Check for the user's input in the test field and then send the email.
	function contactForm() {

		// Generate a random number [0, 100) and then check if the user's input is the same.
		var randNum1 	= Math.floor(Math.random() * 100),
			randNum2 	= Math.floor(Math.random() * 100),
			randNumsSum = randNum1 + randNum2;

		$('#contact-form .test-input label').html( randNum1 + ' + ' + randNum2 + '* :' )
		$('#contact-form').submit(function( event ) {
			event.preventDefault();
			if ( Number( $('#contact-form #test').val() ) === randNumsSum ) {
				$(this).animate({
					'opacity': 0,
					'height' : 0
				}, 400, function() {
					$(this).css('display', 'none');
					$('.form-submit-message').html('<i class="zmdi zmdi-rotate-right zmdi-hc-spin"></i>Submitting...');
					$('section.contact').addClass('submitted');
				});
				$.ajax({
					url: "https://formspree.io/pankyr@gmx.com", 
					method: "POST",
					data: {
						Name: $('#contact-form #name').val(),
						Email: $('#contact-form #email').val(),
						Website: $('#contact-form #website').val(),
						Budget: $('#contact-form #budget').val(),
						Deadline: $('#contact-form #deadline').val(),
						Message: $('#contact-form #message').val(),
						_subject: 'Personal Website Contact!'
					},
					dataType: "json"
				})
				.done( function( response ){
					$('.form-submit-message').animate({
						'opacity': 0
					}, 400, function() {
						$(this).html('Your message was successfully sent!<br/>Please allow me a couple of days to get back to you.');
						$(this).animate({
							'opacity': 1
						}, 400)
					})
				})
				.fail( function( error ) {
					$('.form-submit-message').animate({
						'opacity': 0
					}, 400, function() {
						$(this).html('There was an error in sending your message!<br/>Please excuse me for the inconvenience.<br/> You could refresh the page and try again.');
						$(this).animate({
							'opacity': 1
						}, 400)
					})
				});
			} else {
				$('#contact-form .test-input').addClass('error');
			}
		});
	}

	// Get the current year and add it to the "Copyright" on the page footer.
	function footerCopyrightDate() {
		var currentDate = new Date(),
			currentYear = currentDate.getFullYear();
		$('footer span').html( (currentYear - 1) + '-' + currentYear.toString().slice( -2 ) );
	}




	// Functions to be run when the document and its dependencies are loaded. 
	$( window ).on( 'load', function() {

		// General
		hidePageLoadingOverlay();
		bgImgsSizing();

		// Main Navigation
		mainNavUserActions();
		mainNavScrollStyle();
		navScrollToContent();

		// Home
		homeBottomNav();

		// About
		profilePic();
		aboutNavFunctionality();
		aboutElementsHeight();
		aboutElementsScrollBehavior();

		// Projects
		projectClick();

		// Contact
		contactForm();

		// Footer
		footerCopyrightDate();

	});

	// Functions to be run when the window is resized ( the user changes the window manually, or the orientation changes ). 
	$( window ).resize( function() {

		// General
		bgImgsSizing();

		// About
		profilePic();
		aboutElementsHeight();
		aboutElementsScrollBehavior();

	});

	// Functions to be run when the user scrolls ( animations and style changes ).
	$( window ).scroll( function() {

		// Main Navigation
		mainNavUserActions();
		mainNavScrollStyle();

		// About
		profilePic();
		aboutElementsScrollBehavior();

	});

})();