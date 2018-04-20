import {Slider} from './slider.js';

class MainPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const slider = new Slider('.promo', 9);
  }
}

const page = new MainPage();