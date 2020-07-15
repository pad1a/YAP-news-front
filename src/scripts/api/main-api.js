export default class MainApi {
  constructor(config, popupNewUser, popupSuccess) {
    this.config = config;
    this.headers = config.headers;
    this.popupNewUser = popupNewUser;
    this.popupSuccess = popupSuccess;
  }

  // регистрация пользователя
  signup(email, pass, name) {
    this._requestPostSignUp('/signup', 'POST', email, pass, name);
  }

  _requestPostSignUp(url, method, email, pass, name) {
    return fetch(
      this.config.apiUrl + url,
      {
        method: method,
        headers: this.headers,
        body: JSON.stringify({
          email: email,
          password: pass,
          name: name
        })
      })
      .then((data) => {
        // console.log('data =', data);
        this._handleResult(data);
      })
      .catch(this._handleError);
  }

  signin(email, pass) {
    return this._requestPostSignIn('/signin', 'POST', email, pass);
  }

  _requestPostSignIn(url, method, email, pass) {
    const pop = this.popupNewUser;
    return fetch(
      this.config.apiUrl + url,
      {
        method: method,
        headers: this.headers,
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
      .then((data) => this._handleResult(data, pop))
      .catch(this._handleError);
  }

  _handleResult(res) {
    if (res.ok) {
      console.log('OK', res.json());
      sessionStorage.setItem('auth', '1');
      this.popupNewUser.close();
      this.popupSuccess.open();
      return res.json();
    } else {
      //console.log(this.popupNewUser);
      if (res.status === 409) {
        const errElem = document.getElementById('error-up-button_new')
        errElem.classList.add('popup__error-message_visible');
        errElem.textContent = 'Такой Email зарегистрирован';

      }

      //console.log("Ошибка HTTP: " + res.status);
      //console.log(res.json());
      // this.popupNewUser.close();
      return {error: res.status};
    }
  }

  _handleError(e) {
    console.log('Error:', e);
    return { error: e };
  }

  /*getArticles() {
    return this._getArticles('GET');
  }

  _getArticles() {
    return fetch(this.config.apiUrl + '/articles')
      .then(this._handleResult)
      .catch(this._handleError);
  }

   */

  /*
  // авторизация пользователя
  signin() {

  }

  // получение информации о пользователе
  getUserData() {
    return this._request('/users/me', 'GET');
  }

  // собираем статьи пользователя
  getArticles() {
    return this._request('/cards', 'GET');
  }

  // сохранение новости
  createArticle(placeName, placeLink) {
    return this._requestPost('/cards', 'POST', placeName, placeLink);
  }

  // удаляет новость
  removeArticle(cardId) {
    return this._requestDel('/cards/', 'DELETE', cardId);
  }

  _requestDel(url, method, cardId) {
    return fetch(
      this.config.baseUrl + url + cardId,
      {
        method,
        headers: this.headers,
      },
    )
      .then(this._handleResult)
      .catch(this._handleError);
  }


  _request(url) {
    return fetch(this.config.baseUrl + url, this.config)
      .then(this._handleResult)
      .catch(this._handleError);
  }


   */
}
