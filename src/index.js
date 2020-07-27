import './pages/index.css';
import NewsApi from './scripts/api/news-api';
import MainApi from './scripts/api/main-api';
import Popup from './scripts/popup.js';
import FormValidator from './scripts/formvalidator.js';
import MobileMenu from './scripts/mobile-menu';
import NewsList from './scripts/components/newslist';
import News from './scripts/components/news';
import ViewOrHide from './scripts/components/ViewOrHide';

const auth = sessionStorage.getItem('auth');

const { configNews } = require('./scripts/constants/config');
const { configMain } = require('./scripts/constants/config');

const viewMobileMenu = new MobileMenu(document.getElementById('head'), document.getElementById('nav-mobile'));
const popupAuthUser = new Popup(document.getElementById('authuser'), document.forms.auth);
const popupNewUser = new Popup(document.getElementById('newuser'), document.forms.new);
const popupSuccess = new Popup(document.getElementById('success'));
const ViewOrHideElement = new ViewOrHide();
const mainapi = new MainApi(configMain, popupNewUser, popupSuccess, popupAuthUser, ViewOrHideElement);

if (auth && auth === '1') {
  const buttonSave = document.querySelectorAll('.main_menu_button__save');
  const button = document.querySelectorAll('.open_auth');
  const buttonOut = document.querySelectorAll('.signout');
  const buttonOutimage = document.querySelectorAll('.main_menu_button__auth_image');
  mainapi.getUser();
  if (buttonSave.length > 1) {
    for (let i = 0; i < buttonSave.length; i++) {
      buttonSave[i].classList.remove('nologin');
    }
  }
  if (buttonOutimage.length > 1) {
    for (let i = 0; i < buttonSave.length; i++) {
      buttonOutimage[i].classList.remove('nologin');
    }
  }
  if (buttonOut.length > 1) {
    for (let i = 0; i < buttonSave.length; i++) {
      buttonOut[i].classList.remove('nologin');
    }
  }
  if (button.length > 1) {
    for (let i = 0; i < buttonSave.length; i++) {
      button[i].classList.add('nologin');
    }
  }
}

// регистрация
document.forms.new.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.new.email.value;
  const pass = document.forms.new.pass.value;
  const name = document.forms.new.name.value;
  mainapi.signup(email, pass, name);
});

// авторизация
document.forms.auth.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.auth.email.value;
  const pass = document.forms.auth.pass.value;
  mainapi.signin(email, pass);
});

// Слушатели
document.querySelector('.open_auth').addEventListener('click', (event) => {
  popupAuthUser.open(event);
});

document.querySelector('.open_auth_mobile').addEventListener('click', (event) => {
  popupAuthUser.open(event);
  viewMobileMenu.close(event);
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

// Валидация полей
const popupAuthUserValidate = new FormValidator(document.getElementById('authuser'));
popupAuthUserValidate.setEventListeners(document.querySelector('#email'));
popupAuthUserValidate.setEventListeners(document.querySelector('#pass'));
const popupNewUserValidate = new FormValidator(document.getElementById('newuser'));
popupNewUserValidate.setEventListeners(document.querySelector('#newemail'));
popupNewUserValidate.setEventListeners(document.querySelector('#newpass'));
popupNewUserValidate.setEventListeners(document.querySelector('#name'));

// NEWS
// отрисовка карточек
const newslist = new NewsList(
  document.querySelector('.results_cards'),
  (image, date, title, text, source, link) => {
    const cardItem = new News(image, date, title, text, source, link, null, mainapi);
    cardItem.create();
    return cardItem;
  },
  document.getElementById('noresults'),
  document.getElementById('results_title'),
  document.getElementById('results_cards'),
  document.getElementById('show__button'),
);

// поиск по тегу при клике на поиск
document.forms.search.addEventListener('submit', (event) => {
  event.preventDefault();
  const newstag = document.forms.search.elements.tag.value;
  const newsapi = new NewsApi(configNews, newstag);
  newsapi.getNews()
    .then((data) => {
      newslist.render(data);
    });
});
// .\NEWS
