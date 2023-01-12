//===== CURSOR
var cursor = {
  delay: 6,
  _x: 0,
  _y: 0,
  endX: window.innerWidth / 2,
  endY: window.innerHeight / 2,
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector(".cursor-dot"),
  $outline: document.querySelector(".cursor-dot-outline"),
  init: function () {
    // Set up element sizes
    this.dotSize = this.$dot.offsetWidth;
    this.outlineSize = this.$outline.offsetWidth;

    this.setupEventListeners();
    this.animateDotOutline();
  },
  setupEventListeners: function () {
    var self = this;

    // Anchor hovering
    document.querySelectorAll("a").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      el.addEventListener("mouseout", function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });
    });

    // Click events
    document.addEventListener("mousedown", function () {
      self.cursorEnlarged = true;
      self.toggleCursorSize();
    });
    document.addEventListener("mouseup", function () {
      self.cursorEnlarged = false;
      self.toggleCursorSize();
    });

    document.addEventListener("mousemove", function (e) {
      // Show the cursor
      self.cursorVisible = true;
      self.toggleCursorVisibility();

      // Position the dot
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + "px";
      self.$dot.style.left = self.endX + "px";
    });

    // Hide/show cursor
    document.addEventListener("mouseenter", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    });

    document.addEventListener("mouseleave", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    });
  },

  animateDotOutline: function () {
    var self = this;

    self._x += (self.endX - self._x) / self.delay;
    self._y += (self.endY - self._y) / self.delay;
    self.$outline.style.top = self._y + "px";
    self.$outline.style.left = self._x + "px";

    requestAnimationFrame(this.animateDotOutline.bind(self));
  },

  toggleCursorSize: function () {
    var self = this;

    if (self.cursorEnlarged) {
      self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(2.5)";
    } else {
      self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
    }
  },

  toggleCursorVisibility: function () {
    var self = this;

    if (self.cursorVisible) {
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    } else {
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    }
  },
};
cursor.init();

//===== CURSOR END

//===== Web Page Scrollbar progress calculate -START
$(document).ready(function () {
  $(document).scroll(function () {
    var totalHeight = $("#pagepiling").height();
    // $(".nav_border").css("width", totalHeight+'%');
    alert(totalHeight);
    var currentScroll = $(window).scrollTop();
    var percentageScrolled =
      ((totalHeight - currentScroll) / totalHeight) * 100;
    console.log(percentageScrolled + "%");
  });
});
//===== Web Page Scrollbar progress calculate -END

//===== CLIENTS SLIDER - START
const clientsSlider = new Swiper(".swiper", {
  centeredSlides: true,
  loop: true,
  speed: 1100,
  simulateTouch: true,
  //pagination
  pagination: {
    el: ".custom_pagination",
    clickable: true,
    // bulletElement: '.pagination_dots',
    bulletClass: "pagination_dots",
    bulletActiveClass: "active_pagination_dot",
    renderBullet: function (index, className) {
      return `<div class="pagination_dots"></div>`;
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".right_arrow",
    prevEl: ".left_arrow",
  },
  autoplay: {
    delay: 1000,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.6,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    // when window width is >= 700px
    700: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    // when window width is >= 850px
    850: {
      slidesPerView: 3.5,
      spaceBetween: 15,
    },
    // when window width is >= 640px
    1060: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1360: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    initialSlide: 1,
    on: {
      init: function () {
        slide_index = document.getElementById("slide_index");
        slide_index.innerHTML = activeIndex;
      },
    },
  },
});

clientsSlider.on("slideChange", function () {
  slide_index = document.getElementById("slide_index");
  slide_index.innerHTML = clientsSlider.realIndex + 1;
});

//===== CLIENTS SLIDER - END

//===== FOOTER NEWSLETTER SUBMIT BUTTON DROPDOWN
$("#newsletter_dropdown_btn").click(function (event) {
  event.preventDefault();
  $("#dropdown_options_container").toggleClass("d-none");
});

const selected_newsletter_purpose = (args) => {
  $("#newsletter_btn_txt").text(args);
  $("#dropdown_options_container").toggleClass("d-none");
  $("#newsletter_looking_for").val(args);
};

//===== PAGE SCROLLING EFFECT - START

$(document).ready(function () {
  $("#pagepiling").pagepiling({
    navigation: false,
    loop: false,
    // easing: "swing",
    scrollingSpeed: 700,
    // onLeave: function (index, nextIndex, direction) {
    //   if (index === 4 && direction === "down") {
    //     $(".side_header").fadeOut(700);
    //   } else {
    //     $(".side_header").fadeIn(700);
    //   }
    // },
  });
});

//===== PAGE SCROLLING EFFECT - END

//===== HAMBURGER CLICK Animation EFFECT - START

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
});

//===== HAMBURGER CLICK Animation EFFECT - END

//===== MOBILE NAVBAR Animation EFFECT - START

const ham = document.querySelector(".hamburger");
const menu = document.querySelector("#nav_container");
const links = document.querySelectorAll(".mobile_nav_links");

let tl = gsap.timeline({ paused: true });

tl.to(menu, {
  duration: 0.4,
  opacity: 1,
  minHeight: "275px",
  top: 70,
  // ease: "expo.inOut",
});
tl.from(
  links,
  {
    duration: 0.4,
    opacity: 0,
    y: -25,
    stagger: 0.2,
    // ease: "expo.inOut",
  },
  "-=0.5"
);

tl.reverse();

ham.addEventListener("click", () => {
  tl.reversed(!tl.reversed());
});

$(document).click(function () {
  // tl.reversed(!tl.reversed());
});

//===== MOBILE NAVBAR Animation EFFECT - END

//===== MOBILE FEATURED CAMPAIGNS SLIDER -START

const adlanceMobileFeaturedSlider = new Swiper(
  ".mobile_featured_campaigns_slider",
  {
    // init: true,
    // loop: true,
    initialSlide: 2,
    speed: 800,
    navigation: {
      nextEl: ".pre_btn_mobile_fc",
      prevEl: ".next_btn_mobile_fc",
    },
    // slidesPerView: 2.5, // or 'auto'
    // spaceBetween: 30,
    slidesPerView: "auto",
    centeredSlides: true,
    // scale: 1.5,
    effect: "coverflow", // 'cube', 'fade', 'coverflow',
    coverflowEffect: {
      rotate: 0, // Slide rotate in degrees
      stretch: 0, // Stretch space between slides (in px)
      depth: 170, // Depth offset in px (slides translate in Z axis)
      modifier: 1, // Effect multipler
      //   slideShadows: true, // Enables slides shadows
      scale: 1,
    },
    grabCursor: true,
    parallax: true,
    breakpoints: {
      500: {
        // slidesPerView: "auto",
        spaceBetween: 0,
        // scale:2.5
      },
      1400: {
        slidesPerView: 3.5,
        spaceBetween: 0,
      },
    },
    on: {
      transitionStart: function () {
        var activeIndex = this.activeIndex;
        var slides = this.slides;

        slides.forEach(function (slide, index) {
          if (index === activeIndex) {
            // slide.style.width = "250px";
            slide.style.opacity = "1";
            // console.log(slide)
          } else {
            // slide.style.width = "100%";
          }
        });
      },
    },
  }
);

adlanceMobileFeaturedSlider.init();

//===== MOBILE FEATURED CAMPAIGNS SLIDER -END

//===== MOBILE STORIES SLIDER -START

const storiesSwiper = new Swiper(".mobile_stories_slider", {
  centeredSlides: true,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 1000,
  },
  delay: 1000,
  //pagination
  pagination: {
    el: ".custom_pagination",
    clickable: true,
    // bulletElement: '.pagination_dots',
    bulletClass: "pagination_dots",
    bulletActiveClass: "active_pagination_dot",
    renderBullet: function (index, className) {
      return `<div class="pagination_dots"></div>`;
    },
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
  },
});

storiesSwiper.on("slideChange", function () {
  storiesSlide_index = document.getElementById("storiesSlide_index");
  storiesSlide_index.innerHTML = storiesSwiper.realIndex + 1;
  // console.log(swiper.realIndex);
});

//===== MOBILE STORIES SLIDER -END
