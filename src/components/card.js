import { sendLikesData, deleteLikesData } from "./api";

function createCard(obj) {
  const title = obj.card.name;
  const image = obj.card.link;
  const cardElement = getTemplate();
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.id = `card-${obj.card._id}`;
  cardTitle.textContent = title;
  cardImage.src = image;
  cardImage.alt = `Изображение ${title}`;
  cardImage.addEventListener("click", () =>
    obj.showImageFunction(title, image)
  );
  if (obj.deleteFunction) {
    obj.deleteFunction(cardElement);
  }
  obj.likeFunction(cardElement, obj);
  return cardElement;
}

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export function renderCard(obj) {
  obj.cardsContainer.prepend(createCard(obj));
}

export function likeCard(card, obj) {
  const like = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__likes-counter");
  const checkLike = obj.card.likes.some(
    (likeUserData) => likeUserData._id === obj.user._id
  );
  like.addEventListener("click", (evt) => {
    const cardId = evt.target.closest(".card").id.replace(/^card-/, "");
    if (!evt.target.classList.contains("card__like-button_is-active")) {
      like.classList.add("card__like-button_is-active");
      sendLikesData(cardId).then((res) => {
        likeCounter.textContent = res.likes.length;
      });
    } else {
      like.classList.remove("card__like-button_is-active");
      deleteLikesData(cardId).then((res) => {
        likeCounter.textContent = res.likes.length;
      });
    }
  });
  if (checkLike) {
    like.classList.add("card__like-button_is-active");
  }
}

export function deleteCard(card) {
  card
    .querySelector(".card__delete-button")
    .classList.add("card__delete-button_visible");
}
