import {Loader} from './loader.js';
import {Contacts} from './contacts.js';
import {ProgressBar} from './progress-bar.js';
import {randomTime} from './utils.js';

class ContactPage {
  constructor() {
    this.initpage();
  }

  initpage() {
    const contacts = new Contacts(),
          brogressBar = new ProgressBar(3),
          loader = new Loader();

    const nextBtn = document.querySelector('.step3-buttons_right');
    nextBtn.addEventListener('click', ev => {
      ev.preventDefault();
      loader.toggle();

      const pr = new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve('./step4.html');
        }, randomTime(3000));
      });
      
      pr.then(href => {
        loader.toggle();
        location.href = href;
        localStorage.removeItem('cart');
      });
    });
  }
}

const page = new ContactPage();