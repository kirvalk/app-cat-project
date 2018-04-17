import {highlightActiveHeaderLink} from './script4.js';
import {initAppPageContent} from './appscript.js';
import {manageLoader} from './script4.js';
import {Cart} from './cart.js';
import {Application} from './cart.js';


document.addEventListener('DOMContentLoaded', function() {
  highlightActiveHeaderLink();
  initAppPageContent('./api/app_packages.json');
  const cart = new Cart();
  const toCartBtn = document.querySelector('#gotocart');
  toCartBtn.addEventListener('click', addHandler);

  function addHandler (ev) {
    ev.preventDefault();
    const index = this.dataset.id;
    const xhr = createCartXhr();
    xhr.open("GET", `./api/app_package${index}.json`, true);
    xhr.send();
  }

  function createCartXhr() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', responseHandler);
    xhr.addEventListener('readystatechange', manageLoader);

    function responseHandler(){
      if (this.readyState !== 4 || this.status !== 200) return;
      const app = JSON.parse(this.responseText);
      const application = new Application(app.id, app.price);
      application.goToCart(cart);

      const numNode = document.querySelector('#cart__num');
      const sumNode = document.querySelector('#cart__sum');
      cart.updateCartInfo(numNode, sumNode);
    }
    return xhr;
  }

});