// Класс открытия закрытия попапа.
export default class Popup {
  constructor(element, form = null, userinfo = null) {
    this.popupElement = element;
    this.formElement = form;
    this.userinfoElement = userinfo;
  }
  setEventListeners() {
    this.popupElement
      .querySelector('.popup__close')
      .addEventListener('click', this.close.bind(this));
    this.popupElement
      .querySelector('.popup__overlay')
      .addEventListener('click', this.close.bind(this));
  }

  open(event) {
    this.setEventListeners();
    event.target.classList.contains('main_menu_button__auth') || event.target.classList.contains('popup__form_auth-link') || event.target.classList.contains('popup__form_newuser-link')
      this.popupElement.classList.add('popup_is-opened');
      const popUpButton = this.formElement.querySelector('.popup__button');
      popUpButton.setAttribute('disabled', true);
      popUpButton.classList.add('popup__button_disabled');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    if (this.formElement) {
      this.formElement.reset();
    }
  }
}
