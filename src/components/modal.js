// Открытие модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', handleEscClose);

}
// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleEscClose);

}

export function setModalWindowEventListeners(modal,func) {
  modal.addEventListener("click", (evt) => {
    handleClick(evt, modal, func);
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

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModal(activePopup);
  }
};
