export class CreditCard {
  constructor() {
    this.number = '';
    this.month = '';
    this.year = '';
    this.owner = '';
    this.cvv = '';
    this.init();
  }

  init() {
    const cards = document.querySelector('.cards');
    cards.addEventListener('focusout', ev => {
      if (!ev.target.classList.contains('text-input')) return;

      if (ev.target.classList.contains('cards__num')) {
        this.number = ev.target.value;
      } else if (ev.target.classList.contains('cards__month')) {
        this.month = ev.target.value;
      } else if (ev.target.classList.contains('cards__year')) {
        this.year = ev.target.value;
      } else if (ev.target.classList.contains('cards__holder')) {
        this.owner = ev.target.value;
      } else if (ev.target.classList.contains('cards__cvv')) {
        this.cvv = ev.target.value;
      }

      this.sendToLocal();
    });

    const storage = JSON.parse(window.localStorage.getItem('credit-card'));
    if (!storage) return;

    this.number = storage.number;
    this.month = storage.month;
    this.year = storage.year;
    this.owner = storage.owner;
    this.cvv = storage.cvv;

    this.render();
  }

  render() {
    const numberField = document.querySelector('.cards__num'),
          monthField = document.querySelector('.cards__month'),
          yearField = document.querySelector('.cards__year'),
          ownerField = document.querySelector('.cards__holder'),
          cvvField = document.querySelector('.cards__cvv');

          numberField.value = this.number;
          monthField.value = this.month;
          yearField.value = this.year;
          ownerField.value = this.owner;
          cvvField.value = this.cvv;
  }

  serialize() {
    return JSON.stringify(this);
  }

  sendToLocal() {
    window.localStorage.setItem('credit-card', this.serialize());
  }
}

