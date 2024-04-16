//Открыть попап
export function openPopupFunc(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//Закрыть по Esc
export function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopupFunc(document.querySelector('.popup_is-opened'));
  }
}
//Закрыть попап
export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains("popup")) {
    closePopupFunc(evt.currentTarget);
    document.removeEventListener('keydown', closePopupByEsc);
  }
}

export function closePopupFunc(element) { 
  element.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', closePopupByEsc); 
} 