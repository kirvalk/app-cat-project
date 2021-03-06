import {Application} from './application.js';
import {PromiseRequest} from './promise-request.js';

export class BigCart {
  constructor() {
    this.apps = [];
    this.init();
  }

  init() {
    if (!window.localStorage.getItem('cart')) return;
    
    const localData = [...JSON.parse(window.localStorage.getItem('cart')).apps];
    const pack = localData.map(app => {
      const pr = new PromiseRequest(`./api/app_package${app.id}.json`);
      return pr.promise;
    });

    Promise.all(pack).then(responseList => {
      responseList.forEach(response => {
        const resp = JSON.parse(response);
        const extra = localData.find(app => app.id == resp.id).extra;
        const application = new Application (resp.id, resp.price, resp.title, resp.guid, extra);
        this.add(application);
      });
      this.render();
    });
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
                    quantity : 1,
                    extra : app.extra
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
      cartRow.querySelector('.checkbox').setAttribute('id', `ch${row.id}`);
      cartRow.querySelector('.checkbox').checked = row.extra;
      cartRow.querySelector('.checkbox__label').setAttribute('for', `ch${row.id}`);

      const removeBtn = cartRow.querySelector('.del-icon');
      removeBtn.addEventListener('click', ev => {
        this.remove(this._getRowId(ev.currentTarget));
        this.updateTotal();
        this.sendToLocal();
        ev.target.closest('.basket__row').remove();
      });

      const counter = cartRow.querySelector('.counter');
      counter.addEventListener('click', ev => {
        if (!ev.target.classList.contains('counter__circle')) return;
        const id = this._getRowId(ev.currentTarget);
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

    const extraList = document.querySelectorAll('.checkbox_extra');
    extraList.forEach(item => {
      const id = this._getRowId(item);
      item.addEventListener('change', ev => {
        this.apps.forEach(app => {
          if(app.id == id){
            app.extra = item.checked;
          }
        });
        this.sendToLocal();
      });
    });
  }

  _getRowId(elem) {
    return elem.closest('.basket__row').dataset.id;
  }
}
