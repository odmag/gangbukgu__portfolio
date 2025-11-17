/****************************
 * NAVBAR TOGGLE (모든 페이지 공통)
 ****************************/
const togglebtn = document.querySelector(".navbar__togglebt");
const menu = document.querySelector(".navbar__menu");

if (togglebtn) {
  togglebtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

/****************************
 * PAGE FADE-IN (옵션)
 ****************************/
// body.preload 클래스가 있을 경우 제거하며 페이드인
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

<script>
  const images = [
    'images/main_photo_1.JPG',
    'images/main_photo_2.JPG',
    'images/main_photo_3.JPG',
    'images/main_photo_4.JPG',
    'images/main_photo_5.JPG',
    'images/main_photo_6.JPG',
    'images/main_photo_7.JPG',
    'images/main_photo_8.JPG'
  ];

  // 모든 이미지 프리로드
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
</script>
