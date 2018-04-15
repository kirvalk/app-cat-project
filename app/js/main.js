import {putPromoApps} from './script2.js';
import {initSliderControls} from './script3.js';
import {highlightActiveHeaderLink} from './script4.js';

document.addEventListener('DOMContentLoaded', function() {
  highlightActiveHeaderLink();
  const xhr = new XMLHttpRequest();
  xhr.timeout = 500;

  xhr.addEventListener('readystatechange', function(ev) {
    const loader = document.querySelector('.cssload-loader');
    if (xhr.readyState === 1) {
      loader.classList.remove('cssload-loader-hidden');
    } else if (xhr.readyState === 4) {
      loader.classList.add('cssload-loader-hidden');
    }
  });

  xhr.addEventListener('load', function(ev) {
    const apps = JSON.parse(xhr.responseText);
    putPromoApps(7, apps);
    initSliderControls();
  });

  xhr.ontimeout = function(ev) {
    alert('Время ожидания истекло!');
  };

  xhr.addEventListener('error', function(){
    alert('ERROR');
  });
  
  xhr.open("GET", './api/app_packages.json', true);
  setTimeout(function(){
    xhr.send();
  }, 1000);
});