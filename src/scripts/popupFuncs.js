//Открыть попап
export function openPopupFunc(element) {
  element.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//Закрыть по Esc
export function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopupFunc(document.querySelector('.popup_is-opened'));
  }
}
//Закрыть попап
export function closePopupFunction(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains("popup")) {
    evt.currentTarget.classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
  }
}