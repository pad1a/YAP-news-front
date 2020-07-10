import './pages/index.css';
import Popup from './scripts/popup.js';
import FormValidator from './scripts/formvalidator.js';
import MobileMenu from './scripts/mobile-menu';

// Пример обрезки текста новости. (сделать в класс и по всем селекторам!)
const size = 75;
const newsContent = document.querySelector('.results-card__text');
const newsText = newsContent.innerHTML;
if (newsText.length > size) {
  newsContent.innerHTML = `${newsText.slice(0, size)} ...`;
}
const viewMobileMenu = new MobileMenu(document.getElementById('head'), document.getElementById('nav-mobile'));
const popupAuthUser = new Popup(document.getElementById('authuser'), document.forms.auth);
const popupNewUser = new Popup(document.getElementById('newuser'), document.forms.new);
const popupSuccess = new Popup(document.getElementById('success'));

// Валидация полей
const popupAuthUserValidate = new FormValidator(document.getElementById('authuser'));
popupAuthUserValidate.setEventListeners(document.querySelector('#email'));
popupAuthUserValidate.setEventListeners(document.querySelector('#pass'));
const popupNewUserValidate = new FormValidator(document.getElementById('newuser'));
popupNewUserValidate.setEventListeners(document.querySelector('#newemail'));
popupNewUserValidate.setEventListeners(document.querySelector('#newpass'));
popupNewUserValidate.setEventListeners(document.querySelector('#name'));

document.querySelector('.main_menu_button__auth').addEventListener('click', (event) => {
  popupAuthUser.open(event);
});
document.querySelector('.popup__form_newuser-link').addEventListener('click', (event) => {
  popupAuthUser.close(event);
  popupNewUser.open(event);
});
document.querySelector('.popup__form_auth-link').addEventListener('click', (event) => {
  popupNewUser.close(event);
  popupAuthUser.open(event);
});
document.querySelector('.popup__form_success-link').addEventListener('click', (event) => {
  popupSuccess.close(event);
  popupAuthUser.open(event);
});
document.querySelector('.nav_burger__open').addEventListener('click', (event) => {
  viewMobileMenu.open(event);
});
