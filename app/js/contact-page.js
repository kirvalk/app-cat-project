import {Loader} from './loader.js';
import {Contacts} from './contacts.js';

class ContactPage {
  constructor() {
    this.initpage();
  }

  initpage() {
    const nextBtn = document.querySelector('.step3-buttons_right');
    const loader = new Loader();
    const contacts = new Contacts();
    nextBtn.addEventListener('click', ev => {
      ev.preventDefault();
      loader.toggle();
      const pr = new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve('./step4.html');
        }, this._randomTime(3000));
      });
      pr.then(href => {
        loader.toggle();
        location.href = href;
        localStorage.removeItem('cart');
      });
    });
  }

  _randomTime(max) {
    return Math.floor(Math.random() * max);
  }
}

const page = new ContactPage();