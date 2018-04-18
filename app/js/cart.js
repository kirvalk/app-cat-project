import {manageLoader} from './script4.js';

class Application {
  constructor(id, price){
    this.id = id;
    this.price = price;
    this.quantity = 1;
  }

  goToCart(cartObj){
    const elemAlreadyAdded = cartObj.find(app => app.id === this.id);
    elemAlreadyAdded ? elemAlreadyAdded.quantity += 1 : cartObj.push(this);
    console.log(cartObj);
  }
}

class Cart extends Array {
  sum() {
    return this.reduce((total, app) => total + app.price * app.quantity, 0);
  }
  num() {
    return this.reduce((total, app) => total + app.quantity, 0);
  }
  updateCartInfo(quantityNode, sumNode) {
    quantityNode.textContent = this.num();
    sumNode.textContent = this.sum().toLocaleString('en-Us', { style: 'currency', currency: 'USD' });
  }
}

export function cartInit(addBtnSelector, quantitySelector, sumSelector, apiPath) {
  const cart = new Cart();
  const toCartBtn = document.querySelector(addBtnSelector);
  toCartBtn.addEventListener('click', addHandler);

  function addHandler (ev) {
    ev.preventDefault();
    const index = this.dataset.id;
    const xhr = createCartXhr();
    xhr.open("GET", `${apiPath}app_package${index}.json`, true);
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

      const numNode = document.querySelector(quantitySelector);
      const sumNode = document.querySelector(sumSelector);
      cart.updateCartInfo(numNode, sumNode);
    }
    return xhr;
  }
}