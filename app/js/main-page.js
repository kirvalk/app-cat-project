import {Slider} from './slider.js';
import {Cart} from './cart.js';

class MainPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const slider = new Slider('.promo', 7);
    const cart = new Cart();
  }
}

const page = new MainPage();