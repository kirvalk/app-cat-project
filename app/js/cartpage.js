import {BigCart} from './bigcart.js';
import {ProgressBar} from './progress-bar.js';

class CartPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const cart = new BigCart();
    const progressBar = new ProgressBar(1);
    const nextBtn = document.querySelector('.step1-btn');
    nextBtn.addEventListener('click', ev => {
    	ev.preventDefault();
    	location.href = './step2.html';
    });
  }
}

const page = new CartPage();