export default class MainApi {
  constructor(config) {
    this.config = config;
    this.headers = config.headers;
  }

  // регистрация пользователя
  signup(email, pass, name, popupClose) {
    return this._requestPostSignUp('/signup', 'POST', email, pass, name, popupClose);
  }

  signin(email, pass) {
    return this._requestPostSignIn('/signin', 'POST', email, pass);
  }

  getArticles() {
    return this._getArticles('GET');
  }

  _getArticles() {
    return fetch(this.config.apiUrl + '/articles')
      .then(this._handleResult)
      .catch(this._handleError);
  }

  _requestPostSignUp(url, method, email, pass, name, popupClose) {
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
      .then(this._handleResult(popupClose))
      .catch(this._handleError);
  }

  _requestPostSignIn(url, method, email, pass) {
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
      .then(this._handleResult)
      .catch(this._handleError);
  }

  _handleResult(res, popupClose) {
    if (res.ok) {
      console.log('OK');
      //popupClose.open();
      return res.json();
    }
  }

  _handleError(e) {
    console.log('Error:', e);
    return { error: e };
  }

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
