import {Application} from './cart.js';

export class BigCart {
  constructor() {
    this.apps = [];
    this.init();
  }

  init() {
    const storage = [...JSON.parse(window.localStorage.getItem('cart')).apps];
    for (let i = 0; i < storage.length; i++) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `./api/app_package${storage[i].id}.json`, true);
      xhr.addEventListener('readystatechange', ev => {
        if (ev.target.readyState !== 4 || ev.target.status !== 200) return;
        const resp = JSON.parse(ev.target.responseText);
        const application = new Application (resp.id, resp.price, resp.title, resp.guid);
        this.add(application);
        if (this.apps.length === storage.length) {
          this.render();
        }
      });
      xhr.send();
    }
  }

  serialize() {
    return JSON.stringify(this);
  }
  
  sendToLocal() {
    window.localStorage.setItem('cart', this.serialize());
  }

  remove(id) {
    this.apps = this.apps.filter(app => app.id != id);
  }

  add(appObject) {
    this.apps.push(appObject);
  }

  updateCurrentValue(id) {
    const row = document.querySelector(`.basket__row[data-id="${id}"]`);
    const valueNode = row.querySelector('.app-total');
    const value = this.apps.reduce((accum, app) => app.id == id ? accum + app.price : accum, 0);
    valueNode.textContent = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  updateTotal() {
    const first = document.querySelector('.basket__total-first'),
          second = document.querySelector('.basket__total-second'),
          total = this.apps.reduce((accum, app) => accum + app.price, 0);
    let firstVal = Math.floor(total),
        secondVal = Math.round((total - firstVal) * 100);
    if (secondVal < 10) {
      secondVal = `0${secondVal}`;
    }

    first.textContent = firstVal.toLocaleString('en-US', { style: 'currency',
                                                                      currency: 'USD',
                                                                      minimumFractionDigits: 0,
                                                                      maximumFractionDigits: 0 });

    second.textContent = secondVal;
  }

  render() {
    const targetNode = document.querySelector('.basket');
    const rowsInfo = this.apps.reduce((total, app) => {
      const added = total.find(function(elem){
        return app.id === elem.id;
      });
      if (added) {
        added.quantity += 1;
      } else {
        total.push({
                    id : app.id,
                    price : app.price,
                    name : app.name,
                    guid : app.guid,
                    quantity : 1
                  });
      }
      return total;
    }, []);
    
    rowsInfo.forEach(row => {
      const cartRow = document.querySelector('#cart-item').cloneNode(true).content;
      cartRow.querySelector('.basket__row').setAttribute('data-id', row.id);
      cartRow.querySelector('.basket__img').src = `./assets/img/img-${row.guid}.jpg`;
      cartRow.querySelector('.basket__product-name').textContent = row.name;
      cartRow.querySelector('.app-price').textContent = row.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      cartRow.querySelector('.counter__number').textContent = row.quantity;

      const removeBtn = cartRow.querySelector('.del-icon');
      removeBtn.setAttribute('data-id', row.id);
      removeBtn.addEventListener('click', ev => {
        this.remove(getRowId(ev.currentTarget));
        this.updateTotal();
        this.sendToLocal();
        ev.target.closest('.basket__row').remove();
      });

      const counter = cartRow.querySelector('.counter');
      counter.setAttribute('data-id', row.id);
      counter.addEventListener('click', ev => {
        if (!ev.target.classList.contains('counter__circle')) return;
        const id = getRowId(ev.currentTarget);
        const numberNode = counter.querySelector('.counter__number');
        const currentNumber = parseInt(numberNode.textContent, 10);
        if (ev.target.classList.contains('counter__circle_minus')) {
          if (currentNumber > 1) {
            numberNode.textContent = (currentNumber - 1);
            const indexToDelete = this.apps.findIndex(app => app.id == id);
            this.apps.splice(indexToDelete, 1);  
          }
        } else {
          numberNode.textContent = (currentNumber + 1);
          const appToClone = this.apps.find(app => app.id == id);
          this.apps.push(appToClone);
        }
        this.updateCurrentValue(id);
        this.updateTotal();
        this.sendToLocal();
      });

      targetNode.appendChild(cartRow);
      this.updateCurrentValue(row.id);
      this.updateTotal();
    });

    function getRowId(elem) {
      return elem.closest('.basket__row').dataset.id;
    }
  }
}
