export default class MainApi {
  constructor(config, popupNewUser, popupSuccess, popupAuth, ViewOrHideElement) {
    this.config = config;
    this.headers = config.headers;
    this.popupNewUser = popupNewUser;
    this.popupSuccess = popupSuccess;
    this.popupAuth = popupAuth;
    this.ViewOrHideElement = ViewOrHideElement;
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
        this._handleResultSign(data);
      })
      .catch(this._handleError);
  }

  // Вход пользователя
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
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
      .then((data) => this._handleResultSign(data, pop))
      .catch(this._handleError);
  }

  // Получение информации о пользователе
  getUser() {
    this._getUser('/users/me','GET');
  }
  _getUser(url, method) {
    return fetch(this.config.apiUrl + url, {
      method: method,
      credentials: 'include',
      withCredentials: true,
    })
      .then(this._handleResult)
      .then((data) => {
        this._setName(data);
      })
      .catch(this._handleError);
  }
  _setName(data){
    const username = data.name;
    const nameEl = document.getElementsByClassName('username');
    const button = document.querySelectorAll('.signin');
    const buttonOut = document.querySelectorAll('.signout');
    if (nameEl.length > 1) {
      for (let i = 0; i < nameEl.length; i++) {
        nameEl[i].textContent = username;
      }
    }
    if (button.length > 1) {
      for (let i = 0; i < button.length; i++) {
        button[i].classList.add('nologin');
      }
    }
    if (buttonOut.length > 1) {
      for (let i = 0; i < buttonOut.length; i++) {
        buttonOut[i].classList.remove('nologin');
        buttonOut[i].addEventListener('click', (event) => {
          this.signOut();
        });
      }
    }
  }

  // Выходи пользователя
  signOut() {
    this._signOut('/signout','POST');
  }
  _signOut(url, method) {
    sessionStorage.clear();
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
    return fetch(this.config.apiUrl + url, {
      method: method,
      credentials: 'include',
      withCredentials: true,
    })
      .then(this._handleResult)
      .catch(this._handleError);
  }

  // Получение новостей пользователя
  getArticles() {
    return this._getArticles('/articles','GET');
  }
  _getArticles(url, method) {
    return fetch(this.config.apiUrl + url, {
      method: method,
      credentials: 'include',
      withCredentials: true,
    })
      .then(this._handleResult)
      .catch(this._handleError);
  }

  // сохранение новости
  createNews(keyword, title, text, date, source, link, image) {
    console.log(keyword, title, text, date, source, link, image);
    return this._postNews(keyword, title, text, date, source, link, image);
  }
  _postNews(keyword, title, text, date, source, link, image) {
    const url = this.config.apiUrl + '/articles';
    return fetch(
      url,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        headers: this.headers,
        body: JSON.stringify({
          keyword: keyword,
          title: title,
          text: text,
          date: date,
          source: source,
          link: link,
          image: image,
        }),
      },
    )
      .then(this._handleResult)
      .catch(this._handleError);
  }

  // удаление новости
  removeNews(cardId) {
    return this._delNews(cardId);
  }

  _delNews(cardId) {
    const url = this.config.apiUrl + '/articles/' + cardId;
    return fetch(
      url,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        headers: this.headers,
      },
    )
      .then(this._handleResult)
      .catch(this._handleError);
  }

  // handle
  _handleResultSign(res) {
    const popupAuth = document.getElementById('authuser');
    const popupNew = document.getElementById('newuser');
    const errElemNew = document.getElementById('error-up-button_new');
    const errElemAuth = document.getElementById('error-up-button_auth');
    if (res.ok) {
      // console.log('OK');
      sessionStorage.setItem('auth', '1');
      if (popupAuth.classList.contains('popup_is-opened')) {
        this.popupAuth.close();
        this.ViewOrHideElement.view(document.getElementsByClassName('main_menu_button__save'));
        this.ViewOrHideElement.view(document.getElementsByClassName('main_menu_button__auth_image'));
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
  _handleResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return {error: res.status};
    }
  }
  _handleError(e) {
    console.log('Error:', e);
    return { error: e };
  }


  /*

  // собираем статьи пользователя
  getArticles() {
    return this._request('/cards', 'GET');
  }





  _request(url) {
    return fetch(this.config.baseUrl + url, this.config)
      .then(this._handleResult)
      .catch(this._handleError);
  }


   */
}
