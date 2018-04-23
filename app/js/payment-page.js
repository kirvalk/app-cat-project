import {Loader} from './loader.js';

class PaymentPage {
  constructor() {
    this.initpage();
  }
  
  initpage() {
    const nextBtn = document.querySelector('.step2-buttons_right');
    const loader = new Loader();
    nextBtn.addEventListener('click', ev => {
      ev.preventDefault();
      loader.toggle();
      const pr = new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve('./step3.html');
        }, this._randomTime(3000));
      });
      pr.then(href => {
        loader.toggle();
        location.href = href;
      });
    });
  }

  _randomTime(max) {
    return Math.floor(Math.random() * max);
  }
}

const page = new PaymentPage();