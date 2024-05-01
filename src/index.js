import './pages/index.css';
import { createCard, deleteCardFunction, cardLikeFunc } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc, closePopupByOverlay} from './scripts/popupFuncs.js';
//дом - карточки
const placesList = document.querySelector('.places__list');
//инициализация карточек
// initialCards.forEach(item => {
//   const card = createCard(item, deleteCardFunction, cardPopupFunc, cardLikeFunc);
//   placesList.append(card);
// })
//Дом для кнопок и попапов
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//Поиск элементов в дом дереве для работы с формами
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNewName = document.querySelector('.popup__input_type_card-name');
const cardNewUrl = document.querySelector('.popup__input_type_url');

const formPofile = nameInput.closest('.popup__form');
const formNewCard = cardNewName.closest('.popup__form');  

//Открытие попапа смены имени
editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopupFunc(popupEdit);
});
//Открытие попапа карточки
profileAddButton.addEventListener('click', function() {
  openPopupFunc(popupNewCard);
  formNewCard.reset();
});


//Каждой кнопке крестик и фону передается функция закрытия при клике
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closePopupByOverlay);
})
//Редактирование Имени и работы
function handleFormSubmitInfo(evt) {
  evt.preventDefault();
  isRenderingFunc(evt.submitter, true)
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '27e1782a-9848-48d5-811f-a412253546cd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  }) 
    .then(res => res.json())
    .then((result) => {
      isRenderingFunc(evt.submitter, false)
      console.log(result);
    })
  closePopupFunc(document.querySelector('.popup_is-opened'));
}
//Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  isRenderingFunc(evt.submitter, true)
  const objNewCard = ({
    name: cardNewName.value,
    link: cardNewUrl.value
  })
  
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method: 'POST',    
    headers: {
      authorization: '27e1782a-9848-48d5-811f-a412253546cd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardNewName.value,
      link: cardNewUrl.value
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      isRenderingFunc(evt.submitter, false)
    })
    .catch((error) => {
      console.log(error)
    })
  const newCard = createCard(objNewCard, deleteCardFunction);
  placesList.prepend(newCard);
  closePopupFunc(popupNewCard);
}
const newAvatarUrl = document.querySelector('.popup__input_type_url-avatar')
const profileImage = document.querySelector('.profile__image')
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar')
const formAvatar = newAvatarUrl.closest('.popup__form')
function handleFormChangeAvatar(evt) {
  evt.preventDefault();
  console.log('thaTSIT')
  const newAvatar = newAvatarUrl.value
  isRenderingFunc(evt.submitter, true)
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar', {
    method: 'PATCH',    
    headers: {
      'Content-Type': 'application/json',
      'authorization': '27e1782a-9848-48d5-811f-a412253546cd'
    },
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
    .then((res) => {
      console.log(res)
      res.json()
    })
    .then((result) => {
      console.log(result)
      profileImage.style = `background-image: url(${newAvatar})`;
      isRenderingFunc(evt.submitter, false)
    })
    .catch((error) => {
      console.log(error)
    })
  closePopupFunc(editAvatarPopup);
}

profileImage.addEventListener('click', function() {
  openPopupFunc(editAvatarPopup);
})
//Добавление обработчиков к формам
formPofile.addEventListener('submit', handleFormSubmitInfo);
formNewCard.addEventListener('submit', handleFormSubmitCard);
formAvatar.addEventListener('submit',handleFormChangeAvatar);


const cardPopup = document.querySelector('.popup_type_image');
const cardImagePopup = document.querySelector('.popup__image');
const cardNamePopup = document.querySelector('.popup__caption');

export function cardPopupFunc(evt) {
  cardImagePopup.src = evt.target.src;
  cardImagePopup.alt = evt.target.alt;
  cardNamePopup.textContent = evt.target.alt;
  openPopupFunc(cardPopup);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////Проверка валидности форм



// const changeProfileForm = document.querySelector('.edit-profile-popup__form')
// const nameInputError = document.querySelector('.name-input-error')
// const descriptionInputError = document.querySelector('.description-input-error')

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement)
  }
};

const showInputError = (elementForm, elementInput, errorMessage) => {
  const elementError = elementForm.querySelector(`.${elementInput.id}-error`)
  elementInput.classList.add('popup__input_type_error');
  elementError.classList.add(`${elementInput.id}-error-active`);
  elementError.textContent = errorMessage;
};

const hideInputError = (elementForm, elementInput) => {
  const elementError = elementForm.querySelector(`.${elementInput.id}-error`)
  elementInput.classList.remove('popup__input_type_error');
  elementError.classList.remove(`${elementInput.id}-error-active`);
  elementError.textContent = '';
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })
}

enableValidation();

function hasInvalideInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalideInput(inputList)) {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove('popup__button_inactive');
  }
}


///////////////////////////////////////////////////////////////////////// Перенести потом в другой файл(api.js)
//Конфиг
const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    'Content-Type': 'application/json',
    'authorization': '27e1782a-9848-48d5-811f-a412253546cd'
  },
  methodGet: 'GET',
  methodPost: 'POST'
}

//запрос профиля по токену

fetch(`${config.baseURL}/users/me `, {
  headers: config.headers,
  method: config.methodGet
})
.then(res => res.json())
.then((result) => {
  //Замена данными из запроса
  console.log(result)
  profileTitle.textContent = result.name;
  profileDescription.textContent = result.about
  profileImage.style = `background-image: url(${result.avatar})`;
}); 
//Все карточки
fetch(`${config.baseURL}/cards `, {
  headers: config.headers,
  method: config.methodGet
})
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    result.forEach((item) => {
      const card = createCard(item, deleteCardFunction, cardPopupFunc, cardLikeFunc);
      placesList.append(card);
    })
  })

  function isRenderingFunc(btn, isRendering) {
    if (isRendering) {
      btn.textContent = 'Сохранение...'
    } else {
      btn.textContent = 'Сохранить'
    }
  }