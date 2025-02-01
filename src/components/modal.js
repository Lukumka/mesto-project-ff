// Открытие модального окна

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleKeyPress);
}
// Закрытие модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  // document.removeEventListener("keydown", keyHandlerWrapper);
}
function handleKeyPress(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
    document.removeEventListener("keydown", handleKeyPress);
  }
}

export function setModalWindowEventListeners(modal) {
  modal.addEventListener("click", (evt) => {
    handleClick(evt, modal);
  });
}

function handleClick(event, modal) {
  if (event.target === modal) {
    closeModal(modal);
  }
  if (event.target.classList.contains("popup__close")) {
    closeModal(modal);
  }
}
