function createCard(card, onDelete, onLike, openCard) {
  const title = card.name;
  const image = card.link;
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__image").src = image;
  cardImage.alt = `Изображение ${title}`;
  cardElement.querySelector(".card__title").textContent = title;
  cardImage.addEventListener("click", () => openCard(title, image));
  onDelete(cardElement);
  onLike(cardElement);
  return cardElement;
}

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export function renderCard(card, cardsConatiner, onDelete, onLike, openCard) {
  cardsConatiner.prepend(createCard(card, onDelete, onLike, openCard));
}

export function likeCard(card) {
  const like = card.querySelector(".card__like-button");
  like.addEventListener("click", () => {
    like.classList.toggle("card__like-button_is-active");
  });
}

export function deleteCard(card) {
  card.querySelector(".card__delete-button").addEventListener("click", () => {
    card.remove();
  });
}
