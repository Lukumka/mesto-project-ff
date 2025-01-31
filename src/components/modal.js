import { profileName, profileTitle,cardsList} from "../index";
import { renderCard,deleteCard,likeCard } from './card';

// Открытие модального окна
export function openModal(popup, close) {
    setTimeout(() => {
    popup.classList.add("popup_is-opened");
    }, 10);
    popup.classList.add("popup_is-animated");
    const inputFields = popup.querySelectorAll("input");
    if (inputFields.length !== 0) {
        if(popup.saveData === true){
            setInputData(inputFields,getData(inputFields));
         } else {
            if (popup.classList.contains("popup_type_edit")) {
                setInputData(inputFields, {
                    name: profileName.textContent,
                    description: profileTitle.textContent
                })
            } else {
                clearFields(inputFields);
            }
            }
        const submitHandlerWrapper = (evt) => submitHandler(evt, popup, close, inputFields);
        popup.submitHandler = submitHandlerWrapper;
        popup.addEventListener("submit", submitHandlerWrapper);
    }

    const clickHandlerWrapper = (evt) => clickHandler(evt, popup, close);
    popup.clickHandler = clickHandlerWrapper;
    popup.addEventListener("click", clickHandlerWrapper);

    const keyHandlerWrapper = (evt) => keyHandler(evt, popup, close);
    popup.keyHandler = keyHandlerWrapper;
    document.addEventListener("keydown", keyHandlerWrapper);
}

// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");

    if (modal.clickHandler) {
        modal.removeEventListener("click", modal.clickHandler);
        delete modal.clickHandler;
    }
    if (modal.keyHandler) {
        document.removeEventListener("keydown", modal.keyHandler);
        delete modal.keyHandler;
    }
    if (modal.submitHandler) {
        modal.removeEventListener("submit", modal.submitHandler);
        delete modal.submitHandler;
        }
}

// Обработчик кликов
function clickHandler(event, modal, action) {
    if (event.target === modal) {
        modal.saveData = true;
        action(modal);
    }
    if (event.target.classList.contains("popup__close")) {
        modal.saveData = false;
        action(modal);
    }
}

// Обработчик клавиши Escape
function keyHandler(event, modal, action) {
    if (event.key === "Escape") {
        modal.saveData = true;
        action(modal);
    }
}

// Обработчик отправки формы
function submitHandler(event, modal, action,fields) {
    event.preventDefault();
    const obj = getData(fields);
    if (modal.classList.contains("popup_type_edit")) {
        const profileInfo = obj;
        profileName.textContent = profileInfo.name;
        profileTitle.textContent = profileInfo.description;
        action(modal);
    } else if (modal.classList.contains("popup_type_new-card")){
        const cardData = Object.assign({}, obj, { name: obj["place-name"] });
        delete cardData["place-name"]; 
            renderCard(cardData,cardsList, deleteCard,likeCard);
            action(modal);
    }
}

// Установка данных в форму
function setInputData(fields, data = {}) {
    fields.forEach((input) => {
        input.value = data[input.name];
    });
}

// Получаем данные из формы
function getData(fields) {
    const obj = {};
    fields.forEach((element) => {
        obj[element.name] = element.value;
    });
    return obj;
}

function clearFields(fields) {
    fields.forEach((element) => {
        element.value = "";
    });
}
