import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard, deleteCardFunction } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc} from './scripts/popupFuncs.js';
//дом - карточки
const placesList = document.querySelector('.places__list');
//инициализация карточек
initialCards.forEach(item => {
  const card = createCard(item, deleteCardFunction);
  placesList.append(card);
})
//Дом для кнопок и попапов
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
//Поиск элементов в дом дереве для работы с формами
const formElement = document.querySelectorAll('.popup__form');
//Открытие попапа смены имени
editButton.addEventListener('click', function() {
  openPopupFunc(popupEdit);
});
//Открытие попапа карточки
profileAddButton.addEventListener('click', function() {
  openPopupFunc(popupNewCard);
});
//Каждой кнопке крестик и фону передается функция закрытия при клике
popup.forEach((i) => {
  i.classList.add('popup_is-animated');
  i.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains("popup")) {
      closePopupFunc(i);
    }
  })
})
//Редактирование Имени и работы
function handleFormSubmitInfo(evt) {
  evt.preventDefault();
  const nameInput = formElement[0].querySelector('.popup__input_type_name');
  const jobInput = formElement[0].querySelector('.popup__input_type_description');
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopupFunc(document.querySelector('.popup_is-opened'));
}
//Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardNewName = formElement[1].querySelector('.popup__input_type_card-name');
  const cardNewUrl = formElement[1].querySelector('.popup__input_type_url');
  initialCards.unshift({
    name: cardNewName.value,
    link: cardNewUrl.value
  })
  const newCard = createCard(initialCards[0], deleteCardFunction);
  placesList.prepend(newCard);
  closePopupFunc(document.querySelector('.popup_is-opened'));
}
//Добавление обработчиков к формам
formElement[0].addEventListener('submit', handleFormSubmitInfo);
formElement[1].addEventListener('submit', handleFormSubmitCard);
