import { deleteCardRequest, cardLikeRequest } from "./api";

export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, id, deleteCardFunction, openPopupFunc, cardLikeFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardLikeNum = cardElement.querySelector('.card__like-num');
  const likesNum = item.likes.length || 0;
  if (item.owner._id === id) {
    deleteButton.addEventListener('click', deleteCardFunction);
  } else {
    deleteButton.style.display = 'none'
  }

  function isLikedByMeFunc(like) {
    if (like._id === id) {
      return true
    }
  }

  const isLikedByMe = item.likes.some(isLikedByMeFunc)
  if (isLikedByMe) {
    cardLike.classList.add('card__like-button_is-active')
  }
  cardLike.addEventListener('click', function() {
    cardLikeFunc(cardLike, cardElement, likesNum)
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
  deleteCardRequest(itemRemove.id)
    .then(itemRemove.remove())
    .catch(error => console.log(error))
}

export function cardLikeFunc(likeButton, cardElement) {
  const isCardLiked = likeButton.classList.contains('card__like-button_is-active');
  cardLikeRequest(isCardLiked, cardElement.id)
    .then((result) => {    
      likeButton.classList.toggle('card__like-button_is-active');
      cardElement.querySelector('.card__like-num').textContent = result.likes.length;
    }).catch(error => console.log(error))
}