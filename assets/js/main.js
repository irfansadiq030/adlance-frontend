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

const swiper = new Swiper(".swiper", {
  centeredSlides: true,
  loop: true,
  speed: 1100,

  // If we need pagination
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
    nextEl: ".left_arrow",
    prevEl: ".right_arrow",
  },
  autoplay: {
    delay: 2000,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      // spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // // when window width is >= 640px
    // 640: {
    //     slidesPerView: 3,
    //     spaceBetween: 40
    // },
    // when window width is >= 640px
    1060: {
      slidesPerView: 4,
      spaceBetween: 40,
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

swiper.on("slideChange", function () {
  slide_index = document.getElementById("slide_index");
  slide_index.innerHTML = swiper.realIndex + 1;
  // console.log(swiper.realIndex);
});

//===== PRELOADER
$("#newsletter_dropdown_btn").click(function (event) {
  event.preventDefault();
  $("#dropdown_options_container").toggleClass("d-none");
});

const selected_newsletter_purpose = (args) => {
  $("#newsletter_btn_txt").text(args);
  $("#dropdown_options_container").toggleClass("d-none");
  $("#newsletter_looking_for").val(args);
};

//===== AIOS-Initilization
 AOS.init({
   duration: 800,
 });
