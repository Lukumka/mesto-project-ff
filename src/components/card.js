import { sendLikesData, deleteLikesData } from "./api";
/**
 * Функция созадет карточку принимая данные
 * 
 * 
 */
export function createCard(obj) {
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
  if (obj.card.owner._id === obj.user._id) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      obj.deleteFunction(obj);
    });
    deleteButton.classList.add("card__delete-button_visible");
  }
  obj.likeFunction(cardElement, obj);
  cardElement.querySelector(".card__likes-counter").textContent =
    obj.card.likes.length;
  return cardElement;
}

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

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
      sendLikesData(cardId)
        .then((res) => {
          like.classList.add("card__like-button_is-active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error);
        });
    } else {
      deleteLikesData(cardId)
        .then((res) => {
          like.classList.remove("card__like-button_is-active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error);
        });
    }
  });
  if (checkLike) {
    like.classList.add("card__like-button_is-active");
  }
}
