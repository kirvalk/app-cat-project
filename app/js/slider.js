import {convertUTS} from './utils.js';
import {PromiseRequest} from './promise-request.js';

export class Slider {
  constructor(selector, quantity) {
    this.position = 1;
    this.targetSelector = selector;
    this.quantity = quantity;
    this.stepWidth = -362;
    this.init();
  }

  init() {
    const pr = new PromiseRequest('./api/app_packages.json');
    pr.promise.then(response => this.render(JSON.parse(response)));
  }

  render(appList) {
    this._createBasicHtml(this.quantity);
    this._putPromoApps(this.quantity, appList);
    this._initSliderControls();
  }

  _createBasicHtml(num) {
    const targetNode = document.querySelector(this.targetSelector);
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

  _putPromoApps (numberOfApps, apps) {
    const promoBlock = document.querySelector('.promo-layout'),
          randomApps = this._getRandomApps(apps, numberOfApps);
    randomApps.forEach(app => promoBlock.appendChild(this._createAppView(app)));
  }

  _createAppView(app) {
    const appView = document.querySelector('#package-temp').cloneNode(true);
    appView.content.querySelector('.package__image').src = `./assets/img/img-${app.guid}.jpg`;
    appView.content.querySelector('.package__name').innerHTML = app.title;
    appView.content.querySelector('.package__name').setAttribute('data-id', app.id);
    appView.content.querySelector('.package__date').innerHTML = convertUTS(app.lastUpdate);
    const clone = document.importNode(appView.content, true);
    return clone;
  }

  _getRandomApps(list, quantity) {
    let result = [];
    const listClone = [...list]; 
    for (let i = 0; i < quantity; i++) {
      const rnd = Math.floor(Math.random() * listClone.length);
      result = result.concat(listClone.splice(rnd, 1));
    }
    return result;
  }

  _initSliderControls() {
    const leftArrow = document.querySelector('.promo__arrow-wrapper_left'),
          rightArrow = document.querySelector('.promo__arrow-wrapper_right'),
          pointContainer = document.querySelector('.promo__points-container'),
          sliderContainer = document.querySelector('.promo-layout');
    leftArrow.addEventListener('click', this._moveLeft.bind(this));
    rightArrow.addEventListener('click', this._moveRight.bind(this));
    pointContainer.addEventListener('click', this._moveToPoint.bind(this));
    sliderContainer.addEventListener('click', this._goToCatalogPage.bind(this));
  }

  _moveLeft(){
    if (this.position < 2) return;
    this._makePackageCenteredByIndex(--this.position);
  }

  _moveRight(){
    if (this.position > this.quantity - 3) return;
    this._makePackageCenteredByIndex(++this.position);
  }

  _moveToPoint(ev){
    if (!ev.target.classList.contains('promo__point')) return;
    const getNodeIndex = (node, nodeList) => [...nodeList].indexOf(node);
    const points = document.querySelectorAll('.promo__point');
    this.position =  getNodeIndex(ev.target, points);
    this._makePackageCenteredByIndex(this.position);
    points.forEach(point => point.classList.remove('promo__point_active'));
    ev.target.classList.add('promo__point_active');
  }

  _goToCatalogPage(ev) {
    if (!ev.target.classList.contains('package__name')) return;
    ev.preventDefault();
    const appId = ev.target.dataset.id;
    location.href = `${location.href}app.html#index${appId}`;
  }

  _makePackageCenteredByIndex (index) {
    const promoLayout = document.querySelector('.promo-layout'),
          allPackages = document.querySelectorAll('.package'),
          points = document.querySelectorAll('.promo__point');
    points.forEach(v => v.classList.remove('promo__point_active'));
    points[index].classList.add('promo__point_active');
    const left = this.stepWidth * (index - 1);
    promoLayout.style.left = `${left}px`;
  }
}