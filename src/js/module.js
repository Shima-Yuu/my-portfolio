/* ===========================================================
 * onepage-scroll.js v1.3.1
 * =========================================================== */
!(function ($) {
  var defaults = {
    sectionContainer: 'section',
    easing: 'ease',
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: true,
    responsiveFallback: false,
    direction: 'vertical',
  };
  $.fn.swipeEvents = function () {
    return this.each(function () {
      var startX,
        startY,
        $this = $(this);

      $this.bind('touchstart', touchstart);

      function touchstart(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.bind('touchmove', touchmove);
        }
      }

      function touchmove(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          var deltaX = startX - touches[0].pageX;
          var deltaY = startY - touches[0].pageY;

          if (deltaX >= 50) {
            $this.trigger('swipeLeft');
          }
          if (deltaX <= -50) {
            $this.trigger('swipeRight');
          }
          if (deltaY >= 50) {
            $this.trigger('swipeUp');
          }
          if (deltaY <= -50) {
            $this.trigger('swipeDown');
          }
          if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
            $this.unbind('touchmove', touchmove);
          }
        }
      }
    });
  };

  $.fn.onepage_scroll = function (options) {
    var settings = $.extend({}, defaults, options),
      el = $(this),
      sections = $(settings.sectionContainer);
    (total = sections.length), (status = 'off'), (topPos = 0), (leftPos = 0), (lastAnimation = 0), (quietPeriod = 500), (paginationList = '');

    $.fn.transformPage = function (settings, pos, index) {
      if (typeof settings.beforeMove == 'function') settings.beforeMove(index);

      // Just a simple edit that makes use of modernizr to detect an IE8 browser and changes the transform method into
      // an top animate so IE8 users can also use this script.
      if ($('html').hasClass('ie8')) {
        if (settings.direction == 'horizontal') {
          var toppos = (el.width() / 100) * pos;
          $(this).animate({ left: toppos + 'px' }, settings.animationTime);
        } else {
          var toppos = (el.height() / 100) * pos;
          $(this).animate({ top: toppos + 'px' }, settings.animationTime);
        }
      } else {
        $(this).css({
          '-webkit-transform': settings.direction == 'horizontal' ? 'translate3d(' + pos + '%, 0, 0)' : 'translate3d(0, ' + pos + '%, 0)',
          '-webkit-transition': 'all ' + settings.animationTime + 'ms ' + settings.easing,
          '-moz-transform': settings.direction == 'horizontal' ? 'translate3d(' + pos + '%, 0, 0)' : 'translate3d(0, ' + pos + '%, 0)',
          '-moz-transition': 'all ' + settings.animationTime + 'ms ' + settings.easing,
          '-ms-transform': settings.direction == 'horizontal' ? 'translate3d(' + pos + '%, 0, 0)' : 'translate3d(0, ' + pos + '%, 0)',
          '-ms-transition': 'all ' + settings.animationTime + 'ms ' + settings.easing,
          transform: settings.direction == 'horizontal' ? 'translate3d(' + pos + '%, 0, 0)' : 'translate3d(0, ' + pos + '%, 0)',
          transition: 'all ' + settings.animationTime + 'ms ' + settings.easing,
        });
      }
      $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    };

    $.fn.moveDown = function () {
      var el = $(this);
      index = $(settings.sectionContainer + '.active').data('index');
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
      if (next.length < 1) {
        if (settings.loop == true) {
          pos = 0;
          next = $(settings.sectionContainer + "[data-index='1']");
        } else {
          return;
        }
      } else {
        pos = index * 100 * -1;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data('index'));
      current.removeClass('active');
      next.addClass('active');
      if (settings.pagination == true) {
        $('.onepage-pagination li a' + "[data-index='" + index + "']").removeClass('active');
        $('.onepage-pagination li a' + "[data-index='" + next.data('index') + "']").addClass('active');
      }

      $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $('body').addClass('viewing-page-' + next.data('index'));

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (index + 1);
        history.pushState({}, document.title, href);
      }
      el.transformPage(settings, pos, next.data('index'));
    };

    $.fn.moveUp = function () {
      var el = $(this);
      index = $(settings.sectionContainer + '.active').data('index');
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

      if (next.length < 1) {
        if (settings.loop == true) {
          pos = (total - 1) * 100 * -1;
          next = $(settings.sectionContainer + "[data-index='" + total + "']");
        } else {
          return;
        }
      } else {
        pos = (next.data('index') - 1) * 100 * -1;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data('index'));
      current.removeClass('active');
      next.addClass('active');
      if (settings.pagination == true) {
        $('.onepage-pagination li a' + "[data-index='" + index + "']").removeClass('active');
        $('.onepage-pagination li a' + "[data-index='" + next.data('index') + "']").addClass('active');
      }
      $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $('body').addClass('viewing-page-' + next.data('index'));

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (index - 1);
        history.pushState({}, document.title, href);
      }
      el.transformPage(settings, pos, next.data('index'));
    };

    $.fn.moveTo = function (page_index) {
      current = $(settings.sectionContainer + '.active');
      next = $(settings.sectionContainer + "[data-index='" + page_index + "']");
      if (next.length > 0) {
        if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data('index'));
        current.removeClass('active');
        next.addClass('active');
        $('.onepage-pagination li a' + '.active').removeClass('active');
        $('.onepage-pagination li a' + "[data-index='" + page_index + "']").addClass('active');
        $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $('body').addClass('viewing-page-' + next.data('index'));

        pos = (page_index - 1) * 100 * -1;

        if (history.replaceState && settings.updateURL == true) {
          var href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (page_index - 1);
          history.pushState({}, document.title, href);
        }
        el.transformPage(settings, pos, page_index);
      }
    };

    function responsive() {
      //start modification
      var valForTest = false;
      var typeOfRF = typeof settings.responsiveFallback;

      if (typeOfRF == 'number') {
        valForTest = $(window).width() < settings.responsiveFallback;
      }
      if (typeOfRF == 'boolean') {
        valForTest = settings.responsiveFallback;
      }
      if (typeOfRF == 'function') {
        valFunction = settings.responsiveFallback();
        valForTest = valFunction;
        typeOFv = typeof valForTest;
        if (typeOFv == 'number') {
          valForTest = $(window).width() < valFunction;
        }
      }

      //end modification
      if (valForTest) {
        $('body').addClass('disabled-onepage-scroll');
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        el.swipeEvents().unbind('swipeDown swipeUp');
      } else {
        if ($('body').hasClass('disabled-onepage-scroll')) {
          $('body').removeClass('disabled-onepage-scroll');
          $('html, body, .wrapper').animate({ scrollTop: 0 }, 'fast');
        }

        el.swipeEvents()
          .bind('swipeDown', function (event) {
            if (!$('body').hasClass('disabled-onepage-scroll')) event.preventDefault();
            el.moveUp();
          })
          .bind('swipeUp', function (event) {
            if (!$('body').hasClass('disabled-onepage-scroll')) event.preventDefault();
            el.moveDown();
          });

        $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
          event.preventDefault();
          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          init_scroll(event, delta);
        });
      }
    }

    function init_scroll(event, delta) {
      deltaOfInterest = delta;
      var timeNow = new Date().getTime();
      // Cancel scroll if currently animating or within quiet period
      if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
        event.preventDefault();
        return;
      }

      if (deltaOfInterest < 0) {
        el.moveDown();
      } else {
        el.moveUp();
      }
      lastAnimation = timeNow;
    }

    // Prepare everything before binding wheel scroll

    el.addClass('onepage-wrapper').css('position', 'relative');
    $.each(sections, function (i) {
      $(this)
        .css({
          position: 'absolute',
          top: topPos + '%',
        })
        .addClass('section')
        .attr('data-index', i + 1);

      $(this).css({
        position: 'absolute',
        left: settings.direction == 'horizontal' ? leftPos + '%' : 0,
        top: settings.direction == 'vertical' || settings.direction != 'horizontal' ? topPos + '%' : 0,
      });

      if (settings.direction == 'horizontal') leftPos = leftPos + 100;
      else topPos = topPos + 100;

      if (settings.pagination == true) {
        paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>";
      }
    });

    el.swipeEvents()
      .bind('swipeDown', function (event) {
        if (!$('body').hasClass('disabled-onepage-scroll')) event.preventDefault();
        el.moveUp();
      })
      .bind('swipeUp', function (event) {
        if (!$('body').hasClass('disabled-onepage-scroll')) event.preventDefault();
        el.moveDown();
      });

    // Create Pagination and Display Them
    if (settings.pagination == true) {
      if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo('body');

      if (settings.direction == 'horizontal') {
        posLeft = (el.find('.onepage-pagination').width() / 2) * -1;
        el.find('.onepage-pagination').css('margin-left', posLeft);
      } else {
        posTop = (el.find('.onepage-pagination').height() / 2) * -1;
        el.find('.onepage-pagination').css('margin-top', posTop);
      }
      $('ul.onepage-pagination').html(paginationList);
    }

    if (window.location.hash != '' && window.location.hash != '#1') {
      init_index = window.location.hash.replace('#', '');

      if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
        $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass('active');
        $('body').addClass('viewing-page-' + init_index);
        if (settings.pagination == true) $('.onepage-pagination li a' + "[data-index='" + init_index + "']").addClass('active');

        next = $(settings.sectionContainer + "[data-index='" + init_index + "']");
        if (next) {
          next.addClass('active');
          if (settings.pagination == true) $('.onepage-pagination li a' + "[data-index='" + init_index + "']").addClass('active');
          $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $('body').addClass('viewing-page-' + next.data('index'));
          if (history.replaceState && settings.updateURL == true) {
            var href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + init_index;
            history.pushState({}, document.title, href);
          }
        }
        pos = (init_index - 1) * 100 * -1;
        el.transformPage(settings, pos, init_index);
      } else {
        $(settings.sectionContainer + "[data-index='1']").addClass('active');
        $('body').addClass('viewing-page-1');
        if (settings.pagination == true) $('.onepage-pagination li a' + "[data-index='1']").addClass('active');
      }
    } else {
      $(settings.sectionContainer + "[data-index='1']").addClass('active');
      $('body').addClass('viewing-page-1');
      if (settings.pagination == true) $('.onepage-pagination li a' + "[data-index='1']").addClass('active');
    }

    if (settings.pagination == true) {
      $('.onepage-pagination li a').click(function () {
        var page_index = $(this).data('index');
        el.moveTo(page_index);
      });
    }

    $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
      event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      if (!$('body').hasClass('disabled-onepage-scroll')) init_scroll(event, delta);
    });

    if (settings.responsiveFallback != false) {
      $(window).resize(function () {
        responsive();
      });

      responsive();
    }

    if (settings.keyboard == true) {
      $(document).keydown(function (e) {
        var tag = e.target.tagName.toLowerCase();

        if (!$('body').hasClass('disabled-onepage-scroll')) {
          switch (e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') el.moveUp();
              break;
            case 40:
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;
            case 32: //spacebar
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;
            case 33: //pageg up
              if (tag != 'input' && tag != 'textarea') el.moveUp();
              break;
            case 34: //page dwn
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;
            case 36: //home
              el.moveTo(1);
              break;
            case 35: //end
              el.moveTo(total);
              break;
            default:
              return;
          }
        }
      });
    }
    return false;
  };
})(window.jQuery);

/* ===========================================================
 * skill.bars.js
 * =========================================================== */
(function ($) {
  $.fn.skillBars = function (options) {
    var settings = $.extend(
      {
        from: 0, // number start
        to: false, // number end
        speed: 1000, // how long it should take to count between the target numbers
        interval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        onUpdate: null, // callback method for every time the element is updated,
        onComplete: null, // callback method for when the element finishes updating
        /*onComplete: function(from) {
              console.debug(this);
          }*/
        classes: {
          skillBarBar: '.skillbar-bar',
          skillBarPercent: '.skillbar-percent',
        },
      },
      options
    );

    return this.each(function () {
      var obj = $(this),
        to = settings.to != false ? settings.to : parseInt(obj.attr('data-percent'));
      if (to > 100) {
        to = 100;
      }
      var from = settings.from,
        loops = Math.ceil(settings.speed / settings.interval),
        increment = (to - from) / loops,
        loopCount = 0,
        interval = setInterval(updateValue, settings.interval);

      obj.find(settings.classes.skillBarBar).animate(
        {
          width: parseInt(obj.attr('data-percent')) + '%',
        },
        settings.speed
      );

      function updateValue() {
        from += increment;
        loopCount++;
        $(obj)
          .find(settings.classes.skillBarPercent)
          .text(from.toFixed(settings.decimals) + '%');

        if (typeof settings.onUpdate == 'function') {
          settings.onUpdate.call(obj, from);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          from = to;

          if (typeof settings.onComplete == 'function') {
            settings.onComplete.call(obj, from);
          }
        }
      }
    });
  };
})(jQuery);

/* ===========================================================
 * Flipster.js
 * =========================================================== */
!(function (P, t, D) {
  'use strict';
  function L(n, i) {
    var a = null;
    return function () {
      var t = this,
        e = arguments;
      null === a &&
        (a = setTimeout(function () {
          n.apply(t, e), (a = null);
        }, i));
    };
  }
  var r,
    e =
      ((r = {}),
      function (t) {
        if (r[t] !== D) return r[t];
        var e = document.createElement('div').style,
          n = t.charAt(0).toUpperCase() + t.slice(1),
          i = (t + ' ' + ['webkit', 'moz', 'ms', 'o'].join(n + ' ') + n).split(' ');
        for (var a in i) if (i[a] in e) return (r[t] = i[a]);
        return (r[t] = !1);
      }),
    a = 'http://www.w3.org/2000/svg',
    E = P(t),
    M = e('transform'),
    i = { itemContainer: 'ul', itemSelector: 'li', start: 'center', fadeIn: 400, loop: !1, autoplay: !1, pauseOnHover: !0, style: 'coverflow', spacing: -0.6, click: !0, keyboard: !0, scrollwheel: !0, touch: !0, nav: !1, buttons: !1, buttonPrev: 'Previous', buttonNext: 'Next', onItemSwitch: !1 },
    T = { main: 'flipster', active: 'flipster--active', container: 'flipster__container', nav: 'flipster__nav', navChild: 'flipster__nav__child', navItem: 'flipster__nav__item', navLink: 'flipster__nav__link', navCurrent: 'flipster__nav__item--current', navCategory: 'flipster__nav__item--category', navCategoryLink: 'flipster__nav__link--category', button: 'flipster__button', buttonPrev: 'flipster__button--prev', buttonNext: 'flipster__button--next', item: 'flipster__item', itemCurrent: 'flipster__item--current', itemPast: 'flipster__item--past', itemFuture: 'flipster__item--future', itemContent: 'flipster__item__content' },
    X = new RegExp('\\b(' + T.itemCurrent + '|' + T.itemPast + '|' + T.itemFuture + ')(.*?)(\\s|$)', 'g'),
    j = new RegExp('\\s\\s+', 'g');
  P.fn.flipster = function (e) {
    if ('string' == typeof e) {
      var n = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var t = P(this).data('methods');
        return t[e] ? t[e].apply(this, n) : this;
      });
    }
    var I = P.extend({}, i, e);
    return this.each(function () {
      var t,
        f,
        r,
        n,
        p,
        s,
        l,
        c,
        u,
        v = P(this),
        o = [],
        h = 0,
        d = !1,
        e = !1;
      function i(e) {
        return (
          (e = e || 'next'),
          P('<button class="' + T.button + ' ' + ('next' === e ? T.buttonNext : T.buttonPrev) + '" role="button" />')
            .html(((n = 'next' === (t = e) ? I.buttonNext : I.buttonPrev), 'custom' === I.buttons ? n : '<svg viewBox="0 0 13 20" xmlns="' + a + '" aria-labelledby="title"><title>' + n + '</title><polyline points="10,3 3,10 10,17"' + ('next' === t ? ' transform="rotate(180 6.5,10)"' : '') + '/></svg>'))
            .on('click', function (t) {
              y(e), t.preventDefault();
            })
        );
        var t, n;
      }
      function m() {
        v.css('transition', ''), f.css('transition', ''), p.css('transition', '');
      }
      function g(a) {
        var t, e;
        a && (v.css('transition', 'none'), f.css('transition', 'none'), p.css('transition', 'none')),
          (r = f.width()),
          f.height(
            ((e = 0),
            p.each(function () {
              (t = P(this).height()), e < t && (e = t);
            }),
            e)
          ),
          r
            ? (n && (clearInterval(n), (n = !1)),
              p.each(function (t) {
                var e,
                  n,
                  i = P(this);
                i.attr('class', function (t, e) {
                  return e && e.replace(X, '').replace(j, ' ');
                }),
                  (e = i.outerWidth()),
                  0 !== I.spacing && i.css('margin-right', e * I.spacing + 'px'),
                  (n = i.position().left),
                  (o[t] = -1 * (n + e / 2 - r / 2)),
                  t === p.length - 1 && (_(), a && setTimeout(m, 1));
              }))
            : (n =
                n ||
                setInterval(function () {
                  g(a);
                }, 500));
      }
      function _() {
        var e,
          n,
          i,
          a = p.length;
        p.each(function (t) {
          (e = P(this)),
            (n = ' '),
            (i = t === h ? ((n += T.itemCurrent), a + 1) : t < h ? ((n += T.itemPast + ' ' + T.itemPast + '-' + (h - t)), a - (h - t)) : ((n += T.itemFuture + ' ' + T.itemFuture + '-' + (t - h)), a - (t - h))),
            e.css('z-index', i).attr('class', function (t, e) {
              return e && e.replace(X, '').replace(j, ' ') + n;
            });
        }),
          0 <= h && ((r && o[h] !== D) || g(!0), M ? f.css('transform', 'translateX(' + o[h] + 'px)') : f.css({ left: o[h] + 'px' })),
          (function () {
            if (I.nav) {
              var t = s.data('flip-category');
              c.removeClass(T.navCurrent),
                u
                  .filter(function () {
                    return P(this).data('index') === h || (t && P(this).data('category') === t);
                  })
                  .parent()
                  .addClass(T.navCurrent);
            }
          })();
      }
      function y(t) {
        var e = h;
        if (!(p.length <= 1)) return 'prev' === t ? (0 < h ? h-- : I.loop && (h = p.length - 1)) : 'next' === t ? (h < p.length - 1 ? h++ : I.loop && (h = 0)) : 'number' == typeof t ? (h = t) : t !== D && ((h = p.index(t)), I.loop && e != h && (e == p.length - 1 && h != p.length - 2 && (h = 0), 0 == e && 1 != h && (h = p.length - 1))), (s = p.eq(h)), h !== e && I.onItemSwitch && I.onItemSwitch.call(v, p[h], p[e]), _(), v;
      }
      function b(t) {
        return (
          (I.autoplay = t || I.autoplay),
          clearInterval(d),
          (d = setInterval(function () {
            var t = h;
            y('next'), t !== h || I.loop || clearInterval(d);
          }, I.autoplay)),
          v
        );
      }
      function x() {
        return clearInterval(d), (d = 0), v;
      }
      function w(t) {
        return x(), I.autoplay && t && (d = -1), v;
      }
      function C() {
        g(!0), v.hide().css('visibility', '').addClass(T.active).fadeIn(I.fadeIn);
      }
      function k() {
        var o;
        if (((f = v.find(I.itemContainer).addClass(T.container)), !((p = f.find(I.itemSelector)).length <= 1)))
          return (
            p.addClass(T.item).each(function () {
              var t = P(this);
              t.children('.' + T.itemContent).length || t.wrapInner('<div class="' + T.itemContent + '" />');
            }),
            I.click &&
              p.on('click.flipster touchend.flipster', function (t) {
                e || (P(this).hasClass(T.itemCurrent) || t.preventDefault(), y(this));
              }),
            I.buttons && 1 < p.length && (v.find('.' + T.button).remove(), v.append(i('prev'), i('next'))),
            (o = {}),
            !I.nav ||
              p.length <= 1 ||
              (l && l.remove(),
              (l = P('<ul class="' + T.nav + '" role="navigation" />')),
              (u = P('')),
              p.each(function (t) {
                var e = P(this),
                  n = e.data('flip-category'),
                  i = e.data('flip-title') || e.attr('title') || t,
                  a = P('<a href="#" class="' + T.navLink + '">' + i + '</a>').data('index', t);
                if (((u = u.add(a)), n)) {
                  if (!o[n]) {
                    var r = P('<li class="' + T.navItem + ' ' + T.navCategory + '">'),
                      s = P('<a href="#" class="' + T.navLink + ' ' + T.navCategoryLink + '" data-flip-category="' + n + '">' + n + '</a>')
                        .data('category', n)
                        .data('index', t);
                    (o[n] = P('<ul class="' + T.navChild + '" />')), (u = u.add(s)), r.append(s, o[n]).appendTo(l);
                  }
                  o[n].append(a);
                } else l.append(a);
                a.wrap('<li class="' + T.navItem + '">');
              }),
              l.on('click', 'a', function (t) {
                var e = P(this).data('index');
                0 <= e && (y(e), t.preventDefault());
              }),
              'after' === I.nav ? v.append(l) : v.prepend(l),
              (c = l.find('.' + T.navItem))),
            0 <= h && y(h),
            v
          );
      }
      (t = {
        jump: y,
        next: function () {
          return y('next');
        },
        prev: function () {
          return y('prev');
        },
        play: b,
        stop: x,
        pause: w,
        index: k,
      }),
        v.data('methods', t),
        v.hasClass(T.active) ||
          (function () {
            var t;
            if ((v.css('visibility', 'hidden'), k(), p.length <= 1)) v.css('visibility', '');
            else {
              (t = !!I.style && 'flipster--' + I.style.split(' ').join(' flipster--')), v.addClass([T.main, M ? 'flipster--transform' : ' flipster--no-transform', t, I.click ? 'flipster--click' : ''].join(' ')), I.start && (h = 'center' === I.start ? Math.floor(p.length / 2) : I.start), y(h);
              var e,
                n,
                i,
                a,
                r,
                s,
                o,
                l,
                c = v.find('img');
              if (c.length) {
                var u = 0;
                c.on('load', function () {
                  ++u >= c.length && C();
                }),
                  setTimeout(C, 750);
              } else C();
              E.on('resize.flipster', L(g, 400)),
                I.autoplay && b(),
                I.pauseOnHover &&
                  f
                    .on('mouseenter.flipster', function () {
                      d ? w(!0) : x();
                    })
                    .on('mouseleave.flipster', function () {
                      -1 === d && b();
                    }),
                (e = v),
                I.keyboard &&
                  ((e[0].tabIndex = 0),
                  e.on(
                    'keydown.flipster',
                    L(function (t) {
                      var e = t.which;
                      (37 !== e && 39 !== e) || (y(37 === e ? 'prev' : 'next'), t.preventDefault());
                    }, 250)
                  )),
                (function (t) {
                  if (I.scrollwheel) {
                    var e,
                      n,
                      i = !1,
                      a = 0,
                      r = 0,
                      s = 0,
                      o = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
                    t
                      .on('mousewheel.flipster wheel.flipster', function () {
                        i = !0;
                      })
                      .on(
                        'mousewheel.flipster wheel.flipster',
                        L(function (t) {
                          clearTimeout(r),
                            (r = setTimeout(function () {
                              s = a = 0;
                            }, 300)),
                            (t = t.originalEvent),
                            (s += t.wheelDelta || -1 * (t.deltaY + t.deltaX)),
                            (Math.abs(s) < 25 && !o) || (a++, n !== (e = 0 < s ? 'prev' : 'next') && (a = 0), (n = e), (a < 6 || a % 3 == 0) && y(e), (s = 0));
                        }, 50)
                      ),
                      t.on('mousewheel.flipster wheel.flipster', function (t) {
                        i && (t.preventDefault(), (i = !1));
                      });
                  }
                })(f),
                (n = f),
                I.touch &&
                  n.on({
                    'touchstart.flipster': function (t) {
                      (t = t.originalEvent), (i = t.touches ? t.touches[0].clientX : t.clientX), (a = t.touches ? t.touches[0].clientY : t.clientY);
                    },
                    'touchmove.flipster': function (t) {
                      (t = t.originalEvent), (r = t.touches ? t.touches[0].clientX : t.clientX), (s = t.touches ? t.touches[0].clientY : t.clientY), (l = r - i), (o = s - a), 30 < Math.abs(l) && Math.abs(o) < 100 && t.preventDefault();
                    },
                    'touchend.flipster touchcancel.flipster ': function () {
                      (l = r - i), (o = s - a), 30 < Math.abs(l) && Math.abs(o) < 100 && y(0 < l ? 'prev' : 'next');
                    },
                  });
            }
          })();
    });
  };
})(jQuery, window);

/* ===========================================================
 * t.js
 * =========================================================== */

(function ($) {
  $.fn.t = function ($c, $o) {
    return this.each(function () {
      var _o = $o,
        _c = $c,
        c = $(this),
        o,
        oo,
        P = 'pause',
        tt = !1,
        bb = -1,
        z = '\u200b',
        q = '12qwertyuiop[]asdfghjkl;zxcvbnm,./~!@#$%^&*()_+:1234567890-=op'.split([]),
        q2 = '12qwertzuiop\u00fc+asdfghjkl\u00f6\u00e4#<yxcvbnm,.-!"§$%&/(()=?1234567890\u00df*p+',
        t = function (_1, _2) {
          return $.type(_1)[0] == (_2 || 'n');
        },
        f = function () {
          g =
            $.grep(d, function (f) {
              return f[0] == '&' || !f[1];
            }).length - 1;
          return g > -1 ? g : 0;
        },
        b = function (_) {
          if (bb == _) return;
          if (!_o.blink) return;
          if (_o.blink_perm) return;
          $$$.parent().data('blinking', (bb = !_ ? 0 : 1));
        };

      _c === '' && (_c = '<del>*</del>');
      if (c.data().is_typing) {
        if (_c == P) {
          c.data(P, t(_o, 'b') ? (oo_ = _o) : c.data(P) ? (oo_ = !1) : (oo_ = !!1));
          c.data('blinking', oo_ ? 1 : 0);
        }
        return this;
      } else {
        if (_c == P) return this;
        c.data('is_typing', 1);
      }

      t(_c, 'o') && (_o = _c);

      if (/t\-/.test(c.attr('class'))) return this;

      if (_c == 'add' && c.data().t) {
        var a = _o,
          _o = $.extend(c.data()),
          $$$ = (c = $(':first', c)),
          T = t(_o.typing, 'f');
        a = '<' + _o.tag + ' class="typing-add">' + a + '</' + _o.tag + '>';
      } else {
        if (_c == 'add') {
          _c = _o;
          _o = {};
        }

        var _o = $.extend({ t: !!1, delay: !1, speed: 75, speed_vary: !1, caret: '\u258e', tag: 'span', blink: !1, blink_perm: !1, repeat: -3, pause_on_click: !1, wrap: !1, mistype: !1, locale: 'en', init: !1, typing: !1, fin: !1 }, _o ? _o : c.data()),
          oo = !1,
          a = !1,
          k,
          d,
          dl,
          $$,
          $$$,
          T;

        if (!c.data().t) {
          c.wrapInner($('<' + _o.tag + '/>', { class: 't-container', style: 'top:auto;bottom:auto;' }));
          /^[ar]/.test(c.css('position')) || c.css({ position: 'relative' });
          c.css({ overflow: 'hidden' });
        }

        if (_o.wrap && !c.parent().data().t_wrap) {
          c.wrap($('<div/>', /[.#]/.test(_o.wrap[0]) ? (_o.wrap[0] == '#' ? { id: _o.wrap.substr(1) } : { class: _o.wrap.substr(1) }) : { style: _o.wrap }));
          c.parent().data('t_wrap', 1);
        }

        if (t(_o.caret, 's') && !$('.t-caret', c)[0]) {
          _o.blink === !!1 && (_o.blink = 2e2);
          t(_o.blink) && _o.blink < 50 && (_o.blink = 50);
          !t(_o.blink) && (_o.blink = !1);

          oo = $('<' + _o.tag + '/>', { class: 't-caret', html: _o.caret }).appendTo(c);
          _o.blink &&
            c.append(z) &&
            c.data(
              'bi',
              setInterval(
                function () {
                  if ($$$.parent().data().blinking | (v = oo.css('visibility')[0] == 'h') || _o.blink_perm) oo.css({ visibility: v ? 'visible' : 'hidden' });
                },
                t(_o.blink) ? _o.blink : _o.speed * (_o.speed_vary ? 4 : 5)
              )
            );
        }

        _o.blink || (c.data().bi && clearInterval(c.data().bi) && c.removeData('bi'));
        !t(_o.blink_perm, 'b') && (_o.blink_perm = !!1);
        _o.speed = !t(_o.speed) || _o.speed < 1e1 ? ~~1e1 : _o.speed;
        _o.speed_vary && (_o.speed /= 2.5);
        _o.mistype > 1 || (_o.mistype = !1);
        c.data(_o);

        $('.typing-0', c).replaceWith(function () {
          return this.childNodes;
        });
        $('.typing-add', c).remove();

        $$$ = c = $(':first', c);
        d = t(_c, 's') ? _c : c.html();
        d == '' && (d = z);
        c.empty();
        $$$.parent().show().css({ visibility: 'visible' });
        (t(_o.delay) && _o.delay > 0 && (k = ~~((_o.delay * 1e3) / _o.speed)) && _o.blink_perm) || c.parent().data('blinking', 1);

        T = t(_o.typing, 'f');
        _o.pause_on_click === !!1 &&
          c
            .parent()
            .off('click')
            .click(function (_) {
              if ($(_.target).data().click != '1') $(this).t('pause');
            });
      }

      /<kbd.*?>/i.test((d = String(a || d))) && c.parent().data('kbd', (j_ = 1)) && c.parent().data('mistype', !c.parent().data('mistype') ? (_j = 10) : (_j = c.parent().data().mistype)) && (_o.mistype = _j) && (_o.kbd = j_ ? j_ : !1);
      d = d
        .replace(/(.*?)[\u200b]+$/, '$1')
        .replace(/<\!\-\-([\s\S]+?)\-\->/g, '$1')
        .replace(/<ins>([^0-9])<\/ins>/g, '$1')
        .replace(/<(embed|command|col|wbr|img|br|input|hr)(.*?)[\/]?>/g, '<#$1$2/>')
        .replace(/<ins>\s*(\d*[.]?\d*)\s*(<\/ins>)/g, '<ins data-ins="$1"></ins>')
        .replace(/<ins(.*?)>([\s\S]*?)(<\/ins>)/g, function (a, b, c) {
          return '<#ins' + b + '>' + c.replace(/<(?!#)/g, '<#') + '<#/ins>' + (!c ? '</ins>' : '');
        })
        .replace(/<(del.*?data-del=")(.*?)(".*?)><\/(del>)/g, '<#$1$2$3><#/$4$2</$4')
        .replace(/<del(.*?)>([\s\S]*?)<\/del>/g, function (a, b, c, d) {
          s = c.match(/<s>\s*(.*?)\s*<\/s>/i);
          s = s && s[0] ? ' data-s="' + (s[1] || '1') + '"' : '';
          i = c.match(/data-ins=\"(.*?)\"/);
          i = i && i[1] ? i[1] : s == '' ? 0.25 : 0.75;
          c = c.replace(/(<s>.*?<\/s>|<[\/]?.*?>)/g, '');
          return '<del' + b + s + ' data-del="' + c.replace(/\n/, '\\n') + '" data-ins="' + i + '">' + (c != '*' ? c : '') + '</del>';
        })
        .replace(/<(\w+)(.*?)>/g, '<$1$2><#/$1>')
        .replace(/<\/(\w+)>/g, '</> ($1)')
        .replace(/<[#]+/g, '<')
        .replace(/(\/del>)\*</g, '$1<')
        .match(/<ins.*?>[\s\S]*?<\/ins>|<[^<]+\/>|<\/> \(\w+\)|<[\s\S]+?><\/\w+>|&[#x]?[a-z0-9]+;|\r|\n|\t|\S|\s/gi);
      !t(k) && (k = d.shift());
      d.push(z);
      _o.locale == 'de' && (q = q2);
      dl = f() + 1;
      !a && t(_o.init, 'f') && _o.init($$$.parent());

      $$ = setInterval(function () {
        if ($$$.parent().data(P)) return;
        if (tt) return;
        tt = !tt;

        if (t(k)) {
          if (--k > 0) {
            tt = !tt;
            b(c.data().ins <= 0.25 ? 0 : 1);
            return;
          }
          k = c.data().ins ? '</>' : d.shift();
        } else if (_o.speed_vary && ~~(Math.random() * 4)) {
          tt = !tt;
          return;
        }
        b(0);

        if (c.data().del) {
          if (c.data().s && !k[0]) c.text('');
          o = String(c.data().del);
          !t(k, 'a') && k[1] == '/' && (k = o.replace(/\\n/g, '\n').split([]));
          if (t(k, 'a')) {
            if (!(p = k.pop())) {
              if (o == '*') {
                $$$.wrapInner($('<' + _o.tag + '/>', { class: 'typing-0', style: 'display:none;' }));
                c = c.parent();
                if (a) {
                  d = $.merge(['<' + _o.tag + ' class="typing-add"></' + _o.tag + '>'], d, ['</' + _o.tag + '>']);
                  c = c.parent();
                }
              }
              c = c.parent();
              o == z && c.find(':last').remove();
              k = '';
            } else {
              if (c.data().s) {
                c.html(k.join([]) + '<mark ' + ((_ = String(c.data().s))[0] == '.' ? 'class="' + _.substr(1) + '"' : 'style="background:' + (_ == '1' ? 'yellow' : _.split(',')[0]) + ((_ = _.split(',')[1]) ? ';color:' + _ : '') + ';"') + '>' + c.data().del.substr(k.length) + '</mark>');
              } else {
                c.text(k.join([]));
              }
              tt = !tt;
              return;
            }
          }
        }

        while (k[1] == '/') {
          c = c.parent();
          k = d.shift() || '';
        }
        while (1) {
          c.append(k);
          T && _o.typing($$$.parent(), k, f(), dl);
          !/<ins.*?>[\s\S]+</.test(k) && /></.test(k) && (c = c.find(':last'));
          if (d[0] && /<\w+/.test(d[0])) k = d.shift();
          else break;
        }

        if (!(k = d.shift())) {
          clearInterval($$);
          $$$.parent().removeData(['is_typing', P]);
          t(_o.repeat) && --_o.repeat;
          if (_o.repeat > -1) {
            _o.init = !1;
            $$$.parent().t(t(_c, 'o') ? _o : _c, _o);
            return;
          } else {
            b(1);
            t(_o.fin, 'f') && _o.fin($$$.parent());
          }
          return;
        }

        if (((_o.mistype && !_o.kbd) || (_o.kbd && /kbd/i.test(c.prop('tagName')))) && k && !k[1] && c.data().del != z && k != '\x20' && !~~(Math.random() * _o.mistype) && (__ = $.inArray(k.toLowerCase(), q, 2)) > -1) {
          __ += ~~(Math.random() * 2) + 1;
          ~~(Math.random() * 2) && (__ -= 3);
          d = $.merge([k.charCodeAt(0) < 0x5a ? q[__].toUpperCase() : q[__], '</del>', k], d);
          k = '<del data-ins=".25" data-del="' + z + '"></del>';
        }
        if (k && k[1] == '/' && c.data().ins) k = ~~((Number(c.data().ins) * 1e3) / _o.speed);
        tt = !tt;
      }, _o.speed);
    });
  };
})(jQuery);