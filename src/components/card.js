import { cardTemplate } from "../index.js";

function createCard(card,onDelete,onLike) {
    const title = card.name;
    const image = card.link;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = image;
    cardElement.querySelector(".card__image").alt = `Изображение ${title}`;
    cardElement.querySelector(".card__title").textContent = title;
    onDelete(cardElement);
    onLike(cardElement);
    return cardElement;
  }

  export function renderCard(card,cardsConatiner,action,s_action) {
    cardsConatiner.prepend(createCard(card, action,s_action));
  }

export function likeCard(card) {
    const like = card.querySelector(".card__like-button");
    card.addEventListener('click', (evt)=>{
        if(evt.target.classList.contains('card__like-button_is-active')){
            like.classList.remove('card__like-button_is-active')
        } else if (evt.target.classList.contains('card__like-button')) {
            like.classList.add('card__like-button_is-active')
        }
    })
}

  export function deleteCard(card) {
    card.querySelector(".card__delete-button").addEventListener("click", () => {
      card.remove();
    });
  }

 