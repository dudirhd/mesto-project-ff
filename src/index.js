import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard, deleteCardFunction, cardLikeFunc } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc, closePopupByOverlay} from './scripts/popupFuncs.js';
//дом - карточки
const placesList = document.querySelector('.places__list');
//инициализация карточек
initialCards.forEach(item => {
  const card = createCard(item, deleteCardFunction, cardPopupFunc, cardLikeFunc);
  placesList.append(card);
})
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

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopupFunc(document.querySelector('.popup_is-opened'));
}
//Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const objNewCard = ({
    name: cardNewName.value,
    link: cardNewUrl.value
  })
  const newCard = createCard(objNewCard, deleteCardFunction);
  placesList.prepend(newCard);
  closePopupFunc(popupNewCard);
}
//Добавление обработчиков к формам
formPofile.addEventListener('submit', handleFormSubmitInfo);
formNewCard.addEventListener('submit', handleFormSubmitCard);

const cardPopup = document.querySelector('.popup_type_image');
const cardImagePopup = document.querySelector('.popup__image');
const cardNamePopup = document.querySelector('.popup__caption');

export function cardPopupFunc(evt) {
  cardImagePopup.src = evt.target.src;
  cardImagePopup.alt = evt.target.alt;
  cardNamePopup.textContent = evt.target.alt;
  openPopupFunc(cardPopup);
}