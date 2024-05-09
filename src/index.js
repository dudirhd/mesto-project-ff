import './pages/index.css';
import { createCard, deleteCardFunction, cardLikeFunc } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc, closePopupByOverlay} from './scripts/popupFuncs.js';
import { getUser, getAllCards, changeAvatar, newCardFunc, changeName } from './scripts/api.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNewName = document.querySelector('.popup__input_type_card-name');
const cardNewUrl = document.querySelector('.popup__input_type_url');
const formPofile = nameInput.closest('.edit-profile-popup__form');
const formNewCard = cardNewName.closest('.popup__form');  
const newAvatarUrl = document.querySelector('.popup__input_type_url-avatar')
const profileImage = document.querySelector('.profile__image')
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar')
const formAvatar = newAvatarUrl.closest('.popup__form')
//Открытие попапа смены имени
editButton.addEventListener('click', function() {
  clearValidation(formPofile, validationConfig);   
  formPofile.reset();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent; 
  openPopupFunc(popupEdit);
});
//Открытие попапа карточки
profileAddButton.addEventListener('click', function() {
  clearValidation(formNewCard, validationConfig);  
  formNewCard.reset();
  openPopupFunc(popupNewCard);
});
//Открытие попапа аватара
profileImage.addEventListener('click', function() {
  clearValidation(formAvatar, validationConfig);
  formAvatar.reset();
  openPopupFunc(editAvatarPopup);
})
//Каждой кнопке крестик и фону передается функция закрытия при клике
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closePopupByOverlay);
})
//Редактирование Имени и работы
function handleFormSubmitInfo(evt) {
  evt.preventDefault();
  isRenderingFunc(evt.submitter, true)
  const newNameObj = ({  
    name: nameInput.value,
    about: jobInput.value
  })
  changeName(newNameObj)
    .then((result) => {
      document.querySelector('.profile__title').textContent = nameInput.value;
      document.querySelector('.profile__description').textContent = jobInput.value;
      closePopupFunc(document.querySelector('.popup_is-opened'));      
    })
    .catch(error => console.log(error)) 
    .finally(() => isRenderingFunc(evt.submitter, false))    

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
      const newCard = createCard(result, userID,  deleteCardFunction, cardPopupFunc, cardLikeFunc);
      placesList.prepend(newCard);  
      closePopupFunc(popupNewCard);
    })
    .catch(error => console.log(error)) 
    .finally(() => isRenderingFunc(evt.submitter, false))
}
//Поменять Аватарку
function handleFormChangeAvatar(evt) {
  evt.preventDefault();
  const newAvatar = newAvatarUrl.value
  isRenderingFunc(evt.submitter, true)
  changeAvatar(newAvatar)
    .then((result) => {
      profileImage.style = `background-image: url(${newAvatar})`; 
      closePopupFunc(editAvatarPopup);
    })
    .catch(error => console.log(error)) 
    .finally(() => isRenderingFunc(evt.submitter, false))
 
}


//Добавление обработчиков к формам
formPofile.addEventListener('submit', handleFormSubmitInfo);
formNewCard.addEventListener('submit', handleFormSubmitCard);
formAvatar.addEventListener('submit',handleFormChangeAvatar);


const cardPopup = document.querySelector('.popup_type_image');
const cardImagePopup = document.querySelector('.popup__image');
const cardNamePopup = document.querySelector('.popup__caption');
//Попап карточки
export function cardPopupFunc(evt) {
  cardImagePopup.src = evt.target.src;
  cardImagePopup.alt = evt.target.alt;
  cardNamePopup.textContent = evt.target.alt;
  openPopupFunc(cardPopup);
}
//Конфиг валидации
const validationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  submitBtn: '.popup__button',
  submitBtnInactive: 'popup__button_inactive',
  inputErrorState: 'popup__input_type_error',
  inputErrorMessage: 'input-error'
};

enableValidation(validationConfig);
//Промис одновременно юзерДаты и карточек
Promise.all([getUser(), getAllCards()])
  .then(([userData, cardsData]) => {
    //Замена данными из запроса
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userID = userData._id;
    profileImage.style = `background-image: url(${userData.avatar})`;
    //Инициализация карточек
    cardsData.forEach((item) => {
      const card = createCard(item, userID, deleteCardFunction, cardPopupFunc, cardLikeFunc);
      placesList.append(card);
    })   
  })
  .catch(error => console.log(error)) 
  let userID = ""
//Процесс
  function isRenderingFunc(btn, isRendering) {
    if (isRendering) {
      btn.textContent = 'Сохранение...'
    } else {
      btn.textContent = 'Сохранить'
    }
  }