import './pages/articles.css';
import MobileMenu from './scripts/mobile-menu';

const auth = sessionStorage.getItem('auth');
if (!auth && auth !== '1') {
  location = './';
} else {
  // скрыть все
}
// Пример обрезки текста новости. (сделать в класс и по всем селекторам!)
const size = 75;
const newsContent = document.querySelector('.results-card__text');
const newsText = newsContent.innerHTML;
if (newsText.length > size) {
  newsContent.innerHTML = `${newsText.slice(0, size)} ...`;
}

const viewMobileMenu = new MobileMenu(document.getElementById('head'), document.getElementById('nav-mobile'));
document.querySelector('.nav_burger__open').addEventListener('click', (event) => {
  viewMobileMenu.open(event);
});
