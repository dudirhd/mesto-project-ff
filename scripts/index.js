// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
 
  return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  const card = createCard(item);
  placesList.append(card);
})