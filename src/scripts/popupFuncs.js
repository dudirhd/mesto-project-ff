export function openPopupFunc(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

export function closePopupFunc(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

export function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopupFunc(document.querySelector('.popup_is-opened'));
  }
}