export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

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

import { initialCards } from "./components/cards.js";
import {
  renderCard,
  deleteCard,
  likeCard,
  revealCardImage,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

document.querySelectorAll(".popup").forEach((element) => {
  element.classList.add("popup_is-animated");
});

addCardButton.addEventListener("click", () => {
  openModal(addCardPopUp);
  addCardForm.addEventListener("submit", handleFormSubmit);
});

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
});
editProfileForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const formName = evt.srcElement.getAttribute("name");
  switch (formName) {
    case "edit-profile":
      profileName.textContent = nameInput.value;
      profileTitle.textContent = jobInput.value;
      closeModal(editProfilePopUp);
      clearFields(editProfileForm);
      break;
    case "new-place":
      const cardData = {};
      cardData.name = placeInput.value;
      cardData.link = imageLinkInput.value;
      renderCard(cardData, cardsList, deleteCard, likeCard, revealCardImage);
      closeModal(addCardPopUp);
      clearFields(addCardForm);
      break;
  }
}

function clearFields(modal) {
  modal.querySelectorAll("input").forEach((element) => {
    element.value = "";
  });
}

initialCards.forEach((cardData) => {
  renderCard(
    cardData,
    cardsList,
    deleteCard,
    likeCard,
    revealCardImage,
    openModal
  );
});

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

import "./index.css";
// добавьте импорт главного файла стилей
