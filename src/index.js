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
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getCardsData,
  getProfileData,
  sendUserData,
  sendNewCardData,
  deleteCardData,
  sendNewAvatar,
} from "./components/api.js";

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

const profileAvatar = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileTitle = document.querySelector(".profile__description");

const editAvatarPopUp = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = document.forms["edit-avatar"];
const avatarSrc = editAvatarForm.elements.link;

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

const imagePopUp = document.querySelector(".popup_type_image");
const image = imagePopUp.querySelector(".popup__image");
const caption = imagePopUp.querySelector(".popup__caption");

const confirmPopUp = document.querySelector(".popup_type_confirm");
const confirmForm = document.forms["confirm"];
let onDeleteCardId;
let currrentUserData;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//addCard
addCardButton.addEventListener("click", (evt) => {
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopUp);
});
//addCardForm
addCardForm.addEventListener("submit", handleCardFormSubmit);
//editProfile
editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
  clearValidation(editProfileForm, validationConfig);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAvatar.addEventListener("click", () => {
  openModal(editAvatarPopUp);
});

editAvatarForm.addEventListener("submit", handleAvatarSubmit);

document.querySelectorAll(".popup").forEach((element) => {
  element.classList.add("popup_is-animated");
  setModalWindowEventListeners(element, clearFields);
});

document.addEventListener("click", (evt) => {
  const card = evt.target.parentElement;
  if (evt.target.classList.contains("card__delete-button")) {
    openModal(confirmPopUp);
    onDeleteCardId = card.id;
  }
});

confirmForm.addEventListener("submit", handleCardDelete);

//submit handler cardForm
async function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = placeInput.value;
  cardData.link = imageLinkInput.value;
  const newCardData = await sendNewCardData(cardData);
  renderCard({
    card: newCardData,
    user: currrentUserData,
    cardsContainer: cardsList,
    likeFunction: likeCard,
    showImageFunction: revealCardImage,
    deleteFunction: deleteCard,
  });
  closeModal(addCardPopUp);
  clearFields(addCardForm);
  clearValidation(editProfileForm, validationConfig);
}
//submit handler profileForm
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;
  profileName.textContent = name;
  profileTitle.textContent = about;
  sendUserData(name, about);
  closeModal(editProfilePopUp);
  clearFields(editProfileForm);
  clearValidation(editProfileForm, validationConfig);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatar = avatarSrc.value;
  profileAvatar.style.backgroundImage = `url('${avatar}')`;
  sendNewAvatar(avatar);
  closeModal(editAvatarPopUp);
  clearFields(editAvatarForm);
  clearValidation(editAvatarForm, validationConfig);
}

function handleCardDelete(evt) {
  evt.preventDefault();
  const card = cardsList.querySelector(`#${onDeleteCardId}`);
  const cardId = onDeleteCardId.replace(/^card-/, "");
  deleteCardData(cardId);
  card.remove();
  closeModal(confirmPopUp);
}
//clear inputs
function clearFields(modal) {
  modal.querySelectorAll("input").forEach((element) => {
    element.value = "";
  });
}
//show image popup
function revealCardImage(imageTitle, imageSrc) {
  openModal(imagePopUp);
  image.src = imageSrc;
  image.alt = `Изображение ${imageTitle}`;
  caption.textContent = imageTitle;
}

async function setUpAllData() {
  const [cardsArr, userData] = await Promise.all([
    getCardsData(),
    getProfileData(),
  ]);
  console.log(cardsArr);
  console.log(userData);
  currrentUserData = userData;
  profileName.textContent = userData.name;
  profileTitle.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
  cardsArr.forEach((cardData) => {
    if (cardData.owner._id === userData._id) {
      renderCard({
        card: cardData,
        user: currrentUserData,
        cardsContainer: cardsList,
        likeFunction: likeCard,
        showImageFunction: revealCardImage,
        deleteFunction: deleteCard,
      });
    } else {
      renderCard({
        card: cardData,
        user: currrentUserData,
        cardsContainer: cardsList,
        likeFunction: likeCard,
        showImageFunction: revealCardImage,
      });
    }
    document.querySelector(".card__likes-counter").textContent =
      cardData.likes.length;
  });
}

enableValidation(validationConfig);
setUpAllData();
