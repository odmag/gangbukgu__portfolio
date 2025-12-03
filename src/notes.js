const noteData = {
  "note01": {
    title: "기억",
    date: "2024.04",
    body: `

    다락에 숨어 정오의 빛을 몰래 훔쳐보던 아이
    가만히 
    허수경 시인의 마지막 시나
    서태지의 새로운 노래를 처음 들었을 때

  `,
  },





  "note02": {
    title: "감정",
    date: "2024.09",
    body: ``,
  },




  
  "note03": {
    title: "아기로부터 노인에게로까지",
    date: "2024.12",
    body: `ㅇ`,
  }
};

noteData["note04"] = {
  title: "콘크리트",
  date: "2025.01",
  body: `

  고고학

  예술의 기능

`
};



const rows = document.querySelectorAll(".note__row");
const popup = document.getElementById("notePopup");
const popupClose = popup.querySelector(".notePopup__close");
const popupTitle = popup.querySelector(".notePopup__title");
const popupDate = popup.querySelector(".notePopup__date");
const popupBody = popup.querySelector(".notePopup__body");


rows.forEach(row => {
  row.addEventListener("click", () => {
    const key = row.dataset.note;
    const item = noteData[key];
    if (!item) return;

    popupTitle.textContent = item.title;
    popupDate.textContent = item.date;
    popupBody.textContent = item.body;

    popup.classList.add("show");
  });
});

popupClose.addEventListener("click", () => popup.classList.remove("show"));
popup.addEventListener("click", e => {
  if (e.target === popup) popup.classList.remove("show");
});
