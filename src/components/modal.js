// Открытие модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
}
// Закрытие модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleKeyPress);
}

export function setModalWindowEventListeners(modal,func) {
  modal.addEventListener("click", (evt) => {
    handleClick(evt, modal, func);
  });
  document.addEventListener("keydown", (evt) => {
    handleKeyPress(evt, modal, func);
  });
}

function handleClick(event, modal,func) {
  if (event.target === modal) {
    closeModal(modal);
  }
  if (event.target.classList.contains("popup__close")) {
    func(modal);
    closeModal(modal);
  }
}

function handleKeyPress(event,modal,func) {
  if (event.key === "Escape") {
    func(modal);
    closeModal(modal);
  }
}
