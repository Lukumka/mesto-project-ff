// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
//кнопки поп-апа
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");
const closePopUpButton = addCardPopUp.querySelector(".popup__close");
const saveCardButton = addCardPopUp.querySelector(".popup__button");
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//открыть/закрыть попап
addCardButton.addEventListener("click", () => {
  addCardPopUp.classList.add("popup_is-opened");
});
closePopUpButton.addEventListener("click", () => {
  addCardPopUp.classList.remove("popup_is-opened");
});
//добавление новой  карточки
saveCardButton.addEventListener("click", () => {
  addCardPopUp.classList.remove("popup_is-opened");
  renderCard(generateCard(), deleteCard);
});
//функция создания новой карточки
function generateCard(newCard) {
  newCard = {};
  newCard.name = addCardPopUp.querySelector(
    ".popup__input_type_card-name"
  ).value;
  newCard.link = addCardPopUp.querySelector(".popup__input_type_url").value;
  return newCard;
}
//функция создания карточки
function createCard(card, onDelete) {
  const title = card.name;
  const image = card.link;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = image;
  cardElement.querySelector(".card__image").alt = `Изображение ${title}`;
  cardElement.querySelector(".card__title").textContent = title;
  onDelete(cardElement);
  return cardElement;
}
//функция рендера карточки
function renderCard(card) {
  cardsList.append(createCard(card, deleteCard));
}
//функция удаления карточки
function deleteCard(card) {
  card.querySelector(".card__delete-button").addEventListener("click", () => {
    card.remove();
  });
}

initialCards.forEach((card) => {
  renderCard(card, deleteCard);
});
