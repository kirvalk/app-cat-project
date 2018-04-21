import {Application} from './application.js';
import {convertUTS} from './script4.js';
import {PromiseRequest} from './promise-request.js';

export class AppContent {
  constructor(id) {
    this.init(id);
  }

  init(id) {
    const pr = new PromiseRequest(`./api/app_package${id}.json`);
    pr.promise.then(response => {
        const app = JSON.parse(response);
        globalCurrentApp = new Application(app.id, app.price);
        this.render(app);
      }
    );
  }

  render(appObj) {
    const appName = document.querySelector('.cat-header'),
        lastUpdate = document.querySelector('.app-date'),
        banksNum = document.querySelector('#banks-num'),
        appType = document.querySelector('#app-type'),
        addDev = document.querySelector('#app-dev'),
        appCode = document.querySelector('#app-code'),
        appReq = document.querySelector('#app-req'),
        appImg = document.querySelector('.imgbtn__image'),
        appFunctions = document.querySelector('.func'),
        appPrice = document.querySelector('.imgbtn__price');
    appName.innerHTML = appObj.title;
    lastUpdate.innerHTML = convertUTS(appObj.lastUpdate);
    banksNum.innerHTML = appObj.banks;
    appType.innerHTML = appObj.type;
    addDev.innerHTML = appObj.dev;
    appCode.innerHTML = appObj.code;
    appReq.innerHTML = appObj.req;
    appImg.src = `./assets/img/img-${appObj.guid}.jpg`;
    appFunctions.innerHTML = '';
    appPrice.innerHTML = appObj.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    appObj.functions.forEach(func => {
      const funcItem = document.createElement('LI');
      funcItem.classList.add('func__item');
      funcItem.innerHTML = func;
      appFunctions.appendChild(funcItem);
    });
  }
}
