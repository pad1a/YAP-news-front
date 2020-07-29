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
const mainApi = new MainApi(configMain, popupNewUser, popupSuccess, popupAuthUser, ViewOrHideElement);

if (auth && auth === '1') {
  const buttonsSaveArray = document.querySelectorAll('.main_menu_button__save');
  const buttonArray = document.querySelectorAll('.open_auth');
  const buttonsOutArray = document.querySelectorAll('.signout');
  const buttonsOutimageArray = document.querySelectorAll('.main_menu_button__auth_image');
  mainApi.getUser();
  if (buttonsSaveArray.length > 1) {
    for (let i = 0; i < buttonsSaveArray.length; i++) {
      buttonsSaveArray[i].classList.remove('nologin');
    }
  }
  if (buttonsOutimageArray.length > 1) {
    for (let i = 0; i < buttonsSaveArray.length; i++) {
      buttonsOutimageArray[i].classList.remove('nologin');
    }
  }
  if (buttonsOutArray.length > 1) {
    for (let i = 0; i < buttonsSaveArray.length; i++) {
      buttonsOutArray[i].classList.remove('nologin');
    }
  }
  if (buttonArray.length > 1) {
    for (let i = 0; i < buttonsSaveArray.length; i++) {
      buttonArray[i].classList.add('nologin');
    }
  }
}

// регистрация
document.forms.new.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.new.email.value;
  const pass = document.forms.new.pass.value;
  const name = document.forms.new.name.value;
  mainApi.signup(email, pass, name);
});

// авторизация
document.forms.auth.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.auth.email.value;
  const pass = document.forms.auth.pass.value;
  mainApi.signin(email, pass);
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
const newsList = new NewsList(
  document.querySelector('.results_cards'),
  (image, date, title, text, source, link) => {
    const cardItem = new News(image, date, title, text, source, link, null, mainApi);
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
  const newsTag = document.forms.search.elements.tag.value;
  const newsApi = new NewsApi(configNews, newsTag);
  newsApi.getNews()
    .then((data) => {
      newsList.render(data);
    });
});
// .\NEWS
