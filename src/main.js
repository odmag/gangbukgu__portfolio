/****************************
 * NAVBAR TOGGLE
 ****************************/
const togglebtn = document.querySelector(".navbar__togglebt");
const menu = document.querySelector(".navbar__menu");

togglebtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});



/****************************************************
 * POPUP (여러 팝업 개별 대응)
 * - .polaroid 클릭 → data-target에 지정된 팝업 열기
 * - 팝업은 여러 개 존재 가능 (#popup1, #popup2, ...)
 * - 팝업 내부 이미지/텍스트/next/prev는 각 팝업 기준 동작
 ****************************************************/

// 1) 갤러리 카드 선택
const cards = document.querySelectorAll(".polaroid");

cards.forEach((card) => {
  card.addEventListener("click", () => {

    // placeholder는 무시
    if (card.classList.contains("placeholder")) return;

    // data-target="#popup1" 또는 "#popup2" … 형태
    const target = card.dataset.target;
    if (!target) return;

    const popup = document.querySelector(target);
    if (!popup) return;

    // 팝업이 처음 열릴 때 "현재 이미지 = 1" 로 초기화
    popup.dataset.current = "1";

    // 팝업에 첫 이미지 표시
    updatePopupImage(popup);

    // 팝업 열기
    popup.classList.add("show");
  });
});



/****************************************************
 * 팝업 닫기
 ****************************************************/

// 2) 닫기(X) 버튼 클릭 → 해당 팝업만 닫기
document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();   // 클릭 이벤트가 부모로 전달되지 않도록
    const popup = btn.closest(".popup");
    popup.classList.remove("show");
  });
});

// 3) popup 배경 클릭 → 닫기
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    // 배경 클릭 시만 닫기
    if (e.target === popup) popup.classList.remove("show");
  });
});



/****************************************************
 * Popup Slide: NEXT / PREV
 * 팝업 여러 개가 있을 수 있으므로
 *   → document 전체에 event delegation 사용
 ****************************************************/
document.addEventListener("click", (e) => {
  // NEXT 버튼
  if (e.target.classList.contains("popup__next")) {
    const popup = e.target.closest(".popup");
    stepImage(popup, +1);
  }

  // PREV 버튼
  if (e.target.classList.contains("popup__prev")) {
    const popup = e.target.closest(".popup");
    stepImage(popup, -1);
  }
});



/****************************************************
 * Helper functions
 ****************************************************/

// 작품별 이미지 총 개수를 data-total로 관리
function getTotal(popup) {
  return Number(popup.dataset.total || "5");
}

// 작품별 이미지 폴더 이름 (data-folder)
function getFolder(popup) {
  return popup.dataset.folder || "modal1";
}

// 현재 이미지 index
function getCurrent(popup) {
  return Number(popup.dataset.current || "1");
}

// index 갱신
function setCurrent(popup, val) {
  popup.dataset.current = String(val);
}



// ✅ 팝업 이미지 변경 (+ fade 효과)
function updatePopupImage(popup) {
  const img = popup.querySelector(".popup__image");
  const folder = getFolder(popup);
  const idx = getCurrent(popup);

  if (!img) return;

  // fade-out
  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = `images/works/${folder}/no${idx}.JPG`;

    img.onload = () => {
      img.classList.remove("fade-out"); // fade-in
    };
  }, 180);
}



// ✅ 다음 / 이전
function stepImage(popup, delta) {
  const total = getTotal(popup);
  let cur = getCurrent(popup) + delta;

  if (cur > total) cur = 1;
  if (cur < 1) cur = total;

  setCurrent(popup, cur);
  updatePopupImage(popup);
}
