export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];

export const profileName = document.querySelector(".profile__title");
export const profileTitle = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const imagePopUp = document.querySelector(".popup_type_image");

import { initialCards } from './components/cards.js';
import { renderCard,deleteCard,likeCard } from './components/card.js';
import { openModal,closeModal } from './components/modal.js';

addCardButton.addEventListener('click',()=>{openModal(addCardPopUp,closeModal)});

editProfileButton.addEventListener('click',()=>{
  openModal(editProfilePopUp,closeModal);
});


cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')){
    openModal(imagePopUp,closeModal);
    imagePopUp.querySelector(".popup__image").src = evt.target.src;
    imagePopUp.querySelector(".popup__caption").textContent = evt.target.parentNode.querySelector(".card__title").textContent;
  }
})

initialCards.forEach((cardData) => {
  renderCard(cardData,cardsList, deleteCard,likeCard);
});

// decorative_images
import logo from './assets/logo/logo.svg';

import avatar from './assets/profile/avatar.jpg';
// cards_images
import card_1 from './assets/cards/card_1.jpg';
import card_2 from './assets/cards/card_2.jpg';
import card_3 from './assets/cards/card_3.jpg';
//button_images
import add_icon from './assets/icons/add-icon.svg';
import close from './assets/icons/close.svg';
import delete_icon from './assets/icons/delete-icon.svg';
import edit_icon from './assets/icons/edit-icon.svg';
//like_images
import like_active from './assets/like/like-active.svg';
import like_inactive from './assets/like/like-inactive.svg';


const pageImages = [

  { name: 'Avatar', link: avatar },
  { name: 'Logo', link: logo },
  { name: 'Card_1', link: card_1 },
  { name: 'Card_2', link: card_2 },
  { name: 'Card_3', link: card_3 },
  { name: 'Add-icon', link: add_icon },
  { name: 'Close', link: close },
  { name: 'Delete-icon', link: delete_icon },
  { name: 'Edit-icon', link: edit_icon },
  { name: 'Like-active', link: like_active },
  { name: 'Like_inactive', link: like_inactive },
];

import './index.css';
 // добавьте импорт главного файла стилей