// Класс для хранения и отрисовки карточек новостей.
export default class NewsList {
  constructor(container, createcarditem, noresblock, restitle, rescards, showbutton) {
    this.container = container;
    this.massive = [];
    this.createcarditem = createcarditem;
    this.noresblock = noresblock;
    this.restitle = restitle;
    this.rescards = rescards;
    this.showbutton = showbutton;

  }

  render(initNews) {
    const initCards = initNews.articles;
    if (initNews.articles.length === 0) {
      console.log(initNews.articles.length);
      this.noresblock.classList.remove('nodisplay');
      this.restitle.classList.add('nodisplay');
      this.showbutton.classList.add('nodisplay');
      this.rescards.textContent = '';
    } else {
      this.noresblock.classList.add('nodisplay');
      this.restitle.classList.remove('nodisplay');
      this.showbutton.classList.remove('nodisplay');
    for (let i = 0; i < initCards.length; i++) {
      this.addCard(
        this.createcarditem(
          initCards[i].urlToImage, initCards[i].publishedAt, initCards[i].title, initCards[i].description, initCards[i].source.name, initCards[i].url,
        ),
      );
    }
    }
  }

  addCard(cardItem) {
    //cardItem.setEventListeners('.place-card__like-icon', cardItem.like);
    //cardItem.setEventListeners('.place-card__image', cardItem.bigImage);
    this.massive.push(cardItem);
    this.container.appendChild(cardItem.cardElement);
  }
}
