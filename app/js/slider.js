import {convertUTS} from './script4.js';

export class Slider {
  constructor(selector, quantity) {
    this.position = 1;
    this.targetSelector = selector;
    this.quantity = quantity;
    this.stepWidth = -362;
    this.init();
  }

  init() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ev => {
      if (ev.target.readyState !== 4 || ev.target.status !== 200) return;
      const appList = JSON.parse(ev.target.responseText);
      this.render(appList);
    });

    xhr.open("GET", './api/app_packages.json', true);
    xhr.send();
  }

  render(appList) {
    const self = this;
    createBasicHtml(this.quantity);
    putPromoApps(this.quantity, appList);
    initSliderControls();

    function createBasicHtml(num) {
      const targetNode = document.querySelector(self.targetSelector);
      const sliderView = document.querySelector('#slider-temp').cloneNode(true).content;

      const pointContainer = sliderView.querySelector('.promo__points-container');
      for (let i = 1; i <= num; i++) {
        const point = document.createElement('DIV');
        point.classList.add('promo__point');
        if (i === 2 || num === 1) {
          point.classList.add('promo__point_active');
        }
        pointContainer.appendChild(point);
      }
      targetNode.appendChild(sliderView);
    }

    function putPromoApps (numberOfApps, apps) {
      const promoBlock = document.querySelector('.promo-layout'),
            randomApps = getRandomApps(apps, numberOfApps);
      randomApps.forEach(app => promoBlock.appendChild(createAppView(app)));
    }

    function createAppView(app) {
      const appView = document.querySelector('#package-temp').cloneNode(true);
      appView.content.querySelector('.package__image').src = `./assets/img/img-${app.guid}.jpg`;
      appView.content.querySelector('.package__name').innerHTML = app.title;
      appView.content.querySelector('.package__name').setAttribute('data-id', app.id);
      appView.content.querySelector('.package__date').innerHTML = convertUTS(app.lastUpdate);
      const clone = document.importNode(appView.content, true);
      return clone;
    }

    function getRandomApps(list, quantity) {
      let result = [];
      const listClone = [...list]; 
      for (let i = 0; i < quantity; i++) {
        const rnd = Math.floor(Math.random() * listClone.length);
        result = result.concat(listClone.splice(rnd, 1));
      }
      return result;
    }

    function initSliderControls() {
      const leftArrow = document.querySelector('.promo__arrow-wrapper_left'),
            rightArrow = document.querySelector('.promo__arrow-wrapper_right'),
            pointContainer = document.querySelector('.promo__points-container'),
            sliderContainer = document.querySelector('.promo-layout');
      leftArrow.addEventListener('click', moveLeft);
      rightArrow.addEventListener('click', moveRight);
      pointContainer.addEventListener('click', moveToPoint);
      sliderContainer.addEventListener('click', goToCatalogPage);
    }

    function moveLeft(){
      if (self.position < 2) return;
      makePackageCenteredByIndex(--self.position);
    }

    function moveRight(){
      if (self.position > self.quantity - 3) return;
      makePackageCenteredByIndex(++self.position);
    }

    function moveToPoint(ev){
      if (!ev.target.classList.contains('promo__point')) return;
      const getNodeIndex = (node, nodeList) => [...nodeList].indexOf(node);
      const points = document.querySelectorAll('.promo__point');
      self.position =  getNodeIndex(ev.target, points);
      makePackageCenteredByIndex(self.position);
      points.forEach(point => point.classList.remove('promo__point_active'));
      ev.target.classList.add('promo__point_active');
    }

    function goToCatalogPage(ev) {
      if (!ev.target.classList.contains('package__name')) return;
      ev.preventDefault();
      const appId = ev.target.dataset.id;
      location.href = `${location.href}app.html#index${appId}`;
    }

    function makePackageCenteredByIndex (index) {
      const promoLayout = document.querySelector('.promo-layout'),
            allPackages = document.querySelectorAll('.package'),
            points = document.querySelectorAll('.promo__point');
      points.forEach(v => v.classList.remove('promo__point_active'));
      points[index].classList.add('promo__point_active');
      const left = self.stepWidth * (index - 1);
      promoLayout.style.left = `${left}px`;
    }
  }
}