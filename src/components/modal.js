// Открытие модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const clickHandlerWrapper = (evt) => clickHandler(evt, popup);
  popup.clickHandler = clickHandlerWrapper;
  popup.addEventListener("click", clickHandlerWrapper);

  const keyHandlerWrapper = (evt) => keyHandler(evt, popup);
  popup.keyHandler = keyHandlerWrapper;
  document.addEventListener("keydown", keyHandlerWrapper);
}

// Закрытие модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Обработчик кликов
function clickHandler(event, modal) {
  if (event.target === modal) {
    closeModal(modal);
  }
  if (event.target.classList.contains("popup__close")) {
    closeModal(modal);
    document.querySelectorAll("input").forEach((element) => {
      element.value = "";
    });
  }
}

// Обработчик клавиши Escape
function keyHandler(event, modal) {
  if (event.key === "Escape") {
    closeModal(modal);
  }
}
