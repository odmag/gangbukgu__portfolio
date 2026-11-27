
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
    console.error("Series Lightbox 요소를 찾을 수 없습니다.");
    return;
  }

  let currentSeries = "";
  let curIndex = 0;
  let previousFocus = null;
  let previousOverflow = "";
  let touchStartX = null;
  let imageRequestId = 0;

  /***********************************
   * SERIES IMAGE LIST
   ***********************************/

  const seriesImages = {

    // LIFE : s1.JPG ~ s12.JPG
    life: Array.from(
      { length: 12 },
      (_, i) => `images/series/series1/s${i + 1}.JPG`
    ),

    // ONCE : a1.JPG ~ a12.JPG
    once: Array.from(
      { length: 12 },
      (_, i) => `images/series/series2/a${i + 1}.JPG`
    ),

    // LIFE2 : Coming soon
    life2: []

  };

  /***********************************
   * SERIES CLICK
   ***********************************/

  seriesItems.forEach(item => {

    const openSelectedSeries = () => {

      const selectedSeries = item.dataset.series;

      console.log("클릭한 시리즈:", selectedSeries);

      // LIFE2만 Coming soon
      if (selectedSeries === "life2") {
        alert("Coming soon");
        return;
      }

      // 등록되지 않은 시리즈 확인
      const images = seriesImages[selectedSeries];

      if (!Array.isArray(images) || images.length === 0) {
        console.error(
          "시리즈 이미지가 등록되지 않았습니다:",
          selectedSeries
        );
        return;
      }

      currentSeries = selectedSeries;
      curIndex = 0;

      openLightbox();

    };

    // 마우스 클릭
    item.addEventListener("click", openSelectedSeries);

    // 키보드 Enter / Space
    item.addEventListener("keydown", e => {

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSelectedSeries();
      }

    });

  });

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

    slbClose.blur();

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

    if (!Array.isArray(images) || images.length === 0) {
      return;
    }

    const imagePath = images[curIndex];

    if (!imagePath) {
      console.error("이미지 경로가 없습니다.");
      return;
    }

    const requestId = ++imageRequestId;

    // 사진 전환 페이드
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

      console.error(
        "이미지를 불러올 수 없습니다:",
        imagePath
      );

      slbImg.removeAttribute("src");
      slbImg.classList.remove("fade");

    };

    preload.src = imagePath;

    // 사진 번호
    if (slbCounter) {
      slbCounter.textContent =
        `${curIndex + 1} / ${images.length}`;
    }

  }

  /***********************************
   * PREVIOUS IMAGE
   ***********************************/

  function prevImg() {

    const images = seriesImages[currentSeries];

    if (!Array.isArray(images) || images.length === 0) {
      return;
    }

    curIndex =
      (curIndex - 1 + images.length) % images.length;

    loadImg();

  }

  /***********************************
   * NEXT IMAGE
   ***********************************/

  function nextImg() {

    const images = seriesImages[currentSeries];

    if (!Array.isArray(images) || images.length === 0) {
      return;
    }

    curIndex = (curIndex + 1) % images.length;

    loadImg();

  }

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

    // 라이트박스 안에서 Tab 이동
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
