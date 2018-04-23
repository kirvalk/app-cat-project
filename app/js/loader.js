export class Loader {
  constructor() {
    this.visible = false;
    this.node  = document.querySelector('.cssload-loader');
    this.block = document.querySelectorAll('*');
  }

  toggle() {
    if (!this.visible) {
      this.block.forEach(elem => elem.style.pointerEvents = 'none');
      this.node.classList.remove('cssload-loader-hidden');
      this.visible = true;
    } else {
      this.block.forEach(elem => elem.style.pointerEvents = 'auto');
      this.node.classList.add('cssload-loader-hidden');
    }
  }
}

