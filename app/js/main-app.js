import {highlightActiveHeaderLink} from './script4.js';
import {initAppPageContent} from './appscript.js';
import {cartInit} from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
  highlightActiveHeaderLink();
  initAppPageContent('./api/app_packages.json');
  cartInit('#gotocart', '#cart__num', '#cart__sum','./api/');

});