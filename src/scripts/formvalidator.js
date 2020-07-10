// Класс валидации форм
export default class FormValidator {
  constructor(popupElement) {
    this.popupElement = popupElement;
  }

  checkInputValidity(element) {
    element = element.target;
    const errorElement = this.popupElement.querySelector(`#error-${element.id}`);
    if (!this.inputEmpty(element)) {
      const errorMessage = 'Это обязательное поле';
      errorElement.textContent = errorMessage;
      this.activateError(element);
      this.setSubmitButtonState(element);
      return false;
    }

    if (!element.classList.contains('popup__input_type_email') && !this.inputLen(element)) {
      const errorMessage = 'Должно быть от 2 до 30 символов';
      errorElement.textContent = errorMessage;
      this.activateError(element);
      this.setSubmitButtonState(element);
      return false;
    }
    if (element.classList.contains('popup__input_type_email') && !this.validateEmail(element)) {
      const errorMessage = 'Неправильный формат email';
      errorElement.textContent = errorMessage;
      this.activateError(element);
      this.setSubmitButtonState(element);
      return false;
    }
    this.setSubmitButtonState(element);
    return true;
  }

  setSubmitButtonState(element) {
    const button = element.closest('.popup__form').querySelector('.button');
    const input = element.closest('.popup__form').querySelectorAll('.error');
    if (input.length !== 0) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  }

  // метод проверки на пустое поле
  inputEmpty(element) {
    if (element.value.length === 0) {
      return false;
    }
    this.resetError(element);
    return true;
  }

  // метод проверки на длинну поля
  inputLen(element) {
    if (element.value.length === 1 || element.value.length > 30) {
      return false;
    }
    this.resetError(element);
    return true;
  }

  // метод валидации Email
  validateEmail(element) {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(element.value)) {
      return true;
    }
    this.resetError(element);
    return false;
  }

  // метод показа ошибки
  activateError(element) {
    const parent = element.closest('.input-container');
    parent.classList.add('input-container__invalid');
    parent.querySelector('.popup__input').classList.add('error');
  }

  // метод скрытия ошибки
  resetError(element) {
    const parent = element.closest('.input-container');
    parent.classList.remove('input-container__invalid');
    element.textContent = '';
    parent.querySelector('.popup__input').classList.remove('error');
  }

  setEventListeners(element) {
    element.addEventListener('input', this.checkInputValidity.bind(this));
  }
}
