import {putPromoApps} from './slider-packages.js';
import {initSliderControls} from './slider-controls.js';
import {manageLoader} from './script4.js';

export function initSlider(path, targetSelector, numberOfApps) {
    createSliderHTML(targetSelector);
    const xhr = createSliderXhr(numberOfApps);
    xhr.open("GET", path, true);
    xhr.send();
  }
  
function createSliderHTML(targetSelector) {
  const targetNode = document.querySelector(targetSelector);
  const sliderView = document.querySelector('#slider-temp').cloneNode(true).content;
  targetNode.appendChild(sliderView);
}

function createSliderXhr(numberOfApps) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', responseHandler);
  xhr.addEventListener('readystatechange', manageLoader);

  function responseHandler(){
    if (this.readyState !== 4 || this.status !== 200) return;
    const appList = JSON.parse(this.responseText);
    putPromoApps(numberOfApps, appList);
    initSliderControls();
  }

  return xhr;
}


