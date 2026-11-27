
/***********************************
 * SERIES LIGHTBOX
 * GANGBUKGU
 ***********************************/

document.addEventListener("DOMContentLoaded", () => {
  const seriesItems = document.querySelectorAll(".seriesItem");
  const slb = document.getElementById("seriesLightbox");

  if (!slb) return;

  const slbImg = slb.querySelector(".slbImg");
  const slbClose = slb.querySelector(".slbClose");
  const slbPrev = slb.querySelector(".slbNav.prev");
  const slbNext = slb.querySelector(".slbNav.next");
  const slbCounter = slb.querySelector(".slbCounter");

  if (!slbImg || !slbClose || !slbPrev || !slbNext) {
    console.error("라이트박스 요소를 찾을 수 없습니다.");
    return;
  }

  /***********************************
   * SERIES IMAGE LIST
   ***********************************/

  const seriesImages = {
    life: Array.from(
      { length: 12 },
      (_, i) => `images/series/series1/s${i + 1}.JPG`
    ),

    once: Array.from(
      { length: 12 },
      (_, i) => `images/series/series2/a${i + 1}.JPG`
    ),

    life2: []
  };

  let currentSeries = "";
  let curIndex = 0;
  let previousFocus = null;
  let previousOverflow = "";
  let touchStartX = null;
  let imageRequestId = 0;

  /***********************************
   * OPEN LIGHTBOX
   ***********************************/

  function openLightbox() {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;

    slb.classList.add("show");
    slb.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    loadImg();
    slbClose.focus();
  }

  /***********************************
   * CLOSE LIGHTBOX
   ***********************************/

  function closeLightbox() {
    if (!slb.classList.contains("show")) return;

    imageRequestId++;

    slb.classList.remove("show");
    slb.setAttribute("aria-hidden", "true");

    slbImg.classList.remove("fade");

    document.body.style.overflow = previousOverflow;

    if (
      previousFocus &&
      typeof previousFocus.focus === "function"
    ) {
      previousFocus.focus();
    }
  }

  /***********************************
   * LOAD IMAGE
   ***********************************/

  function loadImg() {
    const images = seriesImages[currentSeries];

    if (!images || images.length === 0) return;

    const imagePath = images[curIndex];
    const requestId = ++imageRequestId;

    slbImg.classList.add("fade");

    const preload = new Image();

    preload.onload = () => {
      if (requestId !== imageRequestId) return;

      slbImg.src = imagePath;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (requestId === imageRequestId) {
            slbImg.classList.remove("fade");
          }
        });
      });
    };

    preload.onerror = () => {
      if (requestId !== imageRequestId) return;

      console.error("이미지 로드 실패:", imagePath);

      slbImg.removeAttribute("src");
      slbImg.classList.remove("fade");
    };

    preload.src = imagePath;

    if (slbCounter) {
      slbCounter.textContent =
        `${curIndex + 1} / ${images.length}`;
    }
  }

  /***********************************
   * PREVIOUS / NEXT IMAGE
   ***********************************/

  function prevImg() {
    const images = seriesImages[currentSeries];

    if (!images || images.length === 0) return;

    curIndex =
      (curIndex - 1 + images.length) % images.length;

    loadImg();
  }

  function nextImg() {
    const images = seriesImages[currentSeries];

    if (!images || images.length === 0) return;

    curIndex = (curIndex + 1) % images.length;

    loadImg();
  }

  /***********************************
   * SERIES CLICK
   ***********************************/

  seriesItems.forEach(item => {
    function openSelectedSeries() {
      const selectedSeries = item.dataset.series;

      if (selectedSeries === "life2") {
        alert("Coming soon");
        return;
      }

      const images = seriesImages[selectedSeries];

      if (!images || images.length === 0) {
        console.error(
          "등록되지 않은 시리즈:",
          selectedSeries
        );
        return;
      }

      currentSeries = selectedSeries;
      curIndex = 0;

      openLightbox();
    }

    item.addEventListener("click", openSelectedSeries);

    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSelectedSeries();
      }
    });
  });

  /***********************************
   * BUTTON EVENTS
   ***********************************/

  slbClose.addEventListener("click", closeLightbox);
  slbPrev.addEventListener("click", prevImg);
  slbNext.addEventListener("click", nextImg);

  /***********************************
   * CLICK OUTSIDE IMAGE
   ***********************************/

  slb.addEventListener("click", e => {
    if (e.target === slb) {
      closeLightbox();
    }
  });

  /***********************************
   * KEYBOARD CONTROLS
   ***********************************/

  document.addEventListener("keydown", e => {
    if (!slb.classList.contains("show")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevImg();
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImg();
    }

    if (e.key === "Tab") {
      const controls = [slbClose, slbPrev, slbNext];
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        document.activeElement === last
      ) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /***********************************
   * MOBILE TOUCH SWIPE
   ***********************************/

  slb.addEventListener(
    "touchstart",
    e => {
      if (!slb.classList.contains("show")) return;

      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slb.addEventListener(
    "touchend",
    e => {
      if (
        !slb.classList.contains("show") ||
        touchStartX === null
      ) {
        return;
      }

      const touchEndX = e.changedTouches[0].screenX;
      const difference = touchEndX - touchStartX;

      touchStartX = null;

      if (Math.abs(difference) < 50) return;

      if (difference > 0) {
        prevImg();
      } else {
        nextImg();
      }
    },
    { passive: true }
  );
});
