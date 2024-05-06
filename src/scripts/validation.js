//Поиск ошибок
export function isValid (formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
  else {
    hideInputError(formElement, inputElement, validationConfig)
  }
};
//Показать ошибку
export function showInputError(elementForm, elementInput, errorMessage, validationConfig) {
  const elementError = elementForm.querySelector(`.${elementInput.id}-error`)
  console.log(elementError)
  elementInput.classList.add(validationConfig.inputErrorState);
  elementError.classList.add(validationConfig.inputErrorMessage);
  elementError.textContent = errorMessage;
};
//Скрыть ошибку
export function hideInputError(elementForm, elementInput, validationConfig) {
  const elementError = elementForm.querySelector(`.${elementInput.id}-error`)
  elementInput.classList.remove(validationConfig.inputErrorState);
  elementError.classList.remove(validationConfig.inputErrorMessage);
  elementError.textContent = '';
};
//Обработчики каждому инпуту и изменение состояний кнопок
export function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.input));
  const buttonElement = formElement.querySelector(validationConfig.submitBtn);
  toggleButtonState(inputList, buttonElement, validationConfig)  ;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}
//Включить валидацию
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig)
  })
}
//Очистить поля ошибок
export function clearValidation(form, validationConfig) {
  const buttonElement = form.querySelector(validationConfig.submitBtn);
  const inputList = Array.from(form.querySelectorAll(validationConfig.input));
  console.log(inputList)
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig);
  })
  toggleButtonState(inputList, buttonElement, validationConfig);
}
//Проверка есть ли хотя бы 1 неправильный инпут
export function hasInvalideInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
//Изменение кнопки
export function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalideInput(inputList)) {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add(validationConfig.submitBtnInactive);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationConfig.submitBtnInactive);
  }
}