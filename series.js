/***********************************
 * SERIES LIGHTBOX
************************************/
const seriesItems = document.querySelectorAll(".seriesItem");
const slb = document.getElementById("seriesLightbox");
const slbImg = slb.querySelector(".slbImg");
const slbClose = slb.querySelector(".slbClose");
const slbPrev = slb.querySelector(".slbNav.prev");
const slbNext = slb.querySelector(".slbNav.next");

let currentSeries = "";
let curIndex = 0;

/* series별 이미지 배열 */
const seriesImages = {
  life: ["s1.JPG", "s2.JPG", "s3.JPG", "s4.JPG", "s5.JPG", "s6.JPG", "s7.JPG", "s8.JPG", "s9.JPG", "s10.JPG", "s11.JPG", "s12.JPG"],
  once: ['a1.JPG', 'a2.JPG', 'a3.JPG', 'a4.JPG', 'a5.JPG', 'a6.JPG', 'a7.JPG', 'a8.JPG', 'a9.JPG', 'a10.JPG', 'a11.JPG', 'a12.JPG']  
};

/************
 * OPEN
************/
seriesItems.forEach(item => {
  item.addEventListener("click", () => {
    currentSeries = item.dataset.series;

    if(currentSeries === "life2" || !seriesImages[currentSeries] || !seriesImages[currentSeries].length){
      alert("Coming soon");
      return;
    }

    curIndex = 0;
    openLightbox();
  });
});


function openLightbox(){
  loadImg();
  slb.classList.add("show");
  document.body.style.overflow = "hidden";
}


/************
 * CLOSE
************/
function closeLightbox(){
  slb.classList.remove("show");
  document.body.style.overflow = "";
}
slbClose.addEventListener("click", closeLightbox);

slb.addEventListener("click", e=>{
  if(e.target === slb) closeLightbox();
});

window.addEventListener("keydown", e=>{
  if(!slb.classList.contains("show")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") showPrev();
  if(e.key === "ArrowRight") showNext();
});


/************
 * LOAD
************/
function loadImg(){
  const files = seriesImages[currentSeries];

  const folder = currentSeries === "life" ? "series1" : "series2";

  slbImg.classList.add("fade");

  setTimeout(()=>{
    slbImg.onload = () => slbImg.classList.remove("fade");
    slbImg.src = `images/series/${folder}/${files[curIndex]}`;
  }, 200);
}

/************
 * NAV
************/
function showPrev(){
  const files = seriesImages[currentSeries];
  curIndex = (curIndex - 1 + files.length) % files.length;
  loadImg();
}
function showNext(){
  const files = seriesImages[currentSeries];
  curIndex = (curIndex + 1) % files.length;
  loadImg();
}
slbPrev.addEventListener("click", showPrev);
slbNext.addEventListener("click", showNext);


/************
 * SWIPE (mobile)
************/
let startX = 0;

slb.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});
slb.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 80) showNext();
  if(endX - startX > 80) showPrev();
});

