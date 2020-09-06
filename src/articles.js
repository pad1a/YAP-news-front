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

const mainApi = new MainApi(configMain, null, null, null, null);
const viewMobileMenu = new MobileMenu(document.getElementById('head'), document.getElementById('nav-mobile'));

const newsList = new NewsList(
  document.querySelector('.results_cards'),
  (image, date, title, text, source, link, keyword, id) => {
    const cardItem = new News(image, date, title, text, source, link, keyword, mainApi, id);
    cardItem.createSave();
    return cardItem;
  }, null, null, null, null,
);

mainApi.getUser();

mainApi.getArticles()
  .then((data) => {
    const newsSum = document.querySelector('.search_text__num');
    const newsTag = document.querySelector('.search_text__tag');
    const newsTagsArray = document.querySelector('.search_text__numtag');
    const keywordsArray = [];
    for (let i = 0; i < data.data.length; i++) {
      keywordsArray[i] = data.data[i].keyword;
    }
    const resultReduce = keywordsArray.reduce((acc, cur) => {
      if (!acc.hash[cur]) {
        acc.hash[cur] = { [cur]: 1 };
        acc.map.set(acc.hash[cur], 1);
        acc.resultArray.push(acc.hash[cur]);
      } else {
        acc.hash[cur][cur] += 1;
        acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
      }
      return acc;
    }, {
      hash: {},
      map: new Map(),
      resultArray: [],
    });
    const resultArray = resultReduce.resultArray.sort((a, b) => resultReduce.map.get(b) - resultReduce.map.get(a));
    const tagOne = Object.keys(resultArray[0]);
    const tagTwo = Object.keys(resultArray[1]);
    newsSum.textContent = data.data.length;
    newsTag.textContent = `${tagOne[0]}, ${tagTwo[0]}`;
    newsTagsArray.textContent = resultArray.length - 2;
    newsList.renderSaveNews(data);
  });


document.querySelector('.nav_burger__open').addEventListener('click', (event) => {
  viewMobileMenu.open(event);
});
