import {Application} from './application.js';

export class Cart {
  constructor(selector = '') {
    this.btnSelector = selector;
    this.apps = [];
    this.init();
  }

  add(appObject) {
    this.apps.push(appObject);
  }

  render() {
    const quantityNode = document.querySelector('#cart__num');
    quantityNode.textContent = this.apps.length;

    const sum = this.apps.reduce((total, app) => total + app.price, 0);
    const sumNode = document.querySelector('#cart__sum');
    sumNode.textContent = sum.toLocaleString('en-Us', { style: 'currency', currency: 'USD' });
  }

  serialize() {
    return JSON.stringify(this);
  }

  sendToLocal() {
    window.localStorage.setItem('cart', this.serialize());
  }

  init () {
    if (window.localStorage.getItem('cart')) {
      const localData = [...JSON.parse(window.localStorage.getItem('cart')).apps];
      localData.forEach(app => this.add(new Application(app.id, app.price)));
    } else {
      this.sendToLocal();
    }

    this.render();

    try {
      const toCartBtn = document.querySelector(this.btnSelector);
      toCartBtn.addEventListener('click', ev => {
        ev.preventDefault();
        this.add(globalCurrentApp);
        this.sendToLocal();
        this.render();
      });
    } catch (e) {
      console.log('нет кнопки на этой странице');
    } 

    const cartWrapper = document.querySelector('.cartwrapper');
    cartWrapper.addEventListener('click', () => location.href = './step1.html');
  }
}
