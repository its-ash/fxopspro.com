(function ($) {

    'use strict';
    $.exists = function(selector) {
      return ($(selector).length > 0);
  }

    swiperActivation();
    ms_custom_cursor_portfolio();
    onScroll();
    titleOpacityWrap();
    smoothScroll();
    videoActivation();
    gsapScrollingText();
    ms_menu_mokko_button();
    // ms_headline();
    isotopeActivation();
    ms_masonry_gallery();
    ms_lightbox();
    ms_woo_quantity();
    ms_theme_mode();
    ms_search_widget();
    ms_header_menu();
    ms_menu_default_mobile();
    
     // Swiper Slider Options
     function swiperActivation($scope){
        var swiper = new Swiper(".swiper-container-h", {
            direction: "horizontal",
            effect: "fade",
            autoplay: false,
            parallax: true,
            mousewheel: true,
            speed: 1600,
            rtl: true,
            loop: true,
            loopFillGroupWithBlank: !0,
            mousewheelControl: {
              enabled: true,
              onlyInViewport: true
            },
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar"
            },          
            
        });
        var swiper = new Swiper(".aboutSlider", {
          effect: "coverflow",
          slidesPerView: 1,
          centeredSlides: true,
          mousewheel: true,
          speed: 1200,
          autoplay: true,
          loop: true,
          slidesPerView: "auto",
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        var swiper = new Swiper(".swiper-container-h1", {
          direction: "horizontal",
          effect: "slide",
          autoplay: false,
          parallax: true,
          speed: 1600,
          rtl: true,
          loop: true,
          loopFillGroupWithBlank: !0,
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable:"true"
            }
        });
    }
    
    // Custom Cursor Portfolio
    function ms_custom_cursor_portfolio($scope) {

      // Custom Cursor Portfolio
      if ($('.cursor-custom').length > 0) {
        // Check if element with class '.cursor-custom' exists in the DOM
    
        if ($(".ms-cc_p").length > 0) {
            // If an element with class '.ms-cc_p' exists (seems like a placeholder check), do nothing
        } else {
            // If '.ms-cc_p' element doesn't exist, create it dynamically
            var html = '<div class="ms-cc_p">' +
                '<div class="cursor-view">' +
                    '<div class="cursor-text-holder">' +
                        '<div class="cursor-text"></div>' +
                    '</div>' +
                    '<div class="cursor-dot"></div>' +
                '</div>' +
            '</div>';
            $('body').append(html); // Append the HTML to the body
        }
    
        var cursorArea = $('.cursor-custom'); // Select elements with class '.cursor-custom'
        var el = $('.portfolio-feed'); // Select elements with class '.portfolio-feed'
        var el_text = el.attr('data-hover-text'); // Get 'data-hover-text' attribute value from '.portfolio-feed'
    
        gsap.set(".ms-cc_p", {xPercent: -50, yPercent: -50}); // Set initial position of '.ms-cc_p' using GSAP
    
        // Initialize variables for cursor movement
        const ball = document.querySelector(".ms-cc_p");
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 1;
        const xSet = gsap.quickSetter(ball, "x", "px");
        const ySet = gsap.quickSetter(ball, "y", "px");
    
        // Event listener for mouse movement
        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
    
        $('.cursor-text').text(el_text); // Set initial text for '.cursor-text'
    
        // Iterate over each '.cursor-custom' element
        cursorArea.each((index, item) => {
            var $this = $(item);
            var $n_item = $this;
    
            // Event handler for mouse enter
            $n_item.on('mouseenter', (e) => {
                $n_item.addClass('hovering');
    
                gsap.ticker.add(() => {
                    // Adjust cursor movement speed
                    const dt = 1.0 - Math.pow(1 - speed, gsap.ticker.deltaRatio());
                    pos.x += (mouse.x - pos.x) * dt;
                    pos.y += (mouse.y - pos.y) * dt;
                    xSet(pos.x);
                    ySet(pos.y);
                });
    
                if ($n_item.hasClass('hovering')) {
                    $('.cursor-text').text(el_text); // Update '.cursor-text' with 'data-hover-text'
                    var text_h = $('.cursor-text').width();
                    $('.ms-cc_p .cursor-view, .cursor-text-holder').css('width', 'calc(4em + ' + text_h + 'px)');
                    $('.ms-cc_p').addClass('active'); // Add 'active' class to '.ms-cc_p'
                }
            }).on('mouseleave', (e) => {
                $n_item.removeClass('hovering');
                $('.ms-cc_p').removeClass('active'); // Remove 'active' class from '.ms-cc_p'
                $('.ms-cc_p .cursor-view, .cursor-text-holder').css('width', '100%'); // Reset width of elements
            });
        });
    }
    }
    document.addEventListener('DOMContentLoaded', function() {
        // Check if smooth scroll should be enabled
        var data_scroll = document.body.getAttribute('data-smooth-scroll');
        var smscroll = data_scroll === 'on';
    
        // Initialize LocomotiveScroll with proper options
        const locoScroll = new LocomotiveScroll({
            lenisOptions: {
                wrapper: window,
                content: document.documentElement,
                lerp: true, // Enable lerp
                duration: 1.2,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: smscroll,
                smoothTouch: false,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                normalizeWheel: true,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            },
            autoStart: false,
            scrollCallback: onScroll,
        });
    
        // Start LocomotiveScroll after a slight delay
        requestAnimationFrame(() => {
            setTimeout(() => {
                locoScroll.start();
            }, 1000);
        });
    });
    function onScroll($scope) {
        
        // btt button
        if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function($) {

        // Back to Top Button Visibility
        if ($('.back-to-top').length > 0) {
            $(window).scroll(function() {
                const backToTop = $('.back-to-top');
                const visibilityClass = 'active';
                if ($(this).scrollTop() > 300) {
                    backToTop.addClass(visibilityClass);
                } else {
                    backToTop.removeClass(visibilityClass);
                }
            });
        }

        // Fixed Menu Behavior
        function adjustHeaderOnScroll() {
            const scroll = $(window).scrollTop();
            const header = $('.main-header__inner');
            
            if ($(window).width() > 1023 && $('body').attr('data-menu') === 'fixed') {
                if (scroll > 50) {
                    header.addClass('move');
                } else {
                    header.removeClass('move');
                }
            } else {
                header.removeClass('move');
            }
        }

        // Run on page load and scroll
        adjustHeaderOnScroll();
        $(window).scroll(adjustHeaderOnScroll);
        $(window).resize(adjustHeaderOnScroll);

    });
} else {
    console.error('jQuery is required but not found.');
}

    }
    function titleOpacityWrap() {

        $(document).ready(function () {
  
          var controller = new ScrollMagic.Controller();
  
          $('.rts-has-mask-fill').each(function () {
            var words = $(this).text();
            var total = words;
            $(this).empty();
            $(this).append($("<span /> ").text(words));
          });
  
  
  
          $('.rts-has-mask-fill span').each(function () {
            var $this = $(this);
            var $thisHeight = $(this).height() * 2;
  
            var maskFillText = gsap.to($this, {
              duration: 1,
              backgroundSize: "200% 100%",
              ease: Linear.easeNone
            });
  
            var maskFillTextScene = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: 0.8,
                duration: $thisHeight
              })
              .setTween(maskFillText)
              .addTo(controller);
  
            if ($("body").hasClass("smooth-scroll")) {
              scrollbar.addListener(() => {
                maskFillTextScene.refresh()
              });
            }
          });
  
        })
    }
    function smoothScroll () {
        $(document).on('click', '.onepage .main-nav a[href^="#"]', function (event) {
          event.preventDefault();
      
          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
          }, 1500);
        });

        $(document).on('click', '.smooth-scroll-1', function (event) {
          event.preventDefault();
      
          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
          }, 1500);
        });
    }
    function ms_woo_quantity() {
      if ($.exists('.ms-quantity')) {
          $('body').on('click', '.button-plus, .button-minus', function(e) {
              const isNegative = $(e.target).closest('.button-minus').is('.button-minus');
              const input = $(e.target).closest('.ms-quantity').find('input');
              if (input.is('input')) {
                input[0][isNegative ? 'stepDown' : 'stepUp']();
                $('button[name="update_cart"]').prop('disabled', false);
              }
            });

      }
    }
    function ms_search_widget() {

      $('.header__search-icon').on('click', function() {
          $('.header__search-modal').toggleClass('modal--is-visible');
      });
      
      $(document).on('click', '.modal--is-visible', function(e) {
          if (e.target == this) {
              $('.header__search-modal').toggleClass('modal--is-visible');
          }
      });

      $('.header__search--close-btn').on('click', function() {
          $('.header__search-modal').toggleClass('modal--is-visible');
      });

  }
    // Header menu
    function ms_header_menu() {
      if ($.exists('.js-main-header__nav-trigger')) {
          var mainHeader = document.getElementsByClassName('js-main-header')[0];
          if( mainHeader ) {
              var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
                  nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
                  //detect click on nav trigger
                  trigger.addEventListener("click", function(event) {
                      event.preventDefault();
                      var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
                      //show nav and update button aria value
                      Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
                      trigger.setAttribute('aria-expanded', ariaExpanded);
                      if(ariaExpanded) { //opening menu -> move focus to first element inside nav
                          nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
                      }
                  });
          }
      }
      if ( $(window).width() > 1023 ){
        
          // Default Menu Style
          if ($.exists('.menu-default')) {
              var m_item = $('.navbar-nav').find(' > li.menu-item > a');

              $(m_item).each(function() {
                  $(this).html('<span>' + this.textContent + '</span>');
                  $(this).attr("title", this.textContent);
              });

              var menu_type = $("body").attr('data-menu');
              if (menu_type == 'fixed') {
                  var header = $(".main-header__layout").addClass('top');
                  $(window).scroll(function() {    
                      var scroll = $(window).scrollTop();
                  
                      if (scroll > 300) {
                          header.removeClass('top').addClass("action");
                      } else {
                          header.addClass('top').removeClass("action");
                      }
                  });
              }

          }

          $(window).scroll(function(){
              if ($(this).scrollTop() > 50) {
                $('.main-header').addClass('show-bg');
              } else {
                $('.main-header').removeClass('show-bg');
              }
          
          });

      }

  }
    // Mobile Menu
    function ms_menu_default_mobile() {

      if ($(window).width() < 1024) {
          $('.main-header__nav ').addClass('is_mobile');
      }

      var isAbove1024 = $(window).width() > 1024;
      $(window).on('resize', function(event){
          if( $(window).width() < 1077 && isAbove1024){
              isAbove1024 = false;
              $('.sub-menu').css('display', 'none');
              $('.main-header__nav ').addClass('is_mobile');
          }else if($(window).width() > 1077 && !isAbove1024){
              isAbove1024 = true;
              $('.sub-menu').css('display', 'block');
              $('.main-header__nav ').removeClass('is_mobile');
          }
      });

      $(document).on('click', '.is_mobile .navbar-nav > .menu-item-has-children > a', function(e) {
          e.preventDefault();
          if ($(this).hasClass('active')) {
              $(this).removeClass('active');
            $(this).siblings('.sub-menu').slideUp(100);
          } else {
              $('.menu-item-has-children > a').removeClass('active');
              $(this).addClass('active');
              $('.sub-menu').slideUp(200);
              $(this).siblings('.sub-menu').slideDown(100);
          }
        });

      
    }


    //set the height of the element before starting animation -> fix bug on Safari
     jarallax(document.querySelectorAll('.jarallax-img'), {
         speed: 0.7
     })

     jarallax(document.querySelectorAll('.footer-container'), {
         speed: 0.7
     })
     function videoActivation(e) {
        $(document).ready(function(){
          $('.popup-youtube, .popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });
        });
    }
    function isotopeActivation(e) {
        // isotop area

    $(document).ready(function(){

          
      var isotope = $(".main-isotop");

      if(isotope.length){
          var iso = new Isotope( '.filter', {
              itemSelector: '.element-item',
              layoutMode: 'fitRows'
            });
            
            // filter functions
            var filterFns = {
              // show if name ends with -ium
              ium: function( itemElem ) {
                var name = itemElem.querySelector('.name').textContent;
                return name.match( /ium$/ );
              }
            };
            
            // bind filter button click
            var filtersElem = document.querySelector('.filters-button-group');
            filtersElem.addEventListener( 'click', function( event ) {
              // only work with buttons
              if ( !matchesSelector( event.target, 'button' ) ) {
                return;
              }
              var filterValue = event.target.getAttribute('data-filter');
              // use matching filter function
              filterValue = filterFns[ filterValue ] || filterValue;
              iso.arrange({ filter: filterValue });
            });
            
            // change is-checked class on buttons
            var buttonGroups = document.querySelectorAll('.button-group');
            for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
              var buttonGroup = buttonGroups[i];
              radioButtonGroup( buttonGroup );
            }
            function radioButtonGroup( buttonGroup ) {
              buttonGroup.addEventListener( 'click', function( event ) {
                // only work with buttons
                if ( !matchesSelector( event.target, 'button' ) ) {
                  return;
                }
                buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                event.target.classList.add('is-checked');
              });
            }
      }

      if ($('.grid-masonary').length) {

          // image loaded portfolio init
          $('.grid-masonary').imagesLoaded(function() {
              $('.portfolio-filter').on('click', 'button', function() {
                  var filterValue = $(this).attr('data-filter');
                  $grid.isotope({
                      filter: filterValue
                  });
              });
              var $grid = $('.grid-masonary').isotope({
                  itemSelector: '.grid-item-p',
                  percentPosition: true,
                  masonry: {
                      columnWidth: '.grid-item-p',
                  }
              });
          });
      }
              
      // portfolio Filter
      $('.portfolio-filter button').on('click', function(event) {
          $(this).siblings('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
          event.preventDefault();
      });
      
      
  });

    }
    function ms_masonry_gallery(e) {
      $(document).ready(function() {
        var $grid = $('.ms-masonry-gallery').imagesLoaded(function() {
            $grid.isotope({
                itemSelector: '.grid-item-p',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item-p'
                }
            });
        });
    });
  
  }
  // Justified Gallery
$(document).ready(function () {
    var $scope = $('#galleryContainer');
});

function ms_lightbox($scope) {
  $(document).ready(function () {
    if ($('#galleryContainer').length > 0) {
        console.log('#galleryContainer is found, initializing gallery...');
        var $scope = $('#galleryContainer');

        if ($scope.length === 0) {
            console.error('No elements found for #galleryContainer');
        } else {
            console.log('Scope found:', $scope);
            ms_lightbox($scope);
        }
    } else {
        console.log('#galleryContainer not found on this page.');
    }
  });

  function ms_lightbox($scope) {
      if (!$scope || !$scope.find) {
          console.error('Invalid $scope provided');
          return;
      }

      console.log('Scope is valid:', $scope);

      var $el = $scope.find('.blockgallery');
      var $justified = $scope.find('.justified-gallery');

      if ($justified.length === 0) {
          console.error('No .justified-gallery elements found');
          return;
      } else {
          console.log('.justified-gallery found:', $justified);
      }

      var m = $justified.data('margins');
      var h = $justified.data('row-height');

      console.log('Margins:', m, 'Row Height:', h);

      $justified.justifiedGallery({
          rowHeight: h,
          margins: m,
          captions: false,
          border: 0,
          lastRow: 'nojustify'
      });

      if ($el.length === 0) {
          console.error('No .blockgallery elements found');
          return;
      } else {
          console.log('.blockgallery found:', $el);
      }

      $el.magnificPopup({
          delegate: '.mfp-img',
          mainClass: 'mfp-fade',
          tClose: 'Fechar (Esc)',
          tLoading: '',
          type: 'image',
          image: {
              titleSrc: function(item) {
                  return item.el.attr('title');
              }
          },
          gallery: {
              enabled: true,
              preload: [0, 2]
          },
          mainClass: 'mfp-zoom-in',
          removalDelay: 300, // delay removal by X to allow out-animation
          callbacks: {
              beforeOpen: function() {
                  $('#portfolio a').each(function() {
                      $(this).attr('alt', $(this).find('img').attr('alt'));
                  });
              },
              open: function() {
                  // overwrite default prev + next function. Add timeout for css3 crossfade animation
                  $.magnificPopup.instance.next = function() {
                      var self = this;
                      self.wrap.removeClass('mfp-image-loaded');
                      setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                  };
                  $.magnificPopup.instance.prev = function() {
                      var self = this;
                      self.wrap.removeClass('mfp-image-loaded');
                      setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                  };
              },
              imageLoadComplete: function() {
                  var self = this;
                  setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
              }
          }
      });
  }
}

    function gsapScrollingText () {
        $(document).ready(function () {
          let scrollingTextOne = document.getElementsByClassName('scrollingText');
          if (scrollingTextOne.length) {
            gsap.registerPlugin(ScrollTrigger);
            let tl2 = gsap.timeline();
            tl2.to(".scrollingText", {
              x: -1000,
              duration: 50,
              repeat: -1,
              ease: 'linear'
            })
            let tl = gsap.timeline();
            tl.to('.scrollingText', {
              xPercent: 5,
              scrollTrigger: {
                trigger: ".scrollingText",
                scrub: 1
              }
            })
          }
  
        });
        $(document).ready(function () {
            let scrollingTextTwo = document.getElementsByClassName('scrollingText-two');
            if (scrollingTextTwo.length) {
              gsap.registerPlugin(ScrollTrigger);
              let tl2 = gsap.timeline();
              tl2.to(".scrollingText-two", {
                x: 1000,
                duration: 50,
                repeat: -1,
                ease: 'linear'
              })
              let tl = gsap.timeline();
              tl.to('.scrollingText-two', {
                xPercent: 5,
                scrollTrigger: {
                  trigger: ".scrollingText-two",
                  scrub: 1
                }
              })
            }
    
          })
          $(document).ready(function () {
            let scrollingTextThree = document.getElementsByClassName('scrollingText-three');
            if (scrollingTextThree.length) {
              gsap.registerPlugin(ScrollTrigger);
              let tl2 = gsap.timeline();
              tl2.to(".scrollingText-three", {
                x: 1000,
                duration: 50,
                repeat: -1,
                ease: 'linear'
              })
              let tl = gsap.timeline();
              tl.to('.scrollingText-three', {
                xPercent: 5,
                scrollTrigger: {
                  trigger: ".scrollingText-three",
                  scrub: 1
                }
              })
            }
    
          })
          $(document).ready(function () {
            let scrollingTextFour = document.getElementsByClassName('scrollingText-four');
            if (scrollingTextFour.length) {
              gsap.registerPlugin(ScrollTrigger);
              let tl2 = gsap.timeline();
              tl2.to(".scrollingText-four", {
                x: -1000,
                duration: 50,
                repeat: 1,
                ease: 'linear'
              })
              let tl = gsap.timeline();
              tl.to('.scrollingText-four', {
                xPercent: -5,
                scrollTrigger: {
                  trigger: ".scrollingText-four",
                  scrub: 1
                }
              })
            }
    
          })
    }
    // Mokko menu button
    function ms_menu_mokko_button() {

      if ($('#primary-menu-button').find('.menu-title').length === 0) {
          $('#primary-menu-button').prepend('<li class="menu-title"><a>Menu</a></li>');
      }
  
      $(document).ready(function () {
          var el_wrap = $('.ms-menu-container'),
              el = $('#primary-menu-button'),
              el_child_link = el.find('.menu-item-has-children > a'),
              submenuClicked = '1',
              next_width = el.outerWidth(),
              next_height = el.outerHeight(),
              menu_open = false; // Initialize menu_open
  
          el.css({
              'width': next_width + 'px',
              'height': next_height + 'px'
          });
  
          // OPEN MENU
          $('.action-menu, .close-menu-bg').on('click', function () {
              menu_open = !menu_open;
              menuOpen(menu_open);
          });
  
          function menuOpen(menu_open) {
              if (menu_open) {
                  el.addClass('show');
                  $('.close-menu-bg').addClass('show');
                  $('.ms-menu-wrapper').addClass('open');
                  $('.action-menu').addClass('active');
              } else {
                  el.removeClass('show');
                  $('.close-menu-bg').removeClass('show');
                  $('.ms-menu-wrapper').removeClass('open');
                  $('.action-menu').removeClass('active');
              }
          }
  
          function menuIn(child) {
              $('.navbar-nav, .sub-menu').removeClass('show');
              child.children('.sub-menu').addClass('show');
              gsap.to(el_wrap, { width: next_width, height: next_height, ease: "power2.inOut" });
              gsap.to(el, { xPercent: '-=100', ease: "power2.inOut" });
          }
  
          el_child_link.on('click', function (e) {
              e.preventDefault();
              var child = $(this).parent(); // Corrected parent reference
              next_width = child.find('>.sub-menu').outerWidth();
              next_height = child.find('>.sub-menu').outerHeight();
              if (submenuClicked === '1') {
                  submenuClicked = '2';
              } else if (submenuClicked === '2') {
                  el = child.parent();
                  submenuClicked = '3';
              }
              menuIn(child);
          });
  
          // Back
          $('#primary-menu-button .sub-menu').prepend('<li class="menu-back"><a>Back</a></li>');
  
          var menu_back = $('.menu-back');
  
          menu_back.on('click', function (e) {
              e.preventDefault();
              var child_back = $(this);
              menuOut(child_back);
  
              if (submenuClicked === '1') {
                  submenuClicked = '2';
                  gsap.to(el, { xPercent: '+=100', ease: "power2.inOut" });
              } else if (submenuClicked === '2') {
                  submenuClicked = '1';
                  gsap.to('#primary-menu-button', { xPercent: '0', ease: "power2.inOut" });
              } else if (submenuClicked === '3') {
                  submenuClicked = '2';
                  gsap.to(el, { xPercent: '+=100', ease: "power2.inOut" });
                  el = $('#primary-menu-button');
              }
          });
  
          function menuOut(child_back) {
              var parent_back = child_back.parent();
              next_width = parent_back.parent('.menu-item').parent().outerWidth();
              next_height = parent_back.parent('.menu-item').parent().outerHeight();
              parent_back.removeClass('show');
              parent_back.parent().parent().addClass('show');
              parent_back.parent('.navbar-nav, .sub-menu').removeClass('show');
              parent_back.parent('.sub-menu').removeClass('show');
              gsap.to(el_wrap, { width: next_width, height: next_height, ease: "power2.inOut" });
          }
      });
    }
    // function ms_headline($scope) {
    //   document.addEventListener('DOMContentLoaded', () => {
    //     const splitLines = new SplitText('[split-lines]', { type: 'lines', linesClass: "split-line" });
    //     const splitChars = new SplitText('[split-chars]', { type: 'lines chars', linesClass: "split-line", charsClass: "split-char" });
    
    //     window.addEventListener('load', () => {
    //       gsap
    //         .timeline({
    //           defaults: {
    //             ease: 'none',
    //           },
    //         })
    //         .fromTo(".header-item", {
    //           scaleY: 0,
    //           opacity: 0
    //         }, {
    //           scaleY: 1,
    //           opacity: 1,
    //           ease: "sine.out",
    //           transformOrigin: "top",
    //           stagger: 0.1,
    //           duration: 0.4
    //         })
    //         .to(".header-slogan", {
    //           opacity: 1,
    //           duration: 0
    //         }, '<')
    //         .fromTo(".header-slogan .split-line", {
    //           scaleY: 0,
    //           opacity: 0
    //         }, {
    //           scaleY: 1,
    //           opacity: 1,
    //           ease: "sine.out",
    //           transformOrigin: "top",
    //           stagger: 0.05,
    //           duration: 0.4
    //         }, '<0.2')
    //         .fromTo(".header-menu", {
    //           scaleY: 0,
    //           opacity: 0
    //         }, {
    //           scaleY: 1,
    //           opacity: 1,
    //           ease: "sine.out",
    //           transformOrigin: "top",
    //           stagger: 0.1,
    //           duration: 0.4
    //         }, '<0.2')
    //         .to(".hero", {
    //           opacity: 1,
    //           duration: 0
    //         }, '<')
    //         .fromTo(".hero-title .split-char", {
    //           scaleY: 0,
    //           opacity: 0
    //         }, {
    //           scaleY: 1,
    //           opacity: 1,
    //           ease: "sine.out",
    //           transformOrigin: "top",
    //           stagger: 0.03,
    //           duration: 0.8
    //         }, '<')
    //         .call(() => {
    //           document.querySelector('body').classList.remove('overflow-hidden');
    //         });
    //     });
    
    //     gsap
    //       .timeline({
    //         defaults: {
    //           ease: 'none',
    //         },
    //         scrollTrigger: {
    //           trigger: ".hero",
    //           start: "top top",
    //           end: "bottom top+=10%",
    //           pin: true,
    //           scrub: true,
    //         },
    //       })
    //       .to('.hero-title', {
    //         y: '-10%',
    //         duration: 0.8,
    //         ease: "sine.out",
    //       }, '<')
    //       .fromTo(".hero-title .split-char", {
    //         scaleY: 0,
    //         opacity: 0
    //       }, {
    //         scaleY: 1,
    //         opacity: 1,
    //         ease: "sine.in",
    //         transformOrigin: "top",
    //         stagger: 0.03,
    //         duration: 0.5
    //       }, '<');
    //   });
    // }
  // Theme Mode
  function ms_theme_mode() {
    if ($.exists('.ms_theme_mode')) {
        var td = $("#theme-dark"),
            tl = $("#theme-light"),
            s = $("#switcher");

        // Initialize the theme based on local storage
        var savedTheme = localStorage.getItem('theme-mode');
        if (savedTheme) {
            $('body').attr('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                $(td).addClass('toggler--is-active');
                $(s).prop('checked', false);
            } else {
                $(tl).addClass('toggler--is-active');
                $(s).prop('checked', true);
            }
        }

        $(td).on("click", function(){
            $(tl).removeClass("toggler--is-active");
            $(s).prop('checked', false);
            $(this).addClass('toggler--is-active');
            $('body').attr('data-theme', 'dark');
            var theme = $('body').attr('data-theme');
            localStorage.setItem('theme-mode', theme);
        });

        $(tl).on("click", function(){
            $(td).removeClass("toggler--is-active");
            $(s).prop('checked', true);
            $(this).addClass('toggler--is-active');
            $('body').attr('data-theme', 'light');
            var theme = $('body').attr('data-theme');
            localStorage.setItem('theme-mode', theme);
        });

        $(s).on("click", function(){
            $(td).toggleClass("toggler--is-active");
            $(tl).toggleClass("toggler--is-active");
            var newTheme = $('body').attr('data-theme') == 'light' ? 'dark' : 'light';
            $('body').attr('data-theme', newTheme);
            localStorage.setItem('theme-mode', newTheme);
        });
    }
}

  document.addEventListener('DOMContentLoaded', function () {
    // Define the parallax effect function
    function initVideoParallax() {
        var video = document.getElementById('video');
        
        if (!video) {
            console.warn('Video element not found on this page.');
            return;
        }

        // Set the speed factor for the parallax effect
        var speedFactor = 0.5; // Adjust this value to control the speed of the parallax

        function handleScroll() {
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var translateY = scrollPos * speedFactor;

            // Apply the transform to create the parallax effect
            video.style.transform = 'translateY(' + translateY + 'px)';
        }

        // Attach the scroll event listener
        document.addEventListener('scroll', handleScroll);
    }

    // Initialize the parallax effect only if the video element exists
    initVideoParallax();
});
$(document).ready(function() {
  function ms_accordion_widget($scope) {
      if (!$scope || !$scope.length) {
          console.error('Invalid $scope:', $scope);
          return;
      }

      const el = $scope.find('.ms_accordion');
      if (!el.length) {
          console.error('No .ms_accordion element found');
          return;
      }

      const el_panel = el.find('.ms_ac_panel');
      const el_label = el_panel.find('.ms_ac--label');
      const groups = gsap.utils.toArray(el_panel);
      const menus = gsap.utils.toArray(el_label);
      const menuToggles = groups.map(createAnimation);

      menus.forEach((menu) => {
          menu.addEventListener("click", () => toggleMenu(menu));
      });

      function toggleMenu(clickedMenu) {
          menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
      }

      function createAnimation(element) {
          const menu = element.querySelector('.ms_ac--label');
          const box = element.querySelector('.ms_ac--content');
          const minusElement = element.querySelector('.accordion_icon--close');
          const plusElement = element.querySelector('.accordion_icon--open');

          if (!menu || !box || !plusElement) {
              console.error('Required elements not found in', element);
              return () => {}; // Return a no-op function
          }

          gsap.set(box, { height: "auto" });

          const hasSwitching = $('.switching').length > 0;
          const timeline = gsap.timeline()
              .from(box, { height: 0, duration: 0.5, ease: "power2.inOut" })
              .fromTo(
                  minusElement,
                  { autoAlpha: 0, ease: "none" },
                  { autoAlpha: hasSwitching ? 1 : 0, duration: 0.2, ease: "none" },
                  0
              )
              .fromTo(
                  plusElement,
                  { autoAlpha: 1, ease: "none" },
                  { autoAlpha: hasSwitching ? 0 : 1, duration: 0.2, rotation: hasSwitching ? 0 : "180_cw", ease: "none" },
                  0
              )
              .reverse();

          if (el.data('collapse') === "yes") {
              return function(clickedMenu) {
                  if (clickedMenu === menu) {
                      timeline.reversed(!timeline.reversed());
                  } else {
                      timeline.reverse();
                  }
              };
          } else {
              return function(clickedMenu) {
                  if (clickedMenu === menu) {
                      timeline.reversed(!timeline.reversed());
                  }
              };
          }
      }
  }

  // Ensure the script only runs if .ms_accordion elements exist
  if ($('.ms_accordion').length > 0) {
      ms_accordion_widget($('.ms_accordion').parent());
  } else {
      console.warn('No .ms_accordion element found on this page.');
  }
});
// Split text by lines and chars
document.addEventListener('DOMContentLoaded', function () {
  // Define Swiper initialization function
  function initSwiper() {
      var el_material = document.querySelector('.swiper.ms-slider-material');
      
      // Verify element is present
      if (!el_material) {
          console.warn('Swiper element not found on this page.');
          return;
      }

      // Extracting attributes with safe checks
      var centered = el_material.getAttribute('data-centered') === 'on';
      var autoplay = el_material.getAttribute('data-autoplay') === 'on';
      var wheel = el_material.getAttribute('data-mousewheel') === 'on';
      var simulateTouch = el_material.getAttribute('data-simulatetouch') === 'on';
      var loop = el_material.getAttribute('data-loop') === 'on';
      var delay = parseInt(el_material.getAttribute('data-delay')) || 3000;
      var slides = parseInt(el_material.getAttribute('data-spv')) || 1;
      var slides_t = parseInt(el_material.getAttribute('data-spv-t')) || slides;
      var slides_m = parseInt(el_material.getAttribute('data-spv-m')) || slides;
      var space = parseInt(el_material.getAttribute('data-space')) || 0;
      var space_t = parseInt(el_material.getAttribute('data-space-t')) || space;
      var space_m = parseInt(el_material.getAttribute('data-space-m')) || space;
      var speed = parseInt(el_material.getAttribute('data-speed')) || 300;
      var effect = el_material.getAttribute('data-effect');
      var modulesList = [];

      // Add EffectMaterial if specified and available
      if (effect === 'material' && typeof SwiperMaterial !== 'undefined') {
          modulesList.push(SwiperMaterial);
      }

      var swiper = new Swiper(el_material, {
          modules: modulesList,
          effect: effect,
          slidesPerView: slides,
          centeredSlides: centered,
          spaceBetween: space,
          speed: speed,
          autoplay: autoplay ? { delay: delay } : false,
          mousewheel: wheel,
          loop: true,
          simulateTouch: simulateTouch,
          navigation: {
              nextEl: '.ms-nav--next',
              prevEl: '.ms-nav--prev',
          },
          scrollbar: {
              el: '.swiper-scrollbar',
              hide: false,
              draggable: true,
          },
          parallax: true,
          breakpoints: {
              320: {
                  slidesPerView: 1,
                  spaceBetween: space_m,
              },
              576: {
                  slidesPerView: 1,
                  spaceBetween: space_m,
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: space_t,
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: space,
              },
          },
          on: {
              init: function () {
                  var activeSlide = document.querySelector('.swiper-slide-active .ms-sc--t');
                  if (activeSlide) {
                      var firstSlideChars = activeSlide.querySelectorAll('.char');
                      if (firstSlideChars.length) {
                          slideFirstInit(firstSlideChars);
                      }
                  }
              },
              slideChangeTransitionEnd: function () {
                  var activeSlide = document.querySelector('.swiper-slide-active');
                  if (activeSlide) {
                      var charsEnd = activeSlide.querySelectorAll('.ms-sc--t .char');
                      if (charsEnd.length) {
                          slideTitlesEnd(charsEnd);
                      }
                  }
              },
              slideChangeTransitionStart: function () {
                  var allTitles = document.querySelectorAll('.ms-sc--t');
                  if (allTitles.length) {
                      slideTitlesStart(allTitles);
                  }
              },
          },
      });

      swiper.init();
  }

  // Call the Swiper initialization function
  initSwiper();
});
function slideFirstInit(chars) {
  // Implement your animation initialization here
  console.log('slideFirstInit', chars);
}

function slideTitlesEnd(chars) {
  // Implement what happens when a slide transition ends here
  console.log('slideTitlesEnd', chars);
}

function slideTitlesStart(chars) {
  // Implement what happens when a slide transition starts here
  console.log('slideTitlesStart', chars);
}
document.addEventListener('DOMContentLoaded', function () {
  var widgets = document.querySelectorAll('.widget');

  function updateParallax() {
      var scrollPos = window.pageYOffset;

      widgets.forEach(function (widget) {
          var speed = parseFloat(widget.getAttribute('data-speed'));
          var translateY = scrollPos * speed;
          
          if (widget.classList.contains('mid')) {
              translateY = -translateY; // Invert direction for the middle column
          }
          
          widget.style.transform = 'translateY(' + translateY + 'px)';
      });
  }

  // Update parallax effect on scroll
  window.addEventListener('scroll', updateParallax);

  // Initial update
  updateParallax();
});
var filter_price = $('.filter-price');
	if (filter_price.length) {
		var lowerSlider = document.querySelector('#lower');
		var upperSlider = document.querySelector('#upper');

		document.querySelector('#two').value = upperSlider.value;
		document.querySelector('#one').value = lowerSlider.value;

		var lowerVal = parseInt(lowerSlider.value);
		var upperVal = parseInt(upperSlider.value);

		upperSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);

			if (upperVal < lowerVal + 4) {
				lowerSlider.value = upperVal - 4;
				if (lowerVal == lowerSlider.min) {
					upperSlider.value = 4;
				}
			}
			document.querySelector('#two').value = this.value
		};

		lowerSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);
			if (lowerVal > upperVal - 4) {
				upperSlider.value = lowerVal + 4;
				if (upperVal == upperSlider.max) {
					lowerSlider.value = parseInt(upperSlider.max) - 4;
				}
			}
			document.querySelector('#one').value = this.value
		};
	}

  document.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const footerContainer = document.querySelector('.footer-container');
    const parallaxSpeed = 0.5; // Adjust this value to change the speed of the parallax effect
    if (footerContainer) {
        footerContainer.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }
});

})(jQuery);

// Utill
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
        'isotope-layout/js/layout-mode'
      ],
      factory );
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      require('isotope-layout/js/layout-mode')
    );
  } else {
    // browser global
    factory(
      window.Isotope.LayoutMode
    );
  }

  }( window, function factory( LayoutMode ) {
  'use strict';

  var CellsByRow = LayoutMode.create( 'cellsByRow' );
  var proto = CellsByRow.prototype;

  proto._resetLayout = function() {
    // reset properties
    this.itemIndex = 0;
    // measurements
    this.getColumnWidth();
    this.getRowHeight();
    // set cols
    this.cols = Math.floor( this.isotope.size.innerWidth / this.columnWidth );
    this.cols = Math.max( this.cols, 1 );
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    var col = this.itemIndex % this.cols;
    var row = Math.floor( this.itemIndex / this.cols );
    // center item within cell
    var x = ( col + 0.5 ) * this.columnWidth - item.size.outerWidth / 2;
    var y = ( row + 0.5 ) * this.rowHeight - item.size.outerHeight / 2;
    this.itemIndex++;
    return { x: x, y: y };
  };

  proto._getContainerSize = function() {
    return {
      height: Math.ceil( this.itemIndex / this.cols ) * this.rowHeight
    };
  };

  return CellsByRow;

  }));

  // Utility function
  function Util () {};

  // class manipulation functions
Util.hasClass = function(el, className) {
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  if (el.classList) el.classList.add(classList[0]);
  else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  if (el.classList) el.classList.remove(classList[0]);  
  else if(Util.hasClass(el, classList[0])) {
      var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
      el.className=el.className.replace(reg, ' ');
  }
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
  };

Util.toggleClass = function(el, className, bool) {
  if(bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
  };

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
  }
};

  /* 
  DOM manipulation
  */
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
      childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
      if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
if(selector.nodeType){
  return elem === selector;
}

var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
  length = qa.length,
  returnArr = [];

while(length--){
  if(qa[length] === elem){
  return true;
  }
}

return false;
};

/* 
Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
var change = to - start,
  currentTime = null;

var animateHeight = function(timestamp){  
  if (!currentTime) currentTime = timestamp;         
  var progress = timestamp - currentTime;
  var val = parseInt((progress/duration)*change + start);
  element.style.height = val+"px";
  if(progress < duration) {
      window.requestAnimationFrame(animateHeight);
  } else {
  cb();
  }
};

//set the height of the element before starting animation -> fix bug on Safari
element.style.height = start+"px";
window.requestAnimationFrame(animateHeight);
};