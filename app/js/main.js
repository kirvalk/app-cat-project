import {highlightActiveHeaderLink} from './script4.js';
import {initSlider} from './slider.js';

document.addEventListener('DOMContentLoaded', function() {
  highlightActiveHeaderLink();
  initSlider('./api/app_packages.json', '.content-grid__row2', 7);
});