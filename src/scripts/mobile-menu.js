// класс открытия закрытия мобильного меню
export default class MobileMenu {
  constructor(elementHead, elementMenu) {
    this.headElement = elementHead;
    this.menuElement = elementMenu;
  }

  setEventListeners() {
    this.headElement
      .querySelector('.nav_burger__close')
      .addEventListener('click', this.close.bind(this));
  }

  open(event) {
    this.setEventListeners();
    event.target.classList.contains('nav_burger__open');
    if (!this.headElement.classList.contains('head__save')){
      this.headElement.classList.add('mobile-menu_is-opened');
    }
    this.headElement.querySelector('.nav_burger__open').classList.add('nav_burger__hide');
    this.headElement.querySelector('.nav_burger__close').classList.remove('nav_burger__hide');
    this.menuElement.classList.add('nav-mobile__open');
  }

  close() {
    this.headElement.classList.remove('mobile-menu_is-opened');
    this.headElement.querySelector('.nav_burger__open').classList.remove('nav_burger__hide');
    this.headElement.querySelector('.nav_burger__close').classList.add('nav_burger__hide');
    this.menuElement.classList.remove('nav-mobile__open');
  }
}
