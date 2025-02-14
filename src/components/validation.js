const showInputError = (
  validationSettings,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (validationSettings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (validationSettings, formElement, inputElement) => {
  inputElement.addEventListener("invalid", (event) => {
    event.preventDefault();
  });
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      validationSettings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationSettings, formElement, inputElement);
  }
};

const setEventListeners = (validationSettings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(validationSettings, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(validationSettings, formElement, inputElement);
      toggleButtonState(validationSettings, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (validationSettings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

export function enableValidation(validationSettings) {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(validationSettings, formElement);
  });
}

export function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(validationSettings, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    checkInputValidity(validationSettings, formElement, inputElement);
    toggleButtonState(validationSettings, inputList, buttonElement);
  });
}
