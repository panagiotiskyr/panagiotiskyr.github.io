(() => {
    const updateMenuActiveLink = () => {
        $('#main-menu ul li').removeClass('active');
        if ($(document).scrollTop() + (isBiggerScreen ? 70 : 0) >= $('#certifications').offset().top) {
            $('#main-menu-certifications').addClass('active');
        } else if ($(document).scrollTop() + (isBiggerScreen ? 70 : 0) >= $('#experience').offset().top) {
            $('#main-menu-experience').addClass('active');
        } else if ($(document).scrollTop() + (isBiggerScreen ? 70 : 0) >= $('#education').offset().top) {
            $('#main-menu-education').addClass('active');
        } else {
            $('#main-menu-home').addClass('active');
        }
    }
    let documentScrollTopBeforeMenuOpen = 0;
    let isBiggerScreen;
    
    $(window).on('load', () => {
        $('#overlay').removeClass('visible');
        updateMenuActiveLink();
        $(document).scroll(() => {
            updateMenuActiveLink();
        });
        isBiggerScreen = $('#menu-toggle').css('display') === 'none';
        $(window).resize(() => {
            isBiggerScreen = $('#menu-toggle').css('display') === 'none';
        });
    });
    
    $('#menu-toggle').click(() => {
        if (!$('body').hasClass('main-menu-open')) documentScrollTopBeforeMenuOpen = $(document).scrollTop();
        else $(document).scrollTop(documentScrollTopBeforeMenuOpen);
        $('body').toggleClass('main-menu-open');
    });
    
    $('a#menu-toggle').click((event) => {
        event.preventDefault();
    });
    
    $('#main-menu ul li a').click((event) => {
        event.preventDefault();
        const linkTarget = $(event.target).parent().attr('id');
        let scrollTopValue;
        switch (linkTarget) {
            case 'main-menu-home':
                scrollTopValue = 0;
                break;
            
            case 'main-menu-education':
                scrollTopValue = $('#education').offset().top + (isBiggerScreen ? (-69) : 1);
                break;
            
            case 'main-menu-experience':
                scrollTopValue = $('#experience').offset().top + (isBiggerScreen ? (-69) : 1);
                break;
            
            case 'main-menu-certifications':
                scrollTopValue = $('#certifications').offset().top + (isBiggerScreen ? (-69) : 1);
                break;
            
            default:
                scrollTopValue = 0;
                break;
        }
        
        $('body').removeClass('main-menu-open');
        setTimeout(() => {
            $("html, body").stop().animate({ scrollTop: scrollTopValue }, 500, 'swing');
        }, 100);
    });
    
    $('body').mousedown(() => {
        $('body').addClass('using-mouse');
    });
    $('body').keydown(() => {
        $('body').removeClass('using-mouse');
    });
    
    $('body').on('swipeleft', () => {
        if (!$('body').hasClass('main-menu-open')) $('body').addClass('main-menu-open');
    });
    $('body').on('swiperight', () => {
        if ($('body').hasClass('main-menu-open')) $('body').removeClass('main-menu-open');
    });
    
})();
