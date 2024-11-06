$(document).ready(function () {
    var isTablet = navigator.userAgent.match(/iPhone|iPad|Android|Windows Phone/);
    if (!isTablet) {
        $('html').addClass('no-touch');
    }
    else {
        $('html').addClass('touch');
    }
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    $(window).resize(function () {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });
    var wow = new WOW({
        offset: 20,
        resetAnimation: false
    });
    wow.init();
    var hero = new Swiper('.hero .swiper-container', {
        loop: true,
        pagination: {
            el: '.hero__pagination',
            type: 'bullets',
            bulletActiveClass: 'active',
            clickable: true
        },
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: false
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }
    });
    var gallery = new Swiper('.gallery .swiper-container', {
        loop: true,
        spaceBetween: 25,
        slidesPerView: 3,
        centeredSlides: true,
        pagination: {
            el: '.gallery__pagination',
            type: 'bullets',
            bulletActiveClass: 'active',
            clickable: true
        },
        breakpoints: {
            400: {
                slidesPerView: 1
            },
            600: {
                slidesPerView: 2
            }
        },
        on: {
            init: function () {
                $('.gallery__desc').text($('.gallery .swiper-slide-active').attr('data-desc'));
            }
        }
    });
    gallery.on('slideChangeTransitionStart', function () {
        $('.gallery__desc').text($('.gallery .swiper-slide:eq(' + gallery.activeIndex + ')').attr('data-desc'));
    });
    var video = new Swiper('.video .swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        pagination: {
            el: '.video__pagination',
            type: 'bullets',
            bulletActiveClass: 'active',
            clickable: true
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            depth: 300,
            stretch: 438
        },
        breakpoints: {
            1299: {
                depth: 500,
                stretch: 80
            },
            767: {
                spaceBetween: 20,
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 0,
                    stretch: 0
                }
            }
        },
        on: {
            init: function () {
                $('.video__desc').text($('.video .swiper-slide-active').attr('data-desc'));
            }
        }
    });
    video.on('slideChangeTransitionStart', function () {
        $('.video__desc').text($('.video .swiper-slide:eq(' + video.activeIndex + ')').attr('data-desc'));
    });
    var photos = new Swiper('.photos .swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        pagination: {
            el: '.photos__pagination',
            type: 'bullets',
            bulletActiveClass: 'active',
            clickable: true
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            depth: 300,
            stretch: 100
        },
        breakpoints: {
            1299: {
                depth: 500,
                stretch: 80
            },
            767: {
                spaceBetween: 20,
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 0,
                    stretch: 0
                }
            }
        },
        on: {
            init: function () {
                $('.video__desc').text($('.video .swiper-slide-active').attr('data-desc'));
            }
        }
    });
    var reviews = new Swiper('.reviews-slider .swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        autoHeight: true,
        simulateTouch: false,
        allowTouchMove: false,
        navigation: {
            prevEl: '.reviews-slider__prev',
            nextEl: '.reviews-slider__next'
        }
    });
    var reviewsPeople = new Swiper('.reviews-people .swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        autoHeight: true,
        simulateTouch: false,
        allowTouchMove: false,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            depth: 500,
            stretch: 204
        },
        breakpoints: {
            1399: {
                spaceBetween: 0,
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 0,
                    stretch: 0
                }
            }
        }
    });
    reviews.on('slideChangeTransitionStart', function () {
        reviewsPeople.slideTo(reviews.activeIndex);
    });
    $('.content-slider .swiper-container').each(function () {
        var slider = new Swiper($(this), {
            loop: true,
            speed: 400,
            autoHeight: true,
            navigation: {
                prevEl: $(this).siblings('.content-slider__prev'),
                nextEl: $(this).siblings('.content-slider__next')
            }
        });
    });
    $('.js-y-scroll').mCustomScrollbar({
        axis: "y",
        advanced: {updateOnContentResize: true},
        mouseWheel: {preventDefault: true},
        scrollInertia: 400
    });
    $('.js-open-popup').magnificPopup({
        type: 'inline',
        midClick: true,
        fixedBgPos: true,
        fixedContentPos: true,
        removalDelay: 400,
        callbacks: {
            open: function () {
                popupShow();
            },
            close: function () {
                popupClose();
            }
        }
    });
    $('.js-open-image').magnificPopup({
        type: 'image',
        midClick: true,
        fixedBgPos: true,
        fixedContentPos: true,
        callbacks: {
            open: function () {
                popupShow();
            },
            close: function () {
                popupClose();
            }
        }
    });
    $('.js-open-gallery').magnificPopup({
        type: 'image',
        midClick: true,
        fixedBgPos: true,
        fixedContentPos: true,
        gallery: {
            enabled: true
        },
        callbacks: {
            open: function () {
                popupShow();
            },
            close: function () {
                popupClose();
            }
        }
    });
    $('.js-open-group').magnificPopup({
        delegate: 'a',
        type: 'image',
        midClick: true,
        fixedBgPos: true,
        fixedContentPos: true,
        removalDelay: 400,
        gallery: {
            enabled: true
        },
        callbacks: {
            open: function () {
                popupShow();
            },
            close: function () {
                popupClose();
            }
        }
    });
    $('.js-open-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        fixedBgPos: true,
        fixedContentPos: false
    });
    svg4everybody();
    $('.aside').Stickyfill();
    $('.js-next-toggle').click(function (e) {
        $(this).toggleClass('active').next().slideToggle();
        e.preventDefault();
    });
    $('.js-close-modal').click(function () {
        $.magnificPopup.close();
    });
    /*up button*/
    $('.js-start-page').click(function () {
        $("html, body").animate({scrollTop: 0}, 700);
    });
    $(window).scroll(function () {
        var curScroll = $(this).scrollTop();
        if (curScroll > 0) {
            $('.header').addClass('active');
        }
        else {
            $('.header').removeClass('active');
        }
        if (curScroll > window.innerHeight) {
            $('.js-start-page').addClass('active');
        }
        else {
            $('.js-start-page').removeClass('active');
        }
    });
    /*content*/
    $('.content iframe').each(function () {
        $(this).wrap('<div class="content-iframe"><div></div></div>')
    });
    $('.content table').each(function () {
        $(this).wrap('<div class="content-table js-x-scroll"></div>').parent().mCustomScrollbar({
            axis: "x",
            advanced: {updateOnContentResize: true},
            mouseWheel: {preventDefault: true}
        });
    });
    /*header*/
    $('.js-header-menu').click(function () {
        $(this).toggleClass('active');
        $('.header-menu').toggleClass('active');
    });
    $('.js-menu-next').click(function () {
        $(this).next().addClass('active');
        $('.header-menu-nav').removeAttr('style').css('height', $(this).next().height());
    });
    $('.js-menu-prev').click(function () {
        $(this).parent().removeClass('active');
        $('.header-menu-nav').removeAttr('style').css('height', $(this).parent().parent().parent().height());
    });
    $('.js-header-menu-search').click(function () {
        $('.header-menu-search').toggleClass('active');
    });
    $('.js-header-search').click(function () {
        $('.header-search').slideToggle();
        $(".header-search__field").focus();
    });
    $(document).mouseup(function (e) {
        if (e.target.closest('.header-search') == null && $('.header-search').is(':visible')) {
            $('.header-search').slideUp();
        }
    });
    var navWrap = $('.header-menu-wrap'),
        scrollTop = 0;

    function hideScroll() {
        $('body').css('top', -$(window).scrollTop());
    }

    function showScroll() {
        $(window).scrollTop(scrollTop);
        $('body').removeAttr('style');
    }

    $('.js-navigation').click(function (e) {
        if (navWrap.hasClass('active')) {
            navWrap.removeClass('animate');
            setTimeout(function () {
                navWrap.removeClass('active');
                $('html').removeClass('blocked');
                showScroll();
            }, 500)
        }
        else {
            scrollTop = $(window).scrollTop();
            hideScroll();
            navWrap.css('height', window.innerHeight);
            $('html').addClass('blocked');
            navWrap.addClass('active animate');
        }
        e.stopPropagation();
    });
    if (window.innerWidth >= 768) {
        $('.header-menu').click(function (e) {
            e.stopPropagation();
        });
        navWrap.click(function () {
            navWrap.removeClass('animate');
            setTimeout(function () {
                navWrap.removeClass('active');
                $('html').removeClass('blocked');
                showScroll();
            }, 500)
        });
    }
    /*counter*/
    $('.js-count').each(function () {
        var $this = $(this);
        $this.data('target', parseInt($this.html()));
        $this.data('counted', false);
        $this.html('0');
    });
    $(window).on('scroll', function () {
        var speed = 2000;
        $('.js-count').each(function () {
            var $this = $(this);
            if (!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
                $this.data('counted', true);
                $this.animate({
                    dummy: 1
                }, {
                    duration: speed,
                    step: function (now) {
                        var $this = $(this);
                        var val = Math.round($this.data('target') * now);
                        $this.html(val);
                    }
                });
            }
        });
    }).triggerHandler('scroll');
    /*news*/
    $('.js-filter-open').click(function () {
        if ($('.js-filter-open').not($(this)).hasClass('active')) {
            $('.js-filter-open.active').toggleClass('active').next().hide();
        }
        $(this).toggleClass('active').next().slideToggle(0);
    });
    $('.js-filter').click(function () {
        $(this).addClass('active').parents('.filter__body').hide().prev().text($(this).text());
        $(this).siblings('.active').removeClass('active');
    });
    $(document).mouseup(function (e) {
        if (e.target.closest('.filter') == null && $('.filter__head').hasClass('active')) {
            $('.filter__head.active').removeClass('active').next().slideToggle(0);
        }
    });
    /*vision*/
    $.bvi({
        'bvi_target': '.js-bvi-open', // Класс ссылки включения плагина
        "bvi_theme": "white", // Цвет сайта
        "bvi_font": "arial", // Шрифт
        "bvi_font_size": 16, // Размер шрифта
        "bvi_letter_spacing": "normal", // Межбуквенный интервал
        "bvi_line_height": "normal", // Междустрочный интервал
        "bvi_images": true, // Изображения
        "bvi_reload": true, // Перезагрузка страницы при выключении плагина
        "bvi_fixed": false, // Фиксирование панели для слабовидящих вверху страницы
        "bvi_tts": true, // Синтез речи
        "bvi_flash_iframe": true, // Встроенные элементы (видео, карты и тд.)
        "bvi_hide": false // Скрывает панель для слабовидящих и показывает иконку панели.
    });
});
function popupShow() {
    $('body').addClass('popup');
}
function popupClose() {
    $('body').removeClass('popup');
}