//Открыть попап
export function openPopupFunc(element) {
  element.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//Закрыть попап
export function closePopupFunc(element) {
  element.classList.toggle('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}
//Закрыть по Esc
export function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopupFunc(document.querySelector('.popup_is-opened'));
  }
}