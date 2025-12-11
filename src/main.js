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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("contactPopup");
  const popupCloseBtn = document.getElementById("popupCloseBtn");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 기본 동작(페이지 이동) 막기

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // 이게 있어야 Formspree가 리다이렉트 안 함
        },
      });

      if (response.ok) {
        form.reset();
        popup.classList.add("is-visible");
      } else {
        alert("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      alert("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });

  if (popupCloseBtn) {
    popupCloseBtn.addEventListener("click", () => {
      popup.classList.remove("is-visible");
    });
  }

  // 검은 배경 클릭해도 닫히게
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("is-visible");
      }
    });
  }
});


