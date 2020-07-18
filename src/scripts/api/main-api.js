export default class MainApi {
  constructor(config, popupNewUser, popupSuccess, popupAuth) {
    this.config = config;
    this.headers = config.headers;
    this.popupNewUser = popupNewUser;
    this.popupSuccess = popupSuccess;
    this.popupAuth = popupAuth;
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
        //credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
      .then((data) => this._handleResult(data, pop))
      .catch(this._handleError);
  }

  _handleResult(res) {
    const popupAuth = document.getElementById('authuser');
    const popupNew = document.getElementById('newuser');
    const errElemNew = document.getElementById('error-up-button_new');
    const errElemAuth = document.getElementById('error-up-button_auth');
    if (res.ok) {
      console.log('OK');
      //console.log(localStorage.getItem('jwt'));
      sessionStorage.setItem('auth', '1');
      if (popupAuth.classList.contains('popup_is-opened')) {
        this.popupAuth.close();
        this.getUser();
      }
      if (popupNew.classList.contains('popup_is-opened')) {
        this.popupNewUser.close();
        this.popupSuccess.openSuccess();
      }
      return res.json();
    } else {
      if (res.status === 409) {
        errElemNew.classList.add('popup__error-message_visible');
        errElemNew.textContent = 'Такой Email зарегистрирован';
      }
      if (res.status === 401 || res.status === 400) {
        console.log(errElemAuth);
        errElemAuth.classList.add('popup__error-message_visible');
        errElemAuth.textContent = 'Неверный Email или пароль';
      }
      return {error: res.status};
    }
  }

  _handleError(e) {
    console.log('Error:', e);
    return { error: e };
  }

  getUser() {
  this._getUser('/users/me','GET');
  }

  _getUser(url, method) {
    return fetch(this.config.apiUrl + url, {
      method: method,
      //credentials: 'same-origin',
    })
      .then(this._handleResultT)
      .catch(this._handleError);
  }

  _handleResultT(res) {
    if (res.ok) {
      console.log('OK');
      return res.json();
    } else {
      return {error: res.status};
    }
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
