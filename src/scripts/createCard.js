import { openPopupFunc } from "./popupFuncs";

export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardPopup = document.querySelector('.popup_type_image');
  const cardImagePopup = document.querySelector('.popup__image');
  const cardNamePopup = document.querySelector('.popup__caption');

  deleteButton.addEventListener('click', deleteCardFunction); 

  cardLike.addEventListener('click', function() {
    cardLike.classList.toggle('card__like-button_is-active');
  })

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener('click', function() {
    openPopupFunc(cardPopup);
    cardImagePopup.src = cardImage.src;
    cardNamePopup.textContent = cardTitle.textContent;
  });

  return cardElement;
}

export function deleteCardFunction(cardElement) { 
  const itemRemove = cardElement.target.closest('.card'); 
  itemRemove.remove(); 
}