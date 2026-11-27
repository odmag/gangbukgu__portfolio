
"use strict";

(() => {

  const lightbox = document.getElementById("seriesLightbox");

  if (!lightbox) return;

  const image = lightbox.querySelector(".slbImg");
  const closeButton = lightbox.querySelector(".slbClose");
  const prevButton = lightbox.querySelector(".slbNav.prev");
  const nextButton = lightbox.querySelector(".slbNav.next");
  const counter = lightbox.querySelector(".slbCounter");


  /* =====================================
     SERIES IMAGE PATHS
  ===================================== */


const seriesImages = {

  // LIFE
  life: Array.from(
    { length: 12 },
    (_, i) => `images/series/series1/s${i + 1}.JPG`
  ),

  // ONCE
  once: Array.from(
    { length: 12 },
    (_, i) => `images/series/series2/a${i + 1}.JPG`
  ),

  // LIFE2
  life2: []

};



  /* =====================================
     STATE
  ===================================== */

  let currentImages = [];
  let currentIndex = 0;

  let lastTrigger = null;
  let touchStartX = null;
  let requestId = 0;


  /* =====================================
     SHOW IMAGE
  ===================================== */

  function showImage() {

    if (!currentImages.length) return;

    const id = ++requestId;
    const url = currentImages[currentIndex];

    image.classList.add("fade");

    counter.textContent =
      `${currentIndex + 1} / ${currentImages.length}`;

    const preloader = new Image();

    preloader.onload = () => {

      if (id !== requestId) return;

      image.src = url;

      image.alt =
        `시리즈 작품 사진 ${currentIndex + 1}`;

      image.classList.remove("fade");

    };

    preloader.onerror = () => {

      if (id !== requestId) return;

      image.removeAttribute("src");

      image.alt =
        `이미지를 불러올 수 없습니다: ${url}`;

      image.classList.remove("fade");

      console.error("Series image not found:", url);

    };

    preloader.src = url;

  }


  /* =====================================
     OPEN SERIES
  ===================================== */

  function openSeries(key, trigger) {

    const files = seriesImages[key];

    if (!files || files.length === 0) {

      window.alert("Coming soon");
      return;

    }

    lastTrigger = trigger;

    currentImages = files;
    currentIndex = 0;

    lightbox.classList.add("show");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    showImage();

    closeButton.focus();

  }


  /* =====================================
     CHANGE IMAGE
  ===================================== */

  function changeImage(direction) {

    if (
      !lightbox.classList.contains("show") ||
      !currentImages.length
    ) return;

    currentIndex =
      (currentIndex + direction + currentImages.length)
      % currentImages.length;

    showImage();

  }


  /* =====================================
     CLOSE SERIES
  ===================================== */

  function closeSeries() {

    if (!lightbox.classList.contains("show")) return;

    ++requestId;

    lightbox.classList.remove("show");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    image.removeAttribute("src");

    if (lastTrigger) {
      lastTrigger.focus();
    }

  }


  /* =====================================
     SERIES CLICK
  ===================================== */

  document
    .querySelectorAll(".seriesItem[data-series]")
    .forEach(item => {

      item.addEventListener("click", () => {

        openSeries(item.dataset.series, item);

      });

      item.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openSeries(item.dataset.series, item);

        }

      });

    });


  /* =====================================
     ARROW BUTTONS
  ===================================== */

  prevButton.addEventListener("click", event => {

    event.stopPropagation();
    changeImage(-1);

  });

  nextButton.addEventListener("click", event => {

    event.stopPropagation();
    changeImage(1);

  });


  /* =====================================
     CLOSE BUTTON
  ===================================== */

  closeButton.addEventListener("click", closeSeries);

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeSeries();
    }

  });


  /* =====================================
     KEYBOARD
  ===================================== */

  document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {

      closeSeries();

    } else if (event.key === "ArrowLeft") {

      event.preventDefault();
      changeImage(-1);

    } else if (event.key === "ArrowRight") {

      event.preventDefault();
      changeImage(1);

    }

  });


  /* =====================================
     MOBILE SWIPE
  ===================================== */

  lightbox.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0]?.screenX ?? null;

    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    event => {

      if (touchStartX === null) return;

      const endX =
        event.changedTouches[0]?.screenX;

      if (endX === undefined) return;

      const delta = endX - touchStartX;

      touchStartX = null;

      if (Math.abs(delta) > 50) {

        changeImage(delta < 0 ? 1 : -1);

      }

    },
    { passive: true }
  );

})();
