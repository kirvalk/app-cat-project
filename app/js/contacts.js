export class Contacts {
  constructor() {
    this.surname = '';
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.company = '';
    this.taxCode = '';
    this.сity = '';
    this.installId = 'r1'; //хранит id выбраной радиокнопки

    this.init();
  }

  init() {
    const form = document.querySelector('.order-contacts');
    form.addEventListener('focusout', ev => {
      if (!ev.target.classList.contains('text-input')) return;

      if (ev.target.classList.contains('step3__surname')) {
        this.surname = ev.target.value;
      } else if (ev.target.classList.contains('step3__name')) {
        this.name = ev.target.value;
      } else if (ev.target.classList.contains('step3__phone')) {
        this.phoneNumber = ev.target.value;
      } else if (ev.target.classList.contains('step3__email')) {
        this.email = ev.target.value;
      } else if (ev.target.classList.contains('step3__company')) {
        this.company = ev.target.value;
      } else if (ev.target.classList.contains('step3__taxcode')) {
        this.taxCode = ev.target.value;
      } else if (ev.target.classList.contains('step3__city')) {
        this.сity = ev.target.value;
      }

      this.sendToLocal();
    });

    const radio = form.querySelectorAll('input[name="install"]');
    radio.forEach(btn => {
      btn.addEventListener('change', ev => {
        this.installId = ev.target.getAttribute('id');
        this.sendToLocal();
      });
    });

    const storage = JSON.parse(window.localStorage.getItem('contacts'));
    if (!storage) {
      this.render();
    } else {
      this.surname = storage.surname;
      this.name = storage.name;
      this.phoneNumber = storage.phoneNumber;
      this.email = storage.email;
      this.company = storage.company;
      this.taxCode = storage.taxCode;
      this.сity = storage.сity;
      this.installId = storage.installId;

      this.render();
    }
  }

  render() {
    const surnameField = document.querySelector('.step3__surname'),
          nameField = document.querySelector('.step3__name'),
          phoneNumberField = document.querySelector('.step3__phone'),
          emailField = document.querySelector('.step3__email'),
          companyField = document.querySelector('.step3__company'),
          taxCodeField = document.querySelector('.step3__taxcode'),
          cityField = document.querySelector('.step3__city');

    surnameField.value = this.surname;
    nameField.value = this.name;
    phoneNumberField.value = this.phoneNumber;
    emailField.value = this.email;
    companyField.value = this.company;
    taxCodeField.value = this.taxCode;
    cityField.value = this.сity;
    document.querySelector(`#${this.installId}`).checked = true;
  }

  serialize() {
    return JSON.stringify(this);
  }

  sendToLocal() {
    window.localStorage.setItem('contacts', this.serialize());
  }
}

