import Popup from './Popup';
import HttpClient from '../api/HttpClient';

export default class AuthPopup extends Popup {
  constructor() {
    super();
    this.formNode = this.popupNode.querySelector('.js-auth-form');
    this.formNode.addEventListener('submit', this.submit.bind(this));
  }

  async submit(event) {
    event.preventDefault();
    const formData = new FormData(this.formNode);
    const name = formData.get('name');
    const response = await HttpClient.login({ name });
    if (!response.success) {
      this.createError(
        response.message ?? 'Произошла неизвестная ошибка на сервере'
      );
      return;
    }
    this.close(response.token);
  }

  createError(message) {
    if (!this.errorNode) {
      this.errorNode = document.createElement('div');
      this.errorNode.classList.add('auth-form__error');
      this.formNode.appendChild(this.errorNode);
    }
    this.errorNode.innerText = message;
  }

  open() {
    super.open();
    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  close(token) {
    super.close();
    this.resolve(token);
  }
}
