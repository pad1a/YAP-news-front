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
    // this.mainapi = mainapi;
  }

  render(initNews) {
    const initCards = initNews.articles;
    if (initNews.articles.length === 0) {
      this.noresblock.classList.remove('nodisplay');
      this.restitle.classList.add('nodisplay');
      this.showbutton.classList.add('nodisplay');
      this.rescards.textContent = '';
    } else {
      this.noresblock.classList.add('nodisplay');
      this.restitle.classList.remove('nodisplay');
      this.showbutton.classList.remove('nodisplay');
      this.rescards.textContent = '';
      for (let i = 0; i < initCards.length; i++) {
        this.addCard(
          this.createcarditem(
            initCards[i].urlToImage, initCards[i].publishedAt, initCards[i].title, initCards[i].description, initCards[i].source.name, initCards[i].url,
          ),
        );
      }
    }
  }

  renderSaveNews(SaveNews) {
    const initCards = SaveNews.data;
    for (let i = 0; i < initCards.length; i++) {
      this.addCardSave(
        this.createcarditem(
          initCards[i].image, initCards[i].date, initCards[i].title, initCards[i].text, initCards[i].source, initCards[i].link, initCards[i].keyword, SaveNews.data[i]._id,
        ),
      );
    }
  }

  addCard(cardItem) {
    cardItem.setEventListeners('#add_button', cardItem.add);
    this.massive.push(cardItem);
    this.container.appendChild(cardItem.cardElement);
  }

  addCardSave(cardItem) {
    cardItem.setEventListeners('#del_button', cardItem.remove);
    this.massive.push(cardItem);
    this.container.appendChild(cardItem.cardElement);
  }
}
