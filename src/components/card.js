function createCard(card, onDelete, onLike, showImg, openModal) {
  const title = card.name;
  const image = card.link;
  const cardElement = getTemplate();
  cardElement.querySelector(".card__image").src = image;
  cardElement.querySelector(".card__image").alt = `Изображение ${title}`;
  cardElement.querySelector(".card__title").textContent = title;
  onDelete(cardElement);
  onLike(cardElement);
  showImg(cardElement, openModal);
  return cardElement;
}

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export function renderCard(
  card,
  cardsConatiner,
  firstAction,
  secondAction,
  thirdAction,
  openModal
) {
  cardsConatiner.prepend(
    createCard(card, firstAction, secondAction, thirdAction, openModal)
  );
}

export function likeCard(card) {
  const like = card.querySelector(".card__like-button");
  card.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
      like.classList.toggle("card__like-button_is-active");
    }
  });
}

export function deleteCard(card) {
  card.querySelector(".card__delete-button").addEventListener("click", () => {
    card.remove();
  });
}

export function revealCardImage(card, openModal) {
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.addEventListener("click", () => {
    const imagePopUp = document.querySelector(".popup_type_image");
    openModal(imagePopUp);
    const image = imagePopUp.querySelector(".popup__image");
    const description = imagePopUp.querySelector(".popup__caption");
    image.src = cardImage.src;
    description.textContent = cardTitle.textContent;
    image.alt = `Изображение ${description.textContent}`;
  });
}
