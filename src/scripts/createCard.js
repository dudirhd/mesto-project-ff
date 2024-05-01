import { error } from "jquery";
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
  const likesNum = item.likes.length || 0;  
  if (item.owner.name == 'Dmitriy Ermolenko') {
    deleteButton.addEventListener('click', deleteCardFunction);
  } else {
    deleteButton.style.display = 'none'
  }

  const isLikedByMeFunc = (like) => like.name === 'Dmitriy Ermolenko'
  const isLikedByMe = item.likes.some(isLikedByMeFunc)
  if (isLikedByMe) {
    cardLike.classList.add('card__like-button_is-active')
  }
  cardLike.addEventListener('click', function() {
    cardLikeFunc(cardLike, cardElement)
  });

  cardElement.id = item._id;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardLikeNum.textContent = likesNum;
  cardImage.addEventListener('click', openPopupFunc);
  return cardElement;
}

export function deleteCardFunction(evt) { 
  const itemRemove = evt.target.closest('.card'); 
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${itemRemove.id}`, {
    method: 'DELETE',
    headers: {
      authorization: '27e1782a-9848-48d5-811f-a412253546cd',
      'Content-Type': 'application/json'
    }
  })
    .then(itemRemove.remove())
    .catch(error => console.log(error))
}

export function cardLikeFunc(likeButton, cardElement) {
  const isCardLiked = likeButton.classList.contains('card__like-button_is-active');
  if (!isCardLiked) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardElement.id}`, {
      method: 'PUT',
      headers: {
        authorization: '27e1782a-9848-48d5-811f-a412253546cd',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      const likesNum = result.likes.length || 0; 
      cardElement.querySelector('.card__like-num').textContent = likesNum;
      likeButton.classList.add('card__like-button_is-active');
    })
  } 
  else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardElement.id}`, {
      method: 'DELETE',
      headers: {
        authorization: '27e1782a-9848-48d5-811f-a412253546cd',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      const likesNum = result.likes.length || 0; 
      cardElement.querySelector('.card__like-num').textContent = likesNum;
      likeButton.classList.remove('card__like-button_is-active');
    })
  }
}