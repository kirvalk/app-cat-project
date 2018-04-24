import {Form} from './form.js';

export class Contacts extends Form {
  init(formSelector, storageKey) {
    super.init(formSelector, storageKey);

    const radio = document.querySelectorAll('input[name="install"]');
    radio.forEach(btn => {
      btn.addEventListener('change', ev => {
        this.installId = ev.target.getAttribute('id');
        this.sendToLocal(storageKey);
      });
    });
  }

  render() {
    super.render();
    if (this.hasOwnProperty('installId')) {
      document.querySelector(`#${this.installId}`).checked = true;
    }
  }
}

