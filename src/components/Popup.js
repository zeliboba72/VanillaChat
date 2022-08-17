export default class Popup {
  constructor() {
    this.popupNode = document.querySelector('.js-popup');
  }

  open() {
    this.popupNode.classList.add('popup--active');
  }

  close() {
    this.popupNode.classList.remove('popup--active');
  }
}
