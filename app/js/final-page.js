import {ProgressBar} from './progress-bar.js';

class FinalPage {
  constructor() {
    this.initpage();
  }
  initpage() {
    const progressBar = new ProgressBar(4, false);
  }
}

const page = new FinalPage();