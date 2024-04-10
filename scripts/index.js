// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  deleteButton.addEventListener('click', deleteCardFunction);

  cardImage.src = item.link;
  cardImage.alt = item.link;
  cardTitle.textContent = item.name;
 
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCardFunction(cardElement) {
  const itemRemove = cardElement.target.closest('.card');
  itemRemove.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  const card = createCard(item, deleteCardFunction);
  placesList.append(card);
})