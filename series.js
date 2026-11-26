
/***********************************
 * SERIES LIGHTBOX
************************************/
const seriesItems = document.querySelectorAll(".seriesItem");
const slb = document.getElementById("seriesLightbox");

if (slb) {
  const slbImg = slb.querySelector(".slbImg");
  const slbClose = slb.querySelector(".slbClose");
  const slbPrev = slb.querySelector(".slbNav.prev");
  const slbNext = slb.querySelector(".slbNav.next");

  let currentSeries = "";
  let curIndex = 0;

  /* 시리즈별 이미지 배열과 폴더 경로 */
  const seriesImages = {
    life: {
      folder: "series1",
      files: [
        "s1.JPG", "s2.JPG", "s3.JPG", "s4.JPG",
        "s5.JPG", "s6.JPG", "s7.JPG", "s8.JPG",
        "s9.JPG", "s10.JPG", "s11.JPG", "s12.JPG"
      ]
    },

    once: {
      folder: "series2",
      files: [
        "a1.JPG", "a2.JPG", "a3.JPG", "a4.JPG",
        "a5.JPG", "a6.JPG", "a7.JPG", "a8.JPG",
        "a9.JPG", "a10.JPG", "a11.JPG", "a12.JPG"
      ]
    }
  };

  /************
   * OPEN
  ************/
  seriesItems.forEach(item => {
    item.addEventListener("click", () => {
      currentSeries = item.dataset.series;

      if (!seriesImages[currentSeries]) {
        alert("Coming soon");
        return;
      }

      curIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    loadImg();
    slb.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  /************
   * CLOSE
  ************/
  function closeLightbox() {
    slb.classList.remove("show");
    document.body.style.overflow = "";
  }

  slbClose.addEventListener("click", closeLightbox);

  slb.addEventListener("click", e => {
    if (e.target === slb) closeLightbox();
  });

  window.addEventListener("keydown", e => {
    if (!slb.classList.contains("show")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  /************
   * LOAD
  ************/
  function loadImg() {
    const series = seriesImages[currentSeries];
    const file = series.files[curIndex];

    slbImg.classList.add("fade");

    setTimeout(() => {
      slbImg.onload = () => {
        slbImg.classList.remove("fade");
      };

      slbImg.onerror = () => {
        console.error("이미지를 불러오지 못했습니다:", slbImg.src);
        slbImg.classList.remove("fade");
      };

      slbImg.src = `images/series/${series.folder}/${file}`;
    }, 200);
  }

  /************
   * NAV
  ************/
  function showPrev() {
    const files = seriesImages[currentSeries].files;
    curIndex = (curIndex - 1 + files.length) % files.length;
    loadImg();
  }

  function showNext() {
    const files = seriesImages[currentSeries].files;
    curIndex = (curIndex + 1) % files.length;
    loadImg();
  }

  slbPrev.addEventListener("click", showPrev);
  slbNext.addEventListener("click", showNext);

  /************
   * SWIPE (mobile)
  ************/
  let startX = 0;

  slb.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slb.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 80) showNext();
    if (endX - startX > 80) showPrev();
  });
}
