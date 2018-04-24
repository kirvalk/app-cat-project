export class Form {
  constructor(formSelector, storageKey) {
    this.init(formSelector, storageKey);
  }

  init(formSelector, storageKey) {
    const form = document.querySelector(formSelector);
    form.addEventListener('change', ev => {
      if (!ev.target.classList.contains('text-input')) return;
      const fieldName = ev.target.dataset.field;
      this[fieldName] = ev.target.value;

      this.sendToLocal(storageKey);
    });

    const storage = JSON.parse(window.localStorage.getItem(storageKey));
    if (storage) {
      Object.keys(storage).forEach(key => this[key] = storage[key]);
      this.render();
    }
  }

  render() {
    const fields = document.querySelectorAll('.text-input');
    fields.forEach(field => {
      if (this.hasOwnProperty(field.dataset.field)) {
        field.value = this[field.dataset.field];
      }
    });
  }

  serialize() {
    return JSON.stringify(this);
  }

  sendToLocal(storageKey) {
    window.localStorage.setItem(storageKey, this.serialize());
  }
}

