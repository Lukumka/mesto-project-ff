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

import { createCard, likeCard } from "./components/card.js";
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
let currentUserData;

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

confirmForm.addEventListener("submit", handleCardDelete);

//submit handler cardForm
async function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const popUpButton = addCardPopUp.querySelector(".popup__button");
  const cardData = {};
  cardData.name = placeInput.value;
  cardData.link = imageLinkInput.value;
  try {
    popUpButton.textContent = "Сохранение...";
    const newCardData = await sendNewCardData(cardData);
    cardsList.prepend(
      createCard({
        card: newCardData,
        user: currentUserData,
        cardsContainer: cardsList,
        likeFunction: likeCard,
        showImageFunction: revealCardImage,
        deleteFunction: confirmCardDelete,
      })
    );
    closeModal(addCardPopUp);
    clearFields(addCardForm);
    clearValidation(editProfileForm, validationConfig);
  } catch (err) {
    console.log("Ошибка", err);
  } finally {
    popUpButton.textContent = "Сохранить";
  }
}
//submit handler profileForm
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popUpButton = editProfilePopUp.querySelector(".popup__button");
  const name = nameInput.value;
  const about = jobInput.value;
  try {
    popUpButton.textContent = "Сохранение...";
    const data = await sendUserData(name, about);
    profileName.textContent = data.name;
    profileTitle.textContent = data.about;
    closeModal(editProfilePopUp);
    clearFields(editProfileForm);
    clearValidation(editProfileForm, validationConfig);
  } catch (err) {
    console.log("Ошибка", err);
  } finally {
    popUpButton.textContent = "Сохранить";
  }
}

async function handleAvatarSubmit(evt) {
  const popUpButton = editAvatarPopUp.querySelector(".popup__button");
  evt.preventDefault();
  const avatar = avatarSrc.value;
  try {
    popUpButton.textContent = "Сохранение...";
    const data = await sendNewAvatar(avatar);
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    closeModal(editAvatarPopUp);
    clearFields(editAvatarForm);
    clearValidation(editAvatarForm, validationConfig);
  } catch (err) {
    console.log("Ошибка", err);
  } finally {
    popUpButton.textContent = "Сохранить";
  }
}

async function handleCardDelete(evt) {
  evt.preventDefault();
  try {
    const data = await deleteCardData(onDeleteCardId);
    if (data) {
      document.querySelector(`#card-${onDeleteCardId}`).remove();
      closeModal(confirmPopUp);
    }
  } catch (err) {
    console.log("Ошибка", err);
  }
}

function confirmCardDelete(obj) {
  openModal(confirmPopUp);
  onDeleteCardId = obj.card._id;
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
  try {
    const [cardsArr, userData] = await Promise.all([
      getCardsData(),
      getProfileData(),
    ]);

    profileName.textContent = userData.name;
    profileTitle.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    currentUserData = userData;
    cardsArr.forEach((cardData) => {
      cardsList.append(
        createCard({
          card: cardData,
          user: currentUserData,
          cardsContainer: cardsList,
          likeFunction: likeCard,
          showImageFunction: revealCardImage,
          deleteFunction: confirmCardDelete,
        })
      );
    });
  } catch (err) {
    console.log("Ошибка", err);
  }
}

enableValidation(validationConfig);
setUpAllData();
