export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item) {
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