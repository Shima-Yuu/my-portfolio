// Variable Declaration
var $window = $(window);
var top_color = '#DA0463';
var about_color = '#63da04';
var skills_color = '#0463da';
var works_color = '#7b04da';
var contact_color = '#c0c0c0';

// Loading Animation
$window.on('load', function () {
  $('#js-slide-in-bg').animate({ width: '0' }, 2000);
  setTimeout(function () {
    $('#js-loader img').addClass('animation');
  }, 2300);
  setTimeout(function () {
    $('#js-loader img').removeClass('animation');
  }, 3300);
  setTimeout(function () {
    loadingAnimation();
  }, 3500);
});
function loadingAnimation() {
  // SP***************************************************************
  if (window.matchMedia('(max-width: 599px)').matches) {
    $('#js-loader-bg').animate({ minHeight: '60px' }, 1500);
    $('.gnav').remove();
    $('#stalker').remove();
    $('.loading__logo img').animate({ width: '40px' }, 1500);
    $('.loading__logo img').css('height', 'auto');
    $('main').addClass('sp');

    // tab***************************************************************
  } else if (window.matchMedia('(max-width: 1024px)').matches) {
    $('#js-loader-bg').animate({ minHeight: '100px' }, 1500);
    $('.gnav').remove();
    $('#stalker').remove();
    $('.loading__logo img').animate({ width: '80px' }, 1500);
    $('.loading__logo img').css('height', 'auto');
    $('main').addClass('sp');
    // PC***************************************************************
  } else if (window.matchMedia('(max-width: 1200px)').matches) {
    $('#js-loader-bg').animate({ width: '170px' }, 1500);
  } else {
    $('#js-loader-bg').animate({ width: '200px' }, 1500);
  }

  // SP***************************************************************
  if (window.matchMedia('(max-width: 1024px)').matches) {
    $('#js-loader').animate({ top: '10px', left: '10px' }, 1500);
    setTimeout(function () {
      $('#js-loader-bg').addClass('js-border2');
    }, 1600);
    setTimeout(function () {
      $('#hamburgerMenu_toggle').fadeIn('slow');
    }, 3000);

    // PC***************************************************************
  } else {
    $('#js-loader').animate({ top: '20px' }, 1500);
    setTimeout(function () {
      $('#js-loader-bg').addClass('js-border');
    }, 1600);
    setTimeout(function () {
      let gnav_item_len = $('.gnav__item').length;
      $('.gnav__item').each(function (i) {
        $(this)
          .delay(300 * i)
          .fadeIn('slow');
        if (i == gnav_item_len - 1) {
          $('.scroll-down').delay(2000).fadeIn('slow');
        }
      });
    }, 3000);
  }
}

$(function () {
  // Hamburger menu
  if (window.matchMedia('(max-width: 1024px)').matches) {
    $('#hamburgerMenu_toggle').on('click', function () {
      $('body').toggleClass('open');
    });
  }

  // Top Head Txt Animation
  // SP***************************************************************
  if (window.matchMedia('(max-width: 1024px)').matches) {
    var rXP = 150;
    var rYP = 150;
    $('#js-head-txt').css('text-shadow', +rYP / 10 + 'px ' + rXP / 80 + 'px ' + top_color + ' , ' + rYP / 8 + 'px ' + rXP / 60 + 'px ' + about_color + ', ' + rXP / 70 + 'px ' + rYP / 12 + 'px ' + skills_color);

    // PC***************************************************************
  } else {
    $('body').mousemove(function (e) {
      var rXP = e.pageX - this.offsetLeft - $(this).width() / 2;
      var rYP = e.pageY - this.offsetTop - $(this).height() / 2;
      $('#js-head-txt').css('text-shadow', +rYP / 10 + 'px ' + rXP / 80 + 'px ' + top_color + ' , ' + rYP / 8 + 'px ' + rXP / 60 + 'px ' + about_color + ', ' + rXP / 70 + 'px ' + rYP / 12 + 'px ' + skills_color);
    });
  }

  // Mouse Stalker
  $(document).on('mousemove', function (e) {
    var hovFlag = false;
    if (!hovFlag) {
      $('#stalker').css({
        transform: 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)',
      });
    }
    $('#stalker').fadeIn(500);
  });

  // Navigation Hover Animation
  var link_list = $('.gnav__item__wrapper:not(.no_stick_)');
  navHoverAnimation();

  // Works Ajax Modal Data Draw
  $.getJSON('json/works_modal-data.json', { name: 'chara' }, function (data) {
    var website = data.website;
    var banner = data.banner;
    var logo = data.logo;
    var lp = data.lp;
    var flip_item_html = '<li class="flip-item__name" data-flip-title=""><a href=""><img src="" class="modalOpen2"></a></li>';
    for (var i = 0; i < website.length; i++) {
      $('#website .flip-items').append(flip_item_html);
    }
    for (var i = 0; i < banner.length; i++) {
      $('#banner .flip-items').append(flip_item_html);
    }
    for (var i = 0; i < logo.length; i++) {
      $('#logo .flip-items').append(flip_item_html);
    }
    for (var i = 0; i < lp.length; i++) {
      $('#lp .flip-items').append(flip_item_html);
    }
    for (var i = 0; i < $('#website .modalOpen2').length; i++) {
      $('.flip-item__name').eq(i).attr('data-flip-title', website[i].name);
      $('.flip-item__name img').eq(i).attr('src', website[i].path);
    }
    for (var i = 0; i < $('#banner .modalOpen2').length; i++) {
      $('.flip-item__name')
        .eq(i + website.length)
        .attr('data-flip-title', banner[i].name);
      $('.flip-item__name img')
        .eq(i + website.length)
        .attr('src', banner[i].path);
    }
    for (var i = 0; i < $('#logo .modalOpen2').length; i++) {
      $('.flip-item__name')
        .eq(i + website.length + banner.length)
        .attr('data-flip-title', logo[i].name);
      $('.flip-item__name img')
        .eq(i + website.length + banner.length)
        .attr('src', logo[i].path);
    }
    for (var i = 0; i < $('#lp .modalOpen2').length; i++) {
      $('.flip-item__name')
        .eq(i + website.length + banner.length + logo.length)
        .attr('data-flip-title', lp[i].name);
      $('.flip-item__name img')
        .eq(i + website.length + banner.length + logo.length)
        .attr('src', lp[i].path);
    }
  });

  // One Page Scroll Animation
  $('main').onepage_scroll({
    sectionContainer: 'section',
    easing: 'ease',
    animationTime: 700,
    pagination: false,
    updateURL: false,

    beforeMove: function (index) {
      /* ===========================================================
       * About Section
       * =========================================================== */
      if ($('.about').hasClass('active')) {
        // About Common Func
        sectionCommonScript('#about', about_color, '#58c402');

        // Profile image Line FadeIn
        setTimeout(function () {
          $('.about__cont').addClass('js-fadein');
          setTimeout(() => {
            $('.about__cont,.about__cont__bg-txt').addClass('js-color');
            $('.about__cont-right__color').fadeIn(1000);
          }, 3000);
        }, 500);

        // Hamburger menu current toggle
        hamburgerMenuCurrentToggle2('#about2');

        /* ===========================================================
         * Skills Section
         * =========================================================== */
      } else if ($('.skills').hasClass('active')) {
        // Skills Common Func
        sectionCommonScript('#skills', skills_color, '#0359C4');

        // Skillbar Animation
        var good_score = '.-html .skillbar-percent__once, .-css .skillbar-percent__once, .-jquery .skillbar-percent__once, .-pug .skillbar-percent__once, .-sass .skillbar-percent__once, .-wordpress .skillbar-percent__once';
        var nice_score = '.-javascript .skillbar-percent__once, .-vue .skillbar-percent__once, .-nuxt .skillbar-percent__once,  .-gulp .skillbar-percent__once';
        $(good_score).css({
          color: '#e6b422',
          'text-shadow': '0 0 10px #e6b422, 0 0 15px #e6b422',
        });
        $('.skillbar').skillBars({
          from: 0,
          speed: 4000,
          interval: 100,
        });
        // Skillbar Text Animation
        // SP***************************************************************
        if (window.matchMedia('(max-width: 1024px)').matches) {
          skillbarTxtAnimation(nice_score, '2.5rem');
          skillbarTxtAnimation(good_score, '3.5rem');

          // PC***************************************************************
        } else {
          skillbarTxtAnimation(nice_score, '3.5rem');
          skillbarTxtAnimation(good_score, '5rem');
        }

        setTimeout(function () {
          $(good_score).addClass('-fix');
          $(nice_score).addClass('-fix2');
          $('.skillbar-percent').removeClass('skillbar-percent');
        }, 5000);
        setTimeout(function () {
          $('.skills__cont__more__line').addClass('js-line_trigger');

          // Skills modal
          $('#skills_modal-trigger').on('click', function() {
            $('.skills_modal').fadeIn('slow');
          })
          $('.close-animatedModal').on('click', function() {
            $('.skills_modal').fadeOut('slow');
          })
        }, 5000);
        setTimeout(function () {
          $('#skills_modal-trigger').animate(
            {
              opacity: 1,
            },
            1000
          );
          $('#skills_modal-trigger').on('click', function () {
            setTimeout(() => {
              $('.skills_modal-item').each(function (i) {
                $(this)
                  .delay(i * 300)
                  .animate(
                    {
                      opacity: 1,
                      marginBottom: '0',
                    },
                    1000
                  );
              });
            }, 500);
          });
        }, 5500);
        // Skillbar Text Animation Func
        function skillbarTxtAnimation(el, fz) {
          $(el).animate(
            {
              fontSize: fz,
            },
            4000
          );
        }

        // Hamburger menu current toggle
        hamburgerMenuCurrentToggle2('#skills2');

        /* ===========================================================
         * Works Section
         * =========================================================== */
      } else if ($('.works').hasClass('active')) {
        // Works Common Func
        sectionCommonScript('#works', works_color, '#6e03c4');
        $('.flip-items').css('display', 'block');
        // Cover Flow
        var flipsterOption = {
          start: 'center',
          loop: true,
          fadeIn: 100,
          style: 'carousel',
          spacing: -0.5,
          keyboard: true,
          touch: true,
          scrollwheel: false,
          nav: true,
          buttons: true,
        };
        var website = $('#website').flipster(flipsterOption);
        var banner = $('#banner').flipster(flipsterOption);
        var logo = $('#logo').flipster(flipsterOption);
        var lp = $('#lp').flipster(flipsterOption);

        // Default Hide To Banner&Logo
        if ($('.works__cont__tab__item.current').text() == 'Website') {
          $('#banner,#logo,#lp').addClass('hide');
        }

        // Works Original Hover Animation
        hoverAnimation('.flipster__nav__link');
        hoverAnimation('.flipster__button');
        hoverAnimation('.works-modal__close');
        hoverAnimation('.works-modal__link-href');
        var flipster__item_current = $('.flipster__item--current');
        hoverAnimation(flipster__item_current);
        $('.flipster__nav__link').click(function () {
          flipsterItemHoverAnimation();
        });
        $('.flipster__button').click(function () {
          flipsterItemHoverAnimation();
        });
        function flipsterItemHoverAnimation() {
          setTimeout(function () {
            $('.flipster__item').each(function (i, el) {
              $(el).off('mouseover');
              $(el).off('mouseout');
            });
            flipster__item_current = $('.flipster__item--current');
            hoverAnimation(flipster__item_current);
          }, 100);
        }

        // Tab Click Toggle
        $('.works__cont__tab__item').click(function () {
          if ($(this).attr('id') === 'website_tab') {
            tabClickAnimation('#website_tab', '#website', '#banner,#logo,#lp');
            $('.works__cont__circle').text('Website');
          } else if ($(this).attr('id') === 'banner_tab') {
            tabClickAnimation('#banner_tab', '#banner', '#website,#logo,#lp');
            $('.works__cont__circle').text('Banner');
          } else if ($(this).attr('id') === 'logo_tab') {
            tabClickAnimation('#logo_tab', '#logo', '#banner,#website,#lp');
            $('.works__cont__circle').text('Logo');
          } else if ($(this).attr('id') === 'lp_tab') {
            tabClickAnimation('#lp_tab', '#lp', '#banner,#website,#logo');
            $('.works__cont__circle').text('LP');
          }
        });
        function tabClickAnimation(tab_el, flip_el, hide_el) {
          $('.works__cont__tab__item').removeClass('current');
          $(tab_el).addClass('current');
          $(hide_el).addClass('hide');
          $(flip_el).removeClass('hide');
        }

        //  Works Modal Content
        modalWindow('.modalOpen2', 'modalOverlay2', '#modalClose2', '#modalCont2', 'body');

        $('.modalOpen2').on('click', function () {
          var i = $('.modalOpen2').index(this);
          // Works Ajax Modal Data Draw
          $.getJSON('json/works_modal-data.json', { name: 'chara' }, function (data) {
            var website = data.website;
            var banner = data.banner;
            var logo = data.logo;
            var lp = data.lp;
            if ($('.works__cont__tab__item.current').text() == 'Website') {
              $('.works-modal__head').text(website[i].name);
              $('.works-modal__img img').attr('src', website[i].path);
              $('.works-modal__img a').attr('href', website[i].link);
              $('.works-modal__link').css('display', 'flex');
              $('.works-modal__link-href').attr('href', website[i].link);
              $('.works-modal__link-href').text(website[i].link);
              $('.works-modal__time').text(website[i].time);
              $('.works-modal__skills').text(website[i].skills);
              $('.works-modal__description').text(website[i].description);
            } else if ($('.works__cont__tab__item.current').text() == 'Banner') {
              i -= data.website.length;
              $('.works-modal__head').text(banner[i].name);
              $('.works-modal__img img').attr('src', banner[i].path);
              $('.works-modal__link').css('display', 'none');
              $('.works-modal__time').text(banner[i].time);
              $('.works-modal__skills').text(banner[i].skills);
              $('.works-modal__description').text(banner[i].description);
            } else if ($('.works__cont__tab__item.current').text() == 'Logo') {
              i -= data.website.length + data.banner.length;
              $('.works-modal__head').text(logo[i].name);
              $('.works-modal__img img').attr('src', logo[i].path);
              $('.works-modal__link').css('display', 'none');
              $('.works-modal__time').text(logo[i].time);
              $('.works-modal__skills').text(logo[i].skills);
              $('.works-modal__description').text(logo[i].description);
            } else if ($('.works__cont__tab__item.current').text() == 'LP') {
              i -= data.website.length + data.banner.length + data.logo.length;
              $('.works-modal__head').text(lp[i].name);
              $('.works-modal__img img').attr('src', lp[i].path);
              $('.works-modal__img a').attr('href', lp[i].link);
              $('.works-modal__link').css('display', 'flex');
              $('.works-modal__link-href').attr('href', lp[i].link);
              $('.works-modal__link-href').text(lp[i].link);
              $('.works-modal__time').text(lp[i].time);
              $('.works-modal__skills').text(lp[i].skills);
              $('.works-modal__description').text(lp[i].description);
            }
          });
        });

        // Hamburger menu current toggle
        hamburgerMenuCurrentToggle2('#works2');

        /* ===========================================================
         * Contact Section
         * =========================================================== */
      } else if ($('.contact').hasClass('active')) {
        // Contact Common Func
        sectionCommonScript('#contact', contact_color, '#a9a9a9');

        // Form Validation
        $('.name').blur(function () {
          if ($(this).val() == '') {
            $('span.error_required').text('※入力必須項目です');
          } else {
            $('span.error_required').text('');
          }
        });
        $('.email').blur(function () {
          if (
            !$(this)
              .val()
              .match(/^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/)
          ) {
            $('span.error_email').text('※ただしく入力してください');
          } else {
            $('span.error_email').text('');
          }
          if ($(this).val() == '') {
            $('span.error_email_required').text('※入力必須項目です');
          } else {
            $('span.error_email_required').text('');
          }
        });

        // Typing thank you message
        $('#typing_txt').t({
          speed: 130,
          speed_vary: true,
          delay: 1,
          mistype: 20,
          locale: 'en',
          blink: false,
          fin: function () {
            $('.contact__cont__thank').removeAttr('id');
            $('.t-caret').remove();
            setTimeout(function () {
              $('.t-container').addClass('border');
            }, 500);
          },
        });

        if (window.matchMedia('(max-width: 1024px)').matches) {
          $('.contact__cont__thank').css('display', 'inline-block');
        } else if (window.matchMedia('(max-width: 1200px)').matches) {
          $('.contact__cont__thank').css('display', 'none');
        }

        // Hamburger menu current toggle
        hamburgerMenuCurrentToggle2('#contact2');

        /* ===========================================================
         * Top Section
         * =========================================================== */
      } else {
        // Top Common Func
        sectionCommonScript('#top', top_color, '#ad034e');

        // Hamburger menu current toggle
        hamburgerMenuCurrentToggle2('#top2');
      }
    },
  });

  //  Skills Modal Content
  modalWindow('.modalOpen', 'modalOverlay', '#modalClose', '#modalCont', 'body');

  function modalWindow(el, modalOverlay, modalClose, modalCont, mainWrap) {
    $(el).click(function () {
      var scrollpos = $window.scrollTop();
      $(mainWrap).addClass('is-fixed').css({ top: -scrollpos });
      $(mainWrap)
        .append('<div id="' + modalOverlay + '"></div>')
        .fadeIn('slow');
      $(modalCont).fadeIn('slow');
      centering();
      $('#' + modalOverlay + ',' + modalClose).click(function () {
        $(mainWrap).removeClass('is-fixed').css({ top: 0 });
        window.scrollTo(0, scrollpos);
        $(modalCont + ',' + '#' + modalOverlay).fadeOut('slow', function () {
          $('#' + modalOverlay).remove();
        });
      });
      return false;
    });
    $window.resize(centering);
    function centering() {
      var w = $window.width();
      var h = $window.height();
      var cw = $(modalCont).outerWidth();
      var ch = $(modalCont).outerHeight();
      $(modalCont).css({ left: (w - cw) / 2 + 'px', top: (h - ch) / 2 + 'px' });
    }
  }

  // One Page Scroll Animation Navigation
  // SP***************************************************************
  $('#top2').on('click', function () {
    hamburgerMenuCurrentToggle(1, '#top2');
  });
  $('#about2').on('click', function () {
    hamburgerMenuCurrentToggle(2, '#about2');
  });
  $('#skills2').on('click', function () {
    hamburgerMenuCurrentToggle(3, '#skills2');
  });
  $('#works2').on('click', function () {
    hamburgerMenuCurrentToggle(4, '#works2');
  });
  $('#contact2').on('click', function () {
    hamburgerMenuCurrentToggle(5, '#contact2');
  });

  // Hamburger menu current toggle
  function hamburgerMenuCurrentToggle(num, el) {
    $('.main').moveTo(num);
    $('body').toggleClass('open');
    $('.hamburger-menu__cont__item-inner').removeClass('current');
    $(el).addClass('current');
  }
  function hamburgerMenuCurrentToggle2(el) {
    $('.hamburger-menu__cont__item-inner').removeClass('current');
    $(el).addClass('current');
  }

  // PC***************************************************************
  $('#top').click(function () {
    $('.main').moveTo(1);
    navHoverAnimationLink('#top');
    particleLoop();
    particleTemplate(top_color, '#ad034e');
  });
  $('#about').click(function () {
    $('.main').moveTo(2);
    navHoverAnimationLink('#about');
    particleLoop();
    particleTemplate(about_color, '#58c402');
  });
  $('#skills').click(function () {
    $('.main').moveTo(3);
    navHoverAnimationLink('#skills');
    particleLoop();
    particleTemplate(skills_color, '#0359C4');
  });
  $('#works').click(function () {
    $('.main').moveTo(4);
    navHoverAnimationLink('#works');
    particleLoop();
    particleTemplate(works_color, '#6e03c4');
  });
  $('#contact').click(function () {
    $('.main').moveTo(5);
    navHoverAnimationLink('#contact');
    particleLoop();
    particleTemplate(contact_color, '#a9a9a9');
  });

  // navigation Hover Animation Link Func
  function navHoverAnimationLink(nav_el) {
    $('.gnav__item__wrapper').each(function (i, e) {
      $(e).removeClass('no_stick_');
      $(e).removeClass('current');
    });
    $(nav_el).addClass('no_stick_');
    $(nav_el).addClass('current');
    $(nav_el).off('mouseover');
    $(nav_el).off('mouseout');
    link_list = $('.gnav__item__wrapper:not(.no_stick_)');
    navHoverAnimation();
    if (nav_el == '#about') {
      $(nav_el).addClass('-about');
      $('#stalker').removeClass();
      $('#stalker').addClass('-about');
    } else if (nav_el == '#skills') {
      $(nav_el).addClass('-skills');
      $('#stalker').removeClass();
      $('#stalker').addClass('-skills');
    } else if (nav_el == '#works') {
      $(nav_el).addClass('-works');
      $('#stalker').removeClass();
      $('#stalker').addClass('-works');
    } else if (nav_el == '#contact') {
      $(nav_el).addClass('-contact');
      $('#stalker').removeClass();
      $('#stalker').addClass('-contact');
    } else {
      $('#stalker').removeClass();
    }
  }

  // Navigation Hover Animation Func
  function navHoverAnimation() {
    $(link_list).each(function (i, e) {
      $(e).mouseover(function () {
        hovFlag = true;
        $('#stalker').addClass('hov_');
        var rect = e.target.getBoundingClientRect();
        var posX = rect.left + rect.width / 2;
        var posY = rect.top + rect.height / 2;
        stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
      });
      $(e).mouseout(function () {
        hovFlag = false;
        $('#stalker').removeClass('hov_');
      });
    });
  }

  // Hover Animation
  hoverAnimation('.skills__cont__more__txt');
  hoverAnimation('.modal__mfp-close');
  hoverAnimation('.works__cont__tab__item');
  hoverAnimation('.contact__cont__form__item');

  function hoverAnimation(el) {
    $(el).mouseover(function () {
      hovFlag = true;
      $('#stalker').addClass('hov_');
      var rect = el.target.getBoundingClientRect();
      var posX = rect.left + rect.width / 2;
      var posY = rect.top + rect.height / 2;
      stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    });
    $(el).mouseout(function () {
      hovFlag = false;
      $('#stalker').removeClass('hov_');
    });
  }

  // Section Common Func
  function sectionCommonScript(currenrNav, currentColor, currentColor2) {
    navHoverAnimationLink(currenrNav);
    particleLoop();
    particleTemplate(currentColor, currentColor2);
  }
});

// default Particle Animation
let particles_count_pc = 210;
let particles_count_sp = 70;
var particles = Particles.init({
  selector: '#canvas-container',
  color: [top_color, '#ad034e'],
  maxParticles: particles_count_pc,
  speed: 0.5,
  sizeVariations: 5,
  connectParticles: true,
  responsive: [
    {
      breakpoint: 1024,
      options: {
        maxParticles: particles_count_sp,
      },
    },
  ],
});

// Particle Animation Template
function particleTemplate(color1, color2) {
  var particles = Particles.init({
    selector: '#canvas-container',
    color: [color1, color2],
    maxParticles: particles_count_pc,
    speed: 0.5,
    sizeVariations: 5,
    connectParticles: true,
    responsive: [
      {
        breakpoint: 1024,
        options: {
          maxParticles: particles_count_sp,
        },
      },
    ],
  });
}

// Particle Animation Loop
function particleLoop() {
  particles.destroy();
  $('.particle').append('<canvas class="particle__canvas" id="canvas-container"></canvas>');
}
