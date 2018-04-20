import {AppContent} from './app-content.js';

export class AppSidebar {
  constructor() {
    this.currentId = 0;
    this.init();
  }


  // if it's not id in url - returns undefined
  getIdfromUrl() {
    return location.href.split('#index')[1];
  }

  init() {
    if (!this.getIdfromUrl()) {
      this.currentId = 1;
      location.hash = 'index1';
    } else {
      this.currentId = this.getIdfromUrl();
    }

    const appMenu = document.querySelector('.cat-menu__list');
    appMenu.addEventListener('click', ev => {
      if (!ev.target.classList.contains('cat-menu__link')) return;
      ev.preventDefault();
      this.currentId = parseInt(ev.target.dataset.id, 10);
      location.hash = `index${this.currentId}`;
      this.highlightActiveAppLink();
      let content = new AppContent(this.currentId);
    });

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ev => {
      if (ev.target.readyState !== 4 || ev.target.status !== 200) return;
      const appList = JSON.parse(ev.target.responseText);

      for (let app of appList) {
        createAppLink(app);
      }
      this.highlightActiveAppLink();
      let content = new AppContent(this.currentId);
    });
    xhr.open("GET", './api/app_packages.json', true);
    xhr.send();

    function createAppLink (appObj) {
      const list = document.querySelector('.cat-menu__list');
      const linkTemp = document.querySelector('#menu-item').cloneNode(true).content;
      linkTemp.querySelector('.cat-menu__link').innerHTML = appObj.title;
      linkTemp.querySelector('.cat-menu__link').setAttribute('data-id', appObj.id);
      list.appendChild(linkTemp);
    }
  }

  highlightActiveAppLink(){
    const appLinks = document.querySelectorAll('.cat-menu__link');
    appLinks.forEach(link => link.classList.remove('cat-menu__link_active'));
    const appLink = document.querySelector(`.cat-menu__link[data-id="${this.currentId}"]`);
    appLink.classList.add('cat-menu__link_active');
  }
}