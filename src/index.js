// decorative_images
import logo from "./assets/logo/logo.svg";
import avatar from "./assets/profile/avatar.jpg";
// cards_images
import card1 from "./assets/cards/card_1.jpg";
import card2 from "./assets/cards/card_2.jpg";
import card3 from "./assets/cards/card_3.jpg";
//button_images
import addIcon from "./assets/icons/add-icon.svg";
import close from "./assets/icons/close.svg";
import deleteIcon from "./assets/icons/delete-icon.svg";
import editIcon from "./assets/icons/edit-icon.svg";
//like_images
import likeActive from "./assets/like/like-active.svg";
import likeInactive from "./assets/like/like-inactive.svg";
//css
import "./index.css";

import { initialCards } from "./components/cards.js";
import { renderCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  setModalWindowEventListeners,
} from "./components/modal.js";

const pageImages = [
  { name: "Avatar", link: avatar },
  { name: "Logo", link: logo },
  { name: "Card_1", link: card1 },
  { name: "Card_2", link: card2 },
  { name: "Card_3", link: card3 },
  { name: "Add-icon", link: addIcon },
  { name: "Close", link: close },
  { name: "Delete-icon", link: deleteIcon },
  { name: "Edit-icon", link: editIcon },
  { name: "Like-active", link: likeActive },
  { name: "Like_inactive", link: likeInactive },
];
const cardsList = document.querySelector(".places__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const placeInput = addCardForm.elements["place-name"];
const imageLinkInput = addCardForm.elements.link;

const profileName = document.querySelector(".profile__title");
const profileTitle = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

const imagePopUp = document.querySelector(".popup_type_image");
const image = imagePopUp.querySelector(".popup__image");
const caption = imagePopUp.querySelector(".popup__caption");

// All popups
document.querySelectorAll(".popup").forEach((element) => {
  element.classList.add("popup_is-animated");
  setModalWindowEventListeners(element);
});
//addCard
addCardButton.addEventListener("click", () => {
  openModal(addCardPopUp);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);

addCardPopUp.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    clearFields(addCardPopUp);
  }
});
//editProfile
editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfilePopUp.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    clearFields(addCardPopUp);
  }
});
//submit handler
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = placeInput.value;
  cardData.link = imageLinkInput.value;
  renderCard(cardData, cardsList, deleteCard, likeCard, revealCardImage);
  closeModal(addCardPopUp);
  clearFields(addCardForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closeModal(editProfilePopUp);
  clearFields(editProfileForm);
}

function clearFields(modal) {
  modal.querySelectorAll("input").forEach((element) => {
    element.value = "";
  });
}

function revealCardImage(imageTitle, imageSrc) {
  openModal(imagePopUp);
  image.src = imageSrc;
  image.alt = `Изображение ${imageTitle}`;
  caption.textContent = imageTitle;
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList, deleteCard, likeCard, revealCardImage);
});