import {Loader} from './loader.js';
import {CreditCard} from './credit-card.js';
import {ProgressBar} from './progress-bar.js';
import {randomTime} from './utils.js';

class PaymentPage {
  constructor() {
    this.initpage();
  }

  initpage() {
    const creditCard = new CreditCard(),
          brogressBar = new ProgressBar(2),
          loader = new Loader();

    const nextBtn = document.querySelector('.step2-buttons_right');
    nextBtn.addEventListener('click', ev => {
      ev.preventDefault();
      loader.toggle();
      
      const pr = new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve('./step3.html');
        }, randomTime(3000));
      });

      pr.then(href => {
        loader.toggle();
        location.href = href;
      });
    });
  }
}

const page = new PaymentPage();