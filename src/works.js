/****************************************************
 * WORKS POPUP — (GANGBUKGU)
 * Works 페이지 전용 스크립트
 ****************************************************/

// 모든 .polaroid 카드
const cards = document.querySelectorAll(".polaroid");

// 카드 클릭 → 팝업 열기
cards.forEach((card) => {
  card.addEventListener("click", () => {

    // placeholder 카드 무시
    if (card.classList.contains("placeholder")) return;

    // data-target="#popup1" 같은 값
    const target = card.dataset.target;
    if (!target) return;

    const popup = document.querySelector(target);
    if (!popup) return;

    // 현재 이미지 초기화
    popup.dataset.current = "1";

    // 첫 이미지 표시
    updatePopupImage(popup);

    // 팝업 열기
    popup.classList.add("show");
  });
});

/****************************************************
 * 팝업 닫기 (X 버튼)
 ****************************************************/
document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const popup = btn.closest(".popup");
    popup.classList.remove("show");
  });
});

/****************************************************
 * 팝업 배경 클릭 시 닫기
 ****************************************************/
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("show");
  });
});

/****************************************************
 * NEXT / PREV — 이벤트 위임
 ****************************************************/
document.addEventListener("click", (e) => {
  // NEXT
  if (e.target.classList.contains("popup__next")) {
    const popup = e.target.closest(".popup");
    stepImage(popup, +1);
  }

  // PREV
  if (e.target.classList.contains("popup__prev")) {
    const popup = e.target.closest(".popup");
    stepImage(popup, -1);
  }
});

/****************************************************
 * HELPER FUNCTIONS
 ****************************************************/

// 이미지 총 개수 (data-total)
function getTotal(popup) {
  return Number(popup.dataset.total || "5");
}

// 폴더명 (data-folder)
function getFolder(popup) {
  return popup.dataset.folder || "modal1";
}

// 현재 이미지 index
function getCurrent(popup) {
  return Number(popup.dataset.current || "1");
}

// index 업데이트
function setCurrent(popup, val) {
  popup.dataset.current = String(val);
}

// 이미지 변경 + fade 효과
function updatePopupImage(popup) {
  const img = popup.querySelector(".popup__image");
  const folder = getFolder(popup);
  const idx = getCurrent(popup);

  if (!img) return;

  // fade-out
  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = `images/works/${folder}/no${idx}.JPG`;

    // 이미지 로드 후 fade-in
    img.onload = () => {
      img.classList.remove("fade-out");
    };
  }, 150);
}

// 다음/이전 이미지
function stepImage(popup, delta) {
  const total = getTotal(popup);
  let cur = getCurrent(popup) + delta;

  if (cur > total) cur = 1;
  if (cur < 1) cur = total;

  setCurrent(popup, cur);
  updatePopupImage(popup);
}
