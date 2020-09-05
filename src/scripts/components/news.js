// Класс, создающий карточку
export default class News {
  constructor(image, date, title, text, source, link, keyword, mainapi, id, isSavedNews) {
    this.image = image;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.link = link;
    this.keyword = keyword;
    this.mainapi = mainapi;
    this.id = id;
    this.issave = '';
    this.issaveArray = [];
    this.isSavedNews = isSavedNews;
  }

  isSaved(datalink){
    const linksArray = [];
    for (let i = 0; i < datalink.data.length; i++) {
      const link = datalink.data[i].link;
      linksArray.push(link);
      this.issaveArray.concat(linksArray);
    }
    if (!linksArray.includes(this.link)) {
      this.issave = 1;
    } else {
      this.issave = 2;
      const CardButtonFavorite = this.cardElement.querySelector('.results-card__favorite');
      CardButtonFavorite.classList.add('results-card__favorite_marked');
      CardButtonFavorite.id = '';

    }
  }

  create() {
    this.mainapi.getArticles()
    .then((data) => {
      this.isSaved(data);
    });
    const auth = sessionStorage.getItem('auth');
    // div карточки
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('results-card');
    cardContainer.classList.add('hidden');
    // сслка карточки
    const cardLink = document.createElement('a');
    cardLink.classList.add('results-card__link');
    cardLink.classList.add('link');
    cardLink.href = this.link;
    cardLink.target = '_blank';
    // div картинки
    const cardImageBlock = document.createElement('div');
    cardImageBlock.classList.add('results-card__image');
    // картинка
    const cardImage = document.createElement('img');
    cardImage.classList.add('results-card__image-content');
    cardImage.src = this.image;
    cardImage.alt = this.title;
    // кнопки
    const hintElement = document.createElement('div');
    hintElement.classList.add('results-card__auth-hint');
    hintElement.textContent = 'Войдите, чтобы сохранять статьи';

    const likeElement = document.createElement('div');
    likeElement.classList.add('results-card__favorite');
    likeElement.id = 'add_button';
    // дата
    const dateElement = document.createElement('span');
    dateElement.classList.add('results-card__date');
    dateElement.textContent = this.date.slice(0, 10);
    // тайтл
    const titleElement = document.createElement('h3');
    titleElement.classList.add('results-card__title');
    if (this.title.length > 46) {
      titleElement.textContent = `${this.title.slice(0, 46)}...`;
    } else {
      titleElement.textContent = this.title;
    }
    // текст
    const textElement = document.createElement('p');
    textElement.classList.add('results-card__text');
    if (this.text.length > 150) {
      textElement.textContent = `${this.text.slice(0, 150)}...`;
    } else {
      textElement.textContent = this.text;
    }
    // источник
    const sourceElement = document.createElement('a');
    sourceElement.classList.add('results-card__source');
    sourceElement.textContent = this.source;

    // тег
    const tagElement = document.createElement('div');
    tagElement.classList.add('results-card__tag');
    tagElement.textContent = this.keyword;

    // собираем карточку
    cardImageBlock.appendChild(cardImage);
    cardLink.appendChild(cardImageBlock);
    cardLink.appendChild(dateElement);
    cardLink.appendChild(titleElement);
    cardLink.appendChild(textElement);
    cardLink.appendChild(sourceElement);
    cardContainer.appendChild(cardLink);
    cardContainer.appendChild(likeElement);
    if (!auth && auth !== '1') {
      cardContainer.appendChild(hintElement);
    }
    this.cardElement = cardContainer;
    return cardContainer;
  }

  createSave() {
    // div карточки
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('results-card');
    // сслка карточки
    const cardLink = document.createElement('a');
    cardLink.classList.add('results-card__link');
    cardLink.classList.add('link');
    cardLink.href = this.link;
    cardLink.target = '_blank';
    // div картинки
    const cardImageBlock = document.createElement('div');
    cardImageBlock.classList.add('results-card__image');
    // картинка
    const cardImage = document.createElement('img');
    cardImage.classList.add('results-card__image-content');
    cardImage.src = this.image;
    cardImage.alt = this.title;
    // кнопки
    const hintElement = document.createElement('div');
    hintElement.classList.add('results-card__auth-hint');
    hintElement.textContent = 'Войдите, чтобы сохранять статьи';

    const likeElement = document.createElement('div');
    likeElement.classList.add('results-card__favorite');
    likeElement.classList.add('results-card__favorite-trash');
    likeElement.id = 'del_button';

    // дата
    const dateElement = document.createElement('span');
    dateElement.classList.add('results-card__date');
    dateElement.textContent = this.date.slice(0, 10);
    // тайтл
    const titleElement = document.createElement('h3');
    titleElement.classList.add('results-card__title');
    if (this.title.length > 46) {
      titleElement.textContent = `${this.title.slice(0, 46)}...`;
    } else {
      titleElement.textContent = this.title;
    }
    // текст
    const textElement = document.createElement('p');
    textElement.classList.add('results-card__text');
    if (this.text.length > 150) {
      textElement.textContent = `${this.text.slice(0, 150)}...`;
    } else {
      textElement.textContent = this.text;
    }
    // источник
    const sourceElement = document.createElement('a');
    sourceElement.classList.add('results-card__source');
    sourceElement.textContent = this.source;

    // тег
    const tagElement = document.createElement('div');
    tagElement.classList.add('results-card__tag');
    tagElement.textContent = this.keyword;

    // собираем карточку
    cardImageBlock.appendChild(cardImage);
    cardLink.appendChild(cardImageBlock);
    cardLink.appendChild(dateElement);
    cardLink.appendChild(titleElement);
    cardLink.appendChild(textElement);
    cardLink.appendChild(sourceElement);
    cardContainer.appendChild(cardLink);
    cardContainer.appendChild(likeElement);
    cardContainer.appendChild(tagElement);
    this.cardElement = cardContainer;
    return cardContainer;
  }

  setEventListeners(element, event) {
    this.cardElement
      .querySelector(element)
      .addEventListener('click', event.bind(this));
  }

  add(event) {
    let apiNews = this.mainapi;
    let cardEl = this.cardElement;
    let titleEl = this.title;
    let textEl = this.text;
    let dateEl = this.date;
    let sourceEl = this.source;
    let linkEl = this.link;
    let imageEl = this.image;
    async function saveNews() {
      const newsTag = document.forms.search.elements.tag.value;
      let promise = apiNews.createNews(newsTag, titleEl, textEl, dateEl, sourceEl, linkEl, imageEl);
      let res = await promise;
      if (!res.data){
        alert('Что-то пошло не так...')
      } else {
        alert('Новость сохранена');
        const CardButtonFavorite = cardEl.querySelector('.results-card__favorite');
        CardButtonFavorite.classList.add('results-card__favorite_marked');
        cardEl.querySelector('#add_button').removeEventListener('click', event);
      }
    }
    saveNews();
  }

  remove(event) {
    let apiNews = this.mainapi;
    let cardId = this.id;
    async function delNews(api, id) {
      let promise = api.removeNews(id);
      let res = await promise;
      if (res.message === 'Новость удалена') {
        const tItem = event.target.closest('.results-card');
        const tContainer = event.target.closest('.results_cards');
        const newsnumEl = document.querySelector('.search_text__num');
        const newsNum = +newsnumEl.textContent - 1;
        newsnumEl.textContent = newsNum;
        tContainer.removeChild(tItem);
        alert(res.message);
      } else {
        alert('Что то пошло не так...');
      }
    }
    delNews(apiNews, cardId);
  }
}
