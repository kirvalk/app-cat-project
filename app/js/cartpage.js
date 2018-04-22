import {BigCart} from './bigcart.js';

class CartPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const cart = new BigCart();
    const nextBtn = document.querySelector('.step1-btn');
    nextBtn.addEventListener('click', ev => {
    	ev.preventDefault();
    	location.href = './step2.html';
    });
  }
}

const page = new CartPage();