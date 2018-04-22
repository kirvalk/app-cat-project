import {Slider} from './slider.js';
import {Cart} from './cart.js';
import {highlightActiveHeaderLink} from './script4.js';


class MainPage {
  constructor() {
    this.initpage();
  }
  initpage() {
  	highlightActiveHeaderLink();
    const slider = new Slider('.promo', 7);
    const cart = new Cart();
  }
}

const page = new MainPage();