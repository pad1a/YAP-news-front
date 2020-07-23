export default class ViewOrHide {
  constructor(mainapi) {
    this.mainapi = mainapi;
  }

  view(el) {
    if (el.length > 1) {
      for (let i = 0; i < el.length; i++) {
        if (el[i].classList.contains('nologin')) {
          el[i].classList.remove('nologin');
        }
      }
    } else {
      if (el.classList.contains('nologin')) {
        el.classList.remove('nologin');
      }
    }
  }
}
