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
  life: ["s1.JPG", "s2.JPG", "s3.JPG", "s4.JPG"],
  once: []  // placeholder
};

/************
 * OPEN
************/
seriesItems.forEach(item => {
  item.addEventListener("click", () => {
    currentSeries = item.dataset.series;

    if(currentSeries === "once" || !seriesImages[currentSeries].length){
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
  slbImg.classList.add("fade");
  setTimeout(()=>{
    slbImg.src = `images/series/series1/${files[curIndex]}`;
    slbImg.onload = ()=> slbImg.classList.remove("fade");
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

