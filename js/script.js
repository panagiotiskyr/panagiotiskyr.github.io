(() => {
    const updateMenuActiveLink = () => {
        $('#main-menu ul li').removeClass('active');
        if ($(document).scrollTop() >= $('#certifications').offset().top) {
            $('#main-menu-certifications').addClass('active');
        } else if ($(document).scrollTop() >= $('#experience').offset().top) {
            $('#main-menu-experience').addClass('active');
        } else if ($(document).scrollTop() >= $('#education').offset().top) {
            $('#main-menu-education').addClass('active');
        } else {
            $('#main-menu-home').addClass('active');
        }
    }
    
    $(window).on('load', () => {
        $('#overlay').removeClass('visible');
        updateMenuActiveLink();
        $(document).scroll(() => {
            updateMenuActiveLink();
        });
    });
    
    $('#menu-toggle').click(() => {
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
                scrollTopValue = $('#education').offset().top + 1;
                break;

            case 'main-menu-experience':
                scrollTopValue = $('#experience').offset().top + 1;
                break;
        
            case 'main-menu-certifications':
                scrollTopValue = $('#certifications').offset().top + 1;
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
    
})();
