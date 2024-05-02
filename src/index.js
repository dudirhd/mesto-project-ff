import './pages/index.css';
import { createCard, deleteCardFunction, cardLikeFunc } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc, closePopupByOverlay} from './scripts/popupFuncs.js';
import { getUser, getAllCards, changeAvatar, newCardFunc, changeName } from './scripts/api.js'
//дом - карточки
const placesList = document.querySelector('.places__list');
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
  const newNameObj = ({  
    name: nameInput.value,
    about: jobInput.value
  })
  changeName(newNameObj)
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
  newCardFunc(objNewCard)
    .then((result) => { 
      const newCard = createCard(result, deleteCardFunction);
      placesList.prepend(newCard);
      isRenderingFunc(evt.submitter, false)
    })
  closePopupFunc(popupNewCard);
}
const newAvatarUrl = document.querySelector('.popup__input_type_url-avatar')
const profileImage = document.querySelector('.profile__image')
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar')
const formAvatar = newAvatarUrl.closest('.popup__form')
//Поменять Аватарку
function handleFormChangeAvatar(evt) {
  evt.preventDefault();
  console.log('thaTSIT')
  const newAvatar = newAvatarUrl.value
  isRenderingFunc(evt.submitter, true)
  changeAvatar(newAvatar)
    .then((result) => {
      console.log(result)
      profileImage.style = `background-image: url(${newAvatar})`;
      isRenderingFunc(evt.submitter, false)
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

//Проверка валидности форм
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
//Промис одновременно юзерДаты и карточек
Promise.all([getUser(), getAllCards()])
  .then(([userData, cardsData]) => {
    //Замена данными из запроса
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about
    profileImage.style = `background-image: url(${userData.avatar})`;
    console.log(cardsData)
    //Инициализация карточек
    cardsData.forEach((item) => {
      const card = createCard(item, deleteCardFunction, cardPopupFunc, cardLikeFunc);
      placesList.append(card);
    })
  });

  function isRenderingFunc(btn, isRendering) {
    if (isRendering) {
      btn.textContent = 'Сохранение...'
    } else {
      btn.textContent = 'Сохранить'
    }
  }