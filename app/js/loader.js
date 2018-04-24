export class Loader {
  constructor() {
    this.visible = false;
    this.loader  = document.querySelector('.cssload-loader');
    this.itemsToBlock = document.querySelectorAll('*');
  }

  toggle() {
    if (!this.visible) {
      this.itemsToBlock.forEach(elem => elem.style.pointerEvents = 'none');
      this.loader.classList.remove('cssload-loader-hidden');
      this.visible = true;
    } else {
      this.itemsToBlock.forEach(elem => elem.style.pointerEvents = 'auto');
      this.loader.classList.add('cssload-loader-hidden');
      this.visible = false;
    }
  }
}

