export default class ShowMore {
  constructor(el) {
    this.el = el;
  }

  view() {
    const hiddenElArray = document.querySelectorAll('div.hidden');
    hiddenElArray[0].classList.remove('hidden');
    hiddenElArray[1].classList.remove('hidden');
    hiddenElArray[2].classList.remove('hidden');
  }

  add(){
    for (let i = 0; i < this.el.length; i++) {
      this.el[i].addEventListener('click', function() {
        const showPerClick = 3;
        const hiddenElArray = this.parentNode.querySelectorAll('div.hidden');
        for (let i = 0; i < showPerClick; i++) {
          if (hiddenElArray.length <= 3) {
            let hiddenElArrayLen = hiddenElArray.length;
            for (let i = 0; i < hiddenElArrayLen; i++) {
              hiddenElArray[i].classList.remove('hidden');
            }
            document.getElementById('show__button').classList.add('nodisplay');
          }
          if(!!hiddenElArray[i]){
            hiddenElArray[i].classList.remove('hidden');
          }
        }
      });
    }
  }

}
