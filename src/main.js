document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("worksModal");
  const modalImg = document.querySelector(".works-modal__img");
  const modalTitle = document.querySelector(".works-modal__title");
  const modalDate = document.querySelector(".works-modal__date");
  const modalCaption = document.querySelector(".works-modal__caption");
  const modalDesc = document.querySelector(".works-modal__desc");
  const closeBtn = document.querySelector(".works-modal__close");

  document.querySelectorAll(".polaroid:not(.placeholder)").forEach((item) => {
    item.addEventListener("click", () => {

      // ✅ front 이미지 가져오기
      const frontImg = item.querySelector(".photo.front")?.src ||
                       item.querySelector(".photo.back")?.src ||
                       "";

      modalImg.src = frontImg;

      // ✅ data-title, data-desc, data-date, caption 사용
      modalTitle.textContent = item.dataset.title || "";
      modalDate.textContent = item.dataset.date || "";
      modalCaption.textContent = item.querySelector(".caption")?.innerText || "";
      modalDesc.textContent = item.dataset.desc || "";

      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
