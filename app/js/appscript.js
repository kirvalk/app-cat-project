import {highlightActiveHeaderLink} from './script4.js';
import {convertUTS} from './script4.js';
import {highlightActiveApp} from './script4.js';

document.addEventListener('DOMContentLoaded', function() {
	highlightActiveHeaderLink();
	const xhr = new XMLHttpRequest(); 
	xhr.open("GET", '/api/app_packages.json', true);
	xhr.send();

	xhr.onload = function(ev) {
  		const apps = JSON.parse(xhr.responseText);
  		for (let app of apps) {
  			createAppLink(app);
  		}
  		fillAppInfo(1);
      highlightActiveApp(1);
	};

  const appMenu = document.querySelector('.cat-menu');
  appMenu.addEventListener('click', function(ev) {
    if (!ev.target.classList.contains('cat-menu__link')) return;
    ev.preventDefault();
    console.log(ev.target.dataset.id);
    const appLinks = document.querySelectorAll('.cat-menu__link');
    appLinks.forEach(link => link.classList.remove('cat-menu__link_active'));
    highlightActiveApp(ev.target.dataset.id);
    fillAppInfo(ev.target.dataset.id);
  });

	function fillAppInfo(index) {
		const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function(ev) {
    const loader = document.querySelector('.cssload-loader');
      if (xhr.readyState === 1) {
        loader.classList.remove('cssload-loader-hidden');
      } else if (xhr.readyState === 4) {
        loader.classList.add('cssload-loader-hidden');
      }
    });
		xhr.open("GET", `/api/app_package${index}.json`, true);
		xhr.onload = function(ev) {
			const app = JSON.parse(xhr.responseText);
			createMainAppView(app);
		};
    setTimeout(function(){
      xhr.send();
    }, 1000);
	}

	function createAppLink (appObj) {
		const list = document.querySelector('.cat-menu__list');
		const linkTemp = document.querySelector('#menu-item').cloneNode(true);
		linkTemp.content.querySelector('.cat-menu__link').innerHTML = appObj.title;
    linkTemp.content.querySelector('.cat-menu__link').setAttribute('data-id', appObj.id);

		const clone = document.importNode(linkTemp.content, true);
		list.appendChild(clone);
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
          appFunctions = document.querySelector('.func');
		appName.innerHTML = appObj.title;
    lastUpdate.innerHTML = convertUTS(appObj.lastUpdate);
    banksNum.innerHTML = appObj.banks;
    appType.innerHTML = appObj.type;
    addDev.innerHTML = appObj.dev;
    appCode.innerHTML = appObj.code;
    appReq.innerHTML = appObj.req;
    appImg.src = `./assets/img/img-${appObj.guid}.jpg`;
    appFunctions.innerHTML = '';
    appObj.functions.forEach(func => {
      const funcItem = document.createElement('LI');
      funcItem.classList.add('func__item');
      funcItem.innerHTML = func;
      appFunctions.appendChild(funcItem);
    });
	}
});

