import {manageLoader} from './script4.js';

class PaymentPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const nextBtn = document.querySelector('.step2-buttons_right');
    const loader = document.querySelector('.cssload-loader');
    const all = document.querySelectorAll('*');
    nextBtn.addEventListener('click', ev => {
      ev.preventDefault();
      all.forEach(elem => elem.style.pointerEvents = 'none');
      loader.classList.remove('cssload-loader-hidden');
      const pr = new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve('./step3.html');
        }, this._randomTime(3000));
      });
      pr.then(href => {
        all.forEach(elem => elem.style.pointerEvents = 'auto');
        loader.classList.add('cssload-loader-hidden');
        location.href = href;
      });
    });
  }

  _randomTime(max) {
    return Math.floor(Math.random() * max);
  }

  _blockElems() {
    const all = document.querySelectorAll('*');

  }
}

const page = new PaymentPage();