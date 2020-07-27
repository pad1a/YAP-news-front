export default class NewsApi {
  constructor(config, newstag) {
    this.config = config;
    this.newstag = newstag;
  }

  getNews() {
    return this._request('GET');
  }

  _request() {
    return fetch(`${this.config.reqNewsString}q=${this.newstag}${this.config.apiKey}`)
      .then(this._handleResult)
      .catch(this._handleError);
  }

  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
  }

  _handleError(e) {
    return { error: e };
  }
}
