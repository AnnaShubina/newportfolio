$(function () {
    let $bannerRightIng = $('.banner__right');
    let $headerRight = $('.lang-wrap');
    let $bannerDesr = $('.banner__description');
    let $letterA = $('.banner__letterA');
    let $letterC = $('.about__letterC');
    let $aboutImg = $('.about__picture');

    //start animation
    function animateBannerOnLoad() {
        $bannerRightIng.css({ "transform": "translateX(0)" });
        $headerRight.css({ "transform": "translateX(0)" });
        $bannerDesr.css({ "opacity": "1" });
        $letterA.css({ "transform": "scale(1)" });
    }

    if ($(window).width() >= 768) {
        animateBannerOnLoad();

        $(window).on('scroll', function() {
            if (($('.about__inner').offset().top - $(window).scrollTop()) < 600) {
                $aboutImg.css({ "transform": "translateX(0)" });
                $letterC.css({ "transform": "scale(1)" });
            }
        })
    }

    let $navBtnComp = $('.main-nav--comp .main-nav__sandwich');
    let $navBtnMobile = $('.main-nav--mobile .main-nav__sandwich');
    let $navComp = $('.main-nav--comp');
    let $navMobile = $('.main-nav--mobile');
    let $navMobileList = $('.main-nav--mobile .main-nav__list');
    let $navBack = $('.main-nav__background');

    //open menu
    function menuOpen() {
        $('main').addClass('blur');
        $navMobileList.slideDown('slow');
        $navBack.fadeIn('slow');
        $('.lang-wrap').css("opacity", "0");
        $('.logo-wrap').css("transform", "translateX(166%)");
    }

    function menuClose() {
        $('main').removeClass('blur');
        $navMobileList.slideUp('slow');
        $navBack.fadeOut('slow');
        $('.lang-wrap').css("opacity", "1");
        $('.logo-wrap').css("transform", "translateX(0)");
    }

    $navBtnComp.on('click', function () {
        $navComp.toggleClass('nav-open');
    });

    $navBtnMobile.on('click', function () {
        $navMobile.toggleClass('nav-mobile-open');

        if ($navMobile.hasClass('nav-mobile-open')) {
            menuOpen();

        } else {
            menuClose();
        }
    });

    //click menu
    let $linksComp = $('.main-nav--comp .main-nav__list a');
    let $linksMobile = $('.main-nav--mobile .main-nav__list a');
    let $window = $(window);
    $linksComp.on('click', function(e){
        e.preventDefault();
        getTarget($(this), 50, 2);
    });

    $linksMobile.on('click', function(e){
        e.preventDefault();
        getTarget($(this), 140, 5);
        $navMobile.removeClass('nav-mobile-open');
        menuClose();
    });

    function getTarget(link, offset, rate) {
        let ref = link.attr('href');
        let $target = $(ref);

        if($target.length > 0){
            let pos = $target.offset().top;
            let current = $window.scrollTop();
            let diff = Math.abs(pos - offset - current);

            $('html,body').animate({
                scrollTop: pos - offset
            }, diff / rate);
        }
    }


    //filter gallery
    let $galleryItem = $('.portfolio__gallery-item');
    let $gallery = $('.portfolio__gallery');
    $('.portfolio__menu').on('click', '.portfolio__tab', function (e) {
        e.preventDefault();
        $(this).addClass('active');
        $('.portfolio__tab').not($(this)).removeClass('active');
        let $selector = $(this).attr("data-filter");
       
        if ($selector == "all") {
            $gallery.fadeOut('slow', function() {
                $galleryItem.show();
                if (window.screen.width <= 576) {
                    showMore($btnShow, $galleryItem, 4);
                }
                $gallery.fadeIn();
            });
        } else {
            $gallery.fadeOut('slow', function() {
                $($selector).show();
                $galleryItem.not($selector).hide();
                if (window.screen.width <= 576) {
                    showMore($btnShow, $($selector), 4);
                }
                $gallery.fadeIn();
            });
        }
    });



    // calculate block size
    let $portfolioBack = $('.portfolio__gallery-back');
    let $portfolioWrap = $('.portfolio__wrap');

    $portfolioBack.each(function() {
        setLeftValue($(this));
    });

    if ($(window).width() >= 992) {
        $('.portfolio__gallery-back:first').css("left", "-33px");
        $('.portfolio__gallery-back:eq(1)').css("left", "-65px");
    }

    function setLeftValue(element) {
        let $left = (element.parent().width() / 2) - (element.innerWidth() / 2);
        element.css("left", `${$left}px`);
    }

    if ($(window).width() <= 380) {
        $portfolioBack.each(function(){
            $(this).innerWidth($portfolioWrap.width() + 10);
            $(this).innerHeight(($portfolioWrap.width() + 10) * 0.71);
        });

        $portfolioBack.each(function() {
            setLeftValue($(this));
        });
    }

    $('.about__picture-mobile').height($('.about__picture-mobile').width() * 0.8);

    //mobile scroll
    if (window.screen.width <= 768)  {  
        let $win = $(window);
        
        $win.on('scroll', function() {
            $galleryItem .each(function() {
                if($win.scrollTop() + $win.height() >= $(this).offset().top + $(this).height() - 80) {
                    $(this).find('.portfolio__gallery-back').css("opacity", "1");
                } else {
                    $(this).find('.portfolio__gallery-back').css("opacity", "0");
                }
            });
        });    
    }

    //header when scroll
    if ($(window).width() <= 768) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 0) {
                $('.header').css('box-shadow', '0px 4px 10px rgba(0, 0, 0, 0.2)');
            } else {
                $('.header').css('box-shadow', 'none');
            }
        });
    }


    //btn up
    let $btnUp = $('.btnUp');

    $btnUp.on('click', function(){
        let pos = $window.scrollTop();

        $('html,body').animate({
            scrollTop: 0
        }, pos / 3);
    });

    if (window.screen.width >= 744) {
        $(window).on('scroll', onScroll);
    } else {
        $('header .logo').on('click', function(){
            let pos = $window.scrollTop();
    
            $('html,body').animate({
                scrollTop: 0
            }, pos / 3);
        });
    }

    let btnShowed = false;

    function onScroll(){
        let pos = $window.scrollTop();
        let isUnderScreen = pos > 300; // window.innerHeight;

        if(!btnShowed && isUnderScreen){
            $btnUp.stop(true).fadeIn(500);
            btnShowed = true;
        }
        else if(btnShowed && !isUnderScreen){
            $btnUp.stop(true).fadeOut(500);
            btnShowed = false;
        }
    }

    //number of portfolio works
    let $number = $('.portfolio__gallery-number');
    $number.each(function(indx, el) {
        indx++;
        if (indx > 9) {
            $(el).text(`${indx}`);
        } else {
            $(el).text(`0${indx}`);
        }
    });

    //form action
    let $orderSubmit = $('.order .form__submit');
    let $orderChekbox = $('.order .form__check input');
    let $popupSubmit = $('.popup .form__submit');
    let $popupChekbox = $('.popup .form__check input');

    $orderChekbox.on('click', function() {
        checkDisable($(this), $orderSubmit);
    });

    $popupChekbox.on('click', function() {
        checkDisable($(this), $popupSubmit);
    })

    function checkDisable(checkbox, submit) {
        if (checkbox.is(':checked')) {
            submit.removeAttr("disabled");
        } else {
            submit.attr("disabled", "disabled");
        }
    }

    //popup
    class Popup {
        constructor(options) {
            this.modal = $(options.modal);
            this.overlay = $(options.overlay);
            this.btn = $(options.btn);

            this.btn.on('click', () => {
                this.close();
            });
        }

        open() {
            this.overlay.fadeIn('slow');
            this.modal.fadeIn('slow');
        }
        
        close() {
            this.overlay.fadeOut('slow');
            this.modal.fadeOut('slow');
        }
    }
    
    let popup = new Popup ({
        modal: '.popup .popup__content',
        overlay: '.popup .popup__overlay',
        btn: '.btn-close'
    });

    let $btnPopup = $('.banner__left .button');

    $btnPopup.on('click', function() {
       popup.open();
    });

    //button show more
    let $btnShow = $('.portfolio__show-btn');

    if (window.screen.width <= 576) {
        showMore($btnShow, $galleryItem, 4);
    }

    function showMore(btn, list, count) {
        let countInList = list.length;
        if (countInList > count) {
            btn.show();
        } else {
            btn.hide();
        }
        list.hide();
        list.slice(0, count).show();

        btn.click(function(){
            let showing = list.filter(':visible').length;
            list.slice(showing - 1, showing + count).fadeIn();
            let nowShowing = list.filter(':visible').length;

            if (nowShowing >= countInList) {
              btn.hide();
            }
        });
    }

    //form
    $('form').submit(function () {
        let formID = $(this).attr('id'); // Получение ID формы
        let formNm = $('#' + formID).find('.form__reply');
        $.ajax({
            type: 'POST',
            url: 'feedback.php', // Обработчик формы отправки
            data: formNm.serialize(),
            success: function (data) {
                // Вывод текста результата отправки в текущей форме
                $(formNm).html(data);
                $('#' + formID).find('.form__submit').attr("disabled", "disabled").val('Заявка отправлена');
            }
        });
        return false;
    });
});