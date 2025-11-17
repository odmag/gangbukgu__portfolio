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
