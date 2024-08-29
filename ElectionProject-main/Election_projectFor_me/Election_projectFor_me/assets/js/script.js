
(function ($) {
  "use strict";

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // =======Sticky-header========>>>>>
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 120) {
      $(".sticky-navbar").removeClass("sticky");
    } else {
      $(".sticky-navbar").addClass("sticky");
    }
  });
  // =======Sticky-header========>>>>>



  $(window).on("load", function () {
    $(".preloader").delay(600).fadeOut("slow");
  });



  // =======Swiper .service-swiper========>>>>>
  if ($('.service-swiper').length > 0) {
    new Swiper(".service-swiper", {
      loop: true,      
      spaceBetween: 20,
      slidesPerGroup: 1,
      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        460: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1320: {
          slidesPerView: 4,
        }
      },
      pagination: {
        el: ".service-swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".progress-button-next",
        prevEl: ".progress-button-prev",
      },
    });
  }
  // =======Swiper .service-swiper========>>>>>


    // =======Swiper .politixySwiper========>>>>>
    if ($('.politixySwiper').length > 0) {
      new Swiper(".politixySwiper", {
        loop: true,
        spaceBetween: 20,
        breakpoints: {
          380: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20,
          }
        },
      });
    }
    // =======Swiper .politixySwiper========>>>>>


  // =======Swiper .shopswiper========>>>>>
  if ($('.shopSwiper').length > 0) {
    new Swiper(".shopSwiper", {
      loop: true,
      spaceBetween: 30,
      breakpoints: {
        380: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 30,
        }
      },
      navigation: {
        nextEl: ".shopSwiper-button-next",
        prevEl: ".shopSwiper-button-prev",
      },
    });
  }
  // =======Swiper .shopswiper========>>>>>


  // =======Swiper .testimonialSwiper========>>>>>
  if ($('.testimonialSwiper').length > 0){
    new Swiper(".testimonialSwiper", {
      loop: true,
      spaceBetween: 30,
      speed: 2000,
      navigation: {
        nextEl: ".politixySwiper-button-next",
        prevEl: ".politixySwiper-button-prev",
      },
    });
  } 
  // =======Swiper .testimonialSwiper========>>>>> 
     


    // =======Swiper .testimonialSwiper========>>>>>
    if ($('.testimonialSwiper2').length > 0){
      new Swiper(".testimonialSwiper2", {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          310: {
            slidesPerView: 1,
            spaceBetween: 20,
          },  

          769: {
            slidesPerView: 2,
            spaceBetween: 20,
          }          
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    } 
    // =======Swiper .testimonialSwiper========>>>>> 


    // =======Swiper .eventSwiper========>>>>>
    if ($('.eventSwiper').length > 0){
      new Swiper(".eventSwiper", {
        loop: false,
        spaceBetween: 30,
        navigation: {
          nextEl: ".politixySwiper-button-next",
          prevEl: ".politixySwiper-button-prev",
        },
      });
    } 
    // =======Swiper .testimonialSwiper========>>>>>



  // =======Magnific-PopUp========>>>>>   
  if ($('.image-link').length > 0){
    $('.image-link').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find('img');
        }
      }
    });
  } 
  // Video popup
  if ($('.video-popup').length > 0){
    $('.video-popup').magnificPopup({
      disableOn: 200,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }  
  // =======Magnific-PopUp========>>>>>


    /*====================
    Isotope--Portfolio
  =======================*/ 
  if($('.portfolio-isotope').length > 0){
    // init Isotope
    var $grid = $('.portfolio-isotope').isotope({
      itemSelector: '.portfolio-item',
      // layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    // bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });
  }
  /*====================
    Isotope--Portfolio
  =======================*/

  $(window).on('load', function(){
    if($('.button.is-checked')){
      $('.button.is-checked').trigger('click');
    }
  });  

  $(document).on('click', '.isotop-content', function(){
    if($('.button.is-checked')){
      $('.button.is-checked').trigger('click');
    }
  });

  
  // =======Comment-Reply========>>>>>
  window.addEventListener('DOMContentLoaded', function() {
    var ulElements = document.querySelectorAll('.comment-list-wrapper ul');
    var paddingIncrement = 70;

    ulElements.forEach(function(ul, index) {
      ul.style.paddingLeft = (index * paddingIncrement) + 'px';
    });
  });
 // =======Comment-Reply========>>>>>



if ($('#map').length > 0) {
  var map = L.map('map').setView([35.76428892315803, -40.45770338684278], 3);
  var locationsArray = [];

  function clickZoom(e) {
    map.setView(e.target.getLatLng(), 16);
  }

  $.each(politixyLocations, function(index, location) {
    // Create Marker
    var marker = L.marker(location.markerPoint, {
      title: location.title,
      className: "marker-usa"  // Class for the marker
    }).addTo(map);

    // Bind Popup
    marker.bindPopup(`<div class="card politixy-map-card"><div class="card-body">
                        <h5 class="card-title service-title">${location.title}</h5><p class="mb-0 fw-semibold">${location.subtitle}</p><p class="mb-0 small">${location.address}</p>                          
                      </div></div>`).on('click', clickZoom);

    // Store the location in the array
    locationsArray.push({ marker: marker, location: location });
  });


  L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Outside click event
  $(document).on('click', function(e) {
    var mapContainer = $('#map');
    var isClickInsideMap = mapContainer.has(e.target).length > 0 || mapContainer.is(e.target); 
   
  });
}
// =========Leaflet map=========>>>>>


new WOW().init();


// =======Swiper .testimonialSwiper========>>>>>
if ($('.heroSwiper').length > 0){
  new Swiper(".heroSwiper", {
    loop: true,
    speed:3000,
    autoplay: {
      delay: 4000,
    },    
    spaceBetween: 0,
    navigation: {
      nextEl: ".heroSwiper-button-next",
      prevEl: ".heroSwiper-button-prev",
    },
  });
} 
// =======Swiper .testimonialSwiper========>>>>>

// Get all li elements inside donate-lists
var items = document.querySelectorAll('.donate-lists li');

// Add click event listener to each li element
items.forEach(function(item) {
  item.addEventListener('click', function() {
    // Remove 'active' class from all li elements
    items.forEach(function(item) {
      item.classList.remove('active');
    });

    // Add 'active' class to the clicked li element
    this.classList.add('active');
  });
});

})(jQuery);


  // =================  Sending Mail =============
  $(document).on('submit', '#contactForm, #volunteerForm, #donateForm, #commentForm',function(e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    var responseDiv = form.find('.response');
    form.find('[type="submit"]').prop('disabled', true); 
    formData += '&id='+form.attr('id');
    responseDiv.html('<p>Working....</p>');
    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: formData,
      success: function(response) {
      var data = JSON.parse(response);
        if (data.error) {
          responseDiv.empty().html('<div class="alert alert-error">'+data.msg+'</div>');
          // You can add additional actions for success here
        } else {
          responseDiv.empty().html('<div class="alert alert-sucess">'+data.msg+'</div>');
          form.get(0).reset();
        }
        form.find('[type="submit"]').prop('disabled', false); 
      },
      error: function(error) {
        console.log('Error:', error);
        form.find('[type="submit"]').prop('disabled', false); 
      }
    });
  });
  // =================  Sending Mail =============




  // =================  Dropdown on Hover =============
  document.addEventListener("DOMContentLoaded", function () {
    // make it as accordion for smaller screens
    if (window.innerWidth > 992) {
        document.querySelectorAll('.hover-menu .nav-item.dropdown').forEach(function (everyitem) {
            everyitem.addEventListener('mouseover', function (e) {
                let el_link = this.querySelector('a[data-bs-toggle]');
                if (el_link !== null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    if (nextEl !== null && this.contains(nextEl)) {
                        nextEl.classList.add('show');
                    }
                }
            }.bind(everyitem)); // Explicitly bind the context to the current element
            everyitem.addEventListener('mouseleave', function (e) {
                let el_link = this.querySelector('a[data-bs-toggle]');
                if (el_link !== null) {
                    let nextEl = el_link.nextElementSibling;
                    if (nextEl !== null && this.contains(nextEl)) {
                        el_link.classList.remove('show');
                        nextEl.classList.remove('show');
                    }
                }
            }.bind(everyitem)); // Explicitly bind the context to the current element
        });
    }
    // end if innerWidth
  });
  // =================  Dropdown on Hover =============



  // =================  Back-To-Top =============
  if ($('.progressCounter').length > 0){
    $(".progressCounter").progressScroll();
    $(".progressCounter").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    $(document).ready(function() {
      var progressElements = $('.progressScroll');
      $(window).scroll(function() {
          // Check if the scroll position is greater than or equal to 50px
          if ($(this).scrollTop() >= 50) {
              // Add class 'progress-scroll-opacity-1' with smooth fadeIn animation
              progressElements.addClass('progress-scroll-opacity-1');
          } else {
              // Remove class 'progress-scroll-opacity-1' with smooth fadeOut animation
              progressElements.removeClass('progress-scroll-opacity-1');
          }
      });
    });
  }
  // =================  Back-To-Top =============