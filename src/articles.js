import './pages/articles.css';
import MobileMenu from './scripts/mobile-menu';
import MainApi from './scripts/api/main-api';
import NewsList from './scripts/components/newslist';
import News from './scripts/components/news';

const { configMain } = require('./scripts/constants/config');

const auth = sessionStorage.getItem('auth');
if (!auth && auth !== '1') {
  location = './';
}

const mainapi = new MainApi(configMain, null, null, null, null);
const viewMobileMenu = new MobileMenu(document.getElementById('head'), document.getElementById('nav-mobile'));

const newslist = new NewsList(
  document.querySelector('.results_cards'),
  (image, date, title, text, source, link, keyword, id) => {
    const cardItem = new News(image, date, title, text, source, link, keyword, mainapi, id);
    cardItem.createSave();
    return cardItem;
  },null,null,null,null,
);

mainapi.getUser();

mainapi.getArticles()
  .then((data) => {
    const newsnum = document.querySelector('.search_text__num');
    const newstag = document.querySelector('.search_text__tag');
    newsnum.textContent = data.data.length;
    newstag.textContent = data.data[0].keyword;
    // console.log(data.data[0]._id);
    // console.log(data);
    newslist.renderSaveNews(data);
  });



document.querySelector('.nav_burger__open').addEventListener('click', (event) => {
  viewMobileMenu.open(event);
});

