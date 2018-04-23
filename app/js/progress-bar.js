export class ProgressBar {
  constructor(step, createLinks = true) {
    this.step = step;
    this.createLinks = createLinks;
    this.init();
  }

  init() {
    const progressItems = document.querySelectorAll('.pr-bar__item');
    progressItems.forEach(item => {
      const itemNumber = item.dataset.step;
      if (itemNumber == this.step) {
        item.classList.add('pr-bar__item_active');
      } else if (itemNumber < this.step) {
        item.classList.add('pr-bar__item_complete');
        if (this.createLinks) {
          this._createLinks(item);
        }
      }
    });
  }

  _createLinks(item) {
    item.addEventListener('click', ev => {
      location.href = `./step${item.dataset.step}.html`;
    });
  }
}

