// Класс, создающий карточку
export default class News {
  constructor(image, date, title, text, source, link) {
    this.image = image;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.link = link;
  }

  create() {
    /*console.log('Картинка: ', this.image);
    console.log('Date: ', this.date);
    console.log('Title: ', this.title);
    console.log('Text: ', this.text);
    console.log('Source: ', this.source);

     */
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
    // cardImage.style.backgroundImage = `url('${this.link}')`;
    // картинка
    const cardImage = document.createElement('img');
    cardImage.classList.add('results-card__image-content');
    cardImage.src = this.image;
    cardImage.alt = this.title;
    // кнопки
    const hintElement = document.createElement('div');
    hintElement.classList.add('results-card__auth-hint');
    hintElement.classList.add('nodisplay');
    hintElement.textContent = 'Войдите, чтобы сохранять статьи';
    const likeElement = document.createElement('div');
    likeElement.classList.add('results-card__favorite');
    // дата
    const dateElement = document.createElement('span');
    dateElement.classList.add('results-card__date');
    dateElement.textContent = this.date.slice(0,10);
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
    // собираем карточку
    cardImageBlock.appendChild(cardImage);
    cardLink.appendChild(cardImageBlock);
    cardLink.appendChild(dateElement);
    cardLink.appendChild(titleElement);
    cardLink.appendChild(textElement);
    cardLink.appendChild(sourceElement);
    cardContainer.appendChild(cardLink);
    cardContainer.appendChild(hintElement);
    cardContainer.appendChild(likeElement);
    this.cardElement = cardContainer;
    return cardContainer;

    /* if (this.isMyCard) {
      imageLink.appendChild(delButtonElement);
    }*/
  }

  /*
  setEventListeners(element, event) {
    this.cardElement
      .querySelector(element)
      .addEventListener('click', event.bind(this));
  }

  bigImage(event) {
    this.popupBigImage.open(event);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    event.preventDefault();
    const tItem = event.target.closest('.place-card');
    const tContainer = event.target.closest('.places-list');
    tContainer.removeChild(tItem);
    this.removeCard(this.cardId);
  }


}

   */
}
