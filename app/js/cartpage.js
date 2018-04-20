import {BigCart} from './bigcart.js';

class CartPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const cart = new BigCart();
  }
}

const page = new CartPage();