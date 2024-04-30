import { cardPopupFunc } from "..";
import { openPopupFunc } from "./popupFuncs";

export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, deleteCardFunction, openPopupFunc, cardLikeFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardLikeNum = cardElement.querySelector('.card__like-num')
  const cardPopup = document.querySelector('.popup_type_image');
  const cardImagePopup = document.querySelector('.popup__image');
  const cardNamePopup = document.querySelector('.popup__caption');

  deleteButton.addEventListener('click', deleteCardFunction); 

  cardLike.addEventListener('click', cardLikeFunc);

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardLikeNum.textContent = item.likes.length;
  cardImage.addEventListener('click', openPopupFunc);
  return cardElement;
}

export function deleteCardFunction(cardElement) { 
  const itemRemove = cardElement.target.closest('.card'); 
  itemRemove.remove(); 
}

export function cardLikeFunc(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}