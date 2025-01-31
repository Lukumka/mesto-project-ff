function generateCard(newCard) {
    newCard = {};
    newCard.name = addCardPopUp.querySelector(
      ".popup__input_type_card-name"
    ).value;
    newCard.link = addCardPopUp.querySelector(".popup__input_type_url").value;
    return newCard;
  }
  

  // @todo: Темплейт карточки

//кнопки поп-апа


// const closePopUpButton = addCardPopUp.querySelector(".popup__close");
// const saveCardButton = addCardPopUp.querySelector(".popup__button");




  //добавление новой  карточки
  // saveCardButton.addEventListener("click", () => {
  //   addCardPopUp.classList.remove("popup_is-opened");
  //   renderCard(generateCard(), deleteCard);
  // });
  export function chipiChapa (){
    console.log('yes')
  }