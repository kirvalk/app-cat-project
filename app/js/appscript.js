import {highlightActiveAppLink} from './script4.js';
import {convertUTS} from './script4.js';
import {manageLoader} from './script4.js';
  
export function initAppPageContent(path){
  sidebarMenuInit();
  const xhr = createApplicationListXhr(); 
  xhr.open("GET", path, true);
  xhr.send();
}

function createApplicationListXhr() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', responseHandler);
  xhr.addEventListener('readystatechange', manageLoader);

  function responseHandler(){
    if (this.readyState !== 4 || this.status !== 200) return;
    const appList = JSON.parse(this.responseText);

    for (let app of appList) {
      createAppLink(app);
    }

    if (!getCurrentId()) {
      location.href = `${location.href}#index1`;
    }

    highlightActiveAppLink(getCurrentId());
    fillAppInfo(getCurrentId());
  }
  return xhr;
}

function getCurrentId(){
  return location.href.split('#index')[1];
}

function sidebarMenuInit () {
  const appMenu = document.querySelector('.cat-menu__list');
  appMenu.addEventListener('click', menuHandler);

  function menuHandler(ev) {
    if (!ev.target.classList.contains('cat-menu__link')) return;
    ev.preventDefault();
    const appId = ev.target.dataset.id;
    location.hash = "";
    location.href = `${location.href}index${appId}`;
    const appLinks = document.querySelectorAll('.cat-menu__link');
    appLinks.forEach(link => link.classList.remove('cat-menu__link_active'));
    highlightActiveAppLink(appId);
    fillAppInfo(appId);
  }
}

function fillAppInfo(index) {
  const xhr = createAppXhr();
  xhr.open("GET", `./api/app_package${index}.json`, true);
  xhr.send();

  function createAppXhr(numberOfApps) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', responseHandler);
    xhr.addEventListener('readystatechange', manageLoader);

    function responseHandler(){
      if (this.readyState !== 4 || this.status !== 200) return;
      const app = JSON.parse(this.responseText);
      createMainAppView(app);
    }
    return xhr;
  }
}

function createAppLink (appObj) {
	const list = document.querySelector('.cat-menu__list');
	const linkTemp = document.querySelector('#menu-item').cloneNode(true).content;
	linkTemp.querySelector('.cat-menu__link').innerHTML = appObj.title;
  linkTemp.querySelector('.cat-menu__link').setAttribute('data-id', appObj.id);
	list.appendChild(linkTemp);
}

function createMainAppView (appObj) {
	const appName = document.querySelector('.cat-header'),
        lastUpdate = document.querySelector('.app-date'),
        banksNum = document.querySelector('#banks-num'),
        appType = document.querySelector('#app-type'),
        addDev = document.querySelector('#app-dev'),
        appCode = document.querySelector('#app-code'),
        appReq = document.querySelector('#app-req'),
        appImg = document.querySelector('.imgbtn__image'),
        appFunctions = document.querySelector('.func'),
        appPrice = document.querySelector('.imgbtn__price'),
        addToCartBtn = document.querySelector('#gotocart');
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
  addToCartBtn.setAttribute('data-id', appObj.id);
  appObj.functions.forEach(func => {
    const funcItem = document.createElement('LI');
    funcItem.classList.add('func__item');
    funcItem.innerHTML = func;
    appFunctions.appendChild(funcItem);
  });
}


