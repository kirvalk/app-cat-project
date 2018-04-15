import {convertUTS} from './script4.js';

export function putPromoApps (numberOfApps, apps) {
  const promoBlock = document.querySelector('.promo-layout'),
        randomApps = getRandomApps(apps, numberOfApps);
  randomApps.forEach(app => promoBlock.appendChild(createAppView(app)));
  document.querySelectorAll('.package')[1].classList.add('middle');
  putPromoPoints(numberOfApps);
}

function createAppView(app) {
  const appView = document.querySelector('#package-temp').cloneNode(true);
  appView.content.querySelector('.package__image').src = `./assets/img/img-${app.guid}.jpg`;
  appView.content.querySelector('.package__name').innerHTML = app.title;
  // appView.content.querySelector('.package__name').href = '#';
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
// Добавляет на страницу необходимое количество точек для слайдера
function putPromoPoints(num) {
  const pointContainer = document.querySelector('.promo__points-container');
  for (let i = 1; i <= num; i++) {
    const point = document.createElement('DIV');
    point.classList.add('promo__point');
    if (i === 2 || num === 1) {
      point.classList.add('promo__point_active');
    }
    pointContainer.appendChild(point);
  }
}
