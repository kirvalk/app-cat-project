import {manageLoader} from './script4.js';

export class Application {
  constructor(id, price, name, guid){
    this.id = id;
    this.price = price;
    this.name = name;
    this.guid = guid;
  }

}

class Cart {
  constructor() {
    this.apps = [];
  }
  add(appObject) {
    this.apps.push(appObject);
  }
  remove() {}
  render(quantityNode, sumNode) {
    const quantity = this.apps.length;
    quantityNode.textContent = quantity;

    const sum = this.apps.reduce((total, app) => total + app.price, 0);
    sumNode.textContent = sum.toLocaleString('en-Us', { style: 'currency', currency: 'USD' });
  }
  clear() {}
  serialize() {
    return JSON.stringify(this);
  }
  deserialize() {}
  sendToLocal() {
    window.localStorage.setItem('cart', this.serialize());
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
      cart.add(application);

      const numNode = document.querySelector(quantitySelector);
      const sumNode = document.querySelector(sumSelector);
      cart.render(numNode, sumNode);
    }
    return xhr;
  }
  const cartWrapper = document.querySelector('.cartwrapper');
  cartWrapper.addEventListener('click', function(ev) {
    cart.sendToLocal();
    location.href = './step1.html';
  });
}