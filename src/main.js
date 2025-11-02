/****************************
 * NAVBAR TOGGLE
 ****************************/
const togglebtn = document.querySelector(".navbar__togglebt");
const menu = document.querySelector(".navbar__menu");

togglebtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});



/****************************
 * POPUP OPEN / CLOSE
 ****************************/

const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");

// photo-frame 안의 no1 이미지 클릭 → 팝업 열기
const triggers = document.querySelectorAll(".photo__frame .no1");

triggers.forEach((img) => {
  img.addEventListener("click", () => {
    popup.classList.add("show");
  });
});

// X 클릭 → 팝업 닫기
popupClose.addEventListener("click", () => {
  popup.classList.remove("show");
});

// popup 배경 클릭 → 닫기
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("show");
  }
});
