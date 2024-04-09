import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard } from './scripts/createCard.js';
import {openPopupFunc, closePopupFunc, closePopupByEsc} from './scripts/popupFuncs.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach(item => {
  const card = createCard(item);
  placesList.append(card);
})

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close');
const popupImage = document.querySelectorAll('.popup_type_image');
const cardImage = document.querySelector('.card__image');

editButton.addEventListener('click', function() {
  openPopupFunc(popupEdit);
});

profileAddButton.addEventListener('click', function() {
  openPopupFunc(popupNewCard);
});

// cardImage.addEventListener('click', function() {
//   openPopupFunc(popupImage);
// })

closePopupButton[0].addEventListener('click', function() {
  closePopupFunc(popupEdit);
});

closePopupButton[1].addEventListener('click', function() {
  closePopupFunc(popupNewCard);
});

// closePopupButton[2].addEventListener('click', function() {
//   closePopupFunc(popupImage);
// });

// Находим форму в DOM
const formElement = document.querySelectorAll('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement[0].querySelector('.popup__input_type_name')
const jobInput = formElement[0].querySelector('.popup__input_type_description') // Воспользуйтесь инструментом .querySelector()
const cardNewName = formElement[1].querySelector('.popup__input_type_card-name');
const cardNewUrl = formElement[1].querySelector('.popup__input_type_url');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closePopupFunc(document.querySelector('.popup_is-opened'));
}


formElement[0].addEventListener('submit', handleFormSubmit);
formElement[1].addEventListener('submit', handleFormSubmit);