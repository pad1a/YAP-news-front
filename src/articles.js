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
  }, null, null, null, null,
);

mainapi.getUser();

mainapi.getArticles()
  .then((data) => {
    const newssum = document.querySelector('.search_text__num');
    const newstag = document.querySelector('.search_text__tag');
    const newstags = document.querySelector('.search_text__numtag');
    const keywords = [];
    for (let i = 0; i < data.data.length; i++) {
      keywords[i] = data.data[i].keyword;
    }
    const resultReduce = keywords.reduce((acc, cur) => {
      if (!acc.hash[cur]) {
        acc.hash[cur] = { [cur]: 1 };
        acc.map.set(acc.hash[cur], 1);
        acc.result.push(acc.hash[cur]);
      } else {
        acc.hash[cur][cur] += 1;
        acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
      }
      return acc;
    }, {
      hash: {},
      map: new Map(),
      result: [],
    });
    const result = resultReduce.result.sort((a, b) => resultReduce.map.get(b) - resultReduce.map.get(a));
    const tagOne = Object.keys(result[0]);
    const tagTwo = Object.keys(result[1]);
    newssum.textContent = data.data.length;
    newstag.textContent = `${tagOne[0]}, ${tagTwo[0]}`;
    newstags.textContent = result.length - 2;
    newslist.renderSaveNews(data);
  });


document.querySelector('.nav_burger__open').addEventListener('click', (event) => {
  viewMobileMenu.open(event);
});
