// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
//кнопки поп-апа
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");
const closePopUpButton = addCardPopUp.querySelector(".popup__close");
const saveCardButton = addCardPopUp.querySelector(".popup__button");
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
let currentCards = initialCards;
cardsOnPage(currentCards);
// функция отображения карточки
function cardsOnPage(cards) {
  cards.forEach((object) => {
    const title = object.name;
    const image = object.link;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = image;
    cardElement.querySelector(".card__title").textContent = title;
    cardsList.append(cardElement);
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        cardElement.remove();
      });
  });
}
//открыть/закрыть попап
addCardButton.addEventListener("click", () => {
  addCardPopUp.classList.add("popup_is-opened");
});
closePopUpButton.addEventListener("click", () => {
  addCardPopUp.classList.remove("popup_is-opened");
});
//функция добавления карточки
saveCardButton.addEventListener("click", () => {
  const newCard = [];
  const cardData = {};
  cardData.name = addCardPopUp.querySelector(
    ".popup__input_type_card-name"
  ).value;
  cardData.link = addCardPopUp.querySelector(".popup__input_type_url").value;
  newCard.push(cardData);
  currentCards = currentCards.concat(newCard);
  addCardPopUp.classList.remove("popup_is-opened");
  cardsOnPage(newCard);
});
