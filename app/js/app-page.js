import {Cart} from './cart.js';
import {AppSidebar} from './app-sidebar.js';

window.globalCurrentApp = {}; //global, Cart now have access to it;

class AppPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const cart = new Cart();
    const sidebar = new AppSidebar();
  }
}

const page = new AppPage();