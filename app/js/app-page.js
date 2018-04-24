import {Cart} from './cart.js';
import {AppSidebar} from './app-sidebar.js';
import {highlightActiveHeaderLink} from './script4.js';

window.globalCurrentApp = {}; //global, Cart now have access to it;

class AppPage {
  constructor() {
    this.initpage();
  }
  
  initpage() {
  	highlightActiveHeaderLink();
    const cart = new Cart('#gotocart');
    const sidebar = new AppSidebar();
  }
}

const page = new AppPage();