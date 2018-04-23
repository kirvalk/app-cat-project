import {Loader} from './loader.js';
import {CreditCard} from './credit-card.js';
import {ProgressBar} from './progress-bar.js';

class PaymentPage {
  constructor() {
    this.initpage();
  }

  initpage() {
    const brogressBar = new ProgressBar(2);
    const nextBtn = document.querySelector('.step2-buttons_right');
    const loader = new Loader();
    const creditCard = new CreditCard();
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