import formatTimestamp from '../utils/format-timestamp';

export default class Chat {
  constructor(currentUser) {
    this.currentUser = currentUser;

    this.chatNode = document.querySelector('.js-chat');
    this.usersNode = document.querySelector('.js-users-list');
    this.messagesNode = document.querySelector('.js-messages');
    this.formNode = document.querySelector('.js-chat-form');

    this.messages = [];
    this.users = [];
    this.subscribersForm = new Set();

    this.formNode.addEventListener('submit', this.submit.bind(this));
  }

  open() {
    this.chatNode.classList.add('chat--active');
    this.renderUsers();
    this.renderMessages();
  }

  addUser({ users }) {
    this.users = users;
    this.renderUsers();
  }

  removeUser(removedUser) {
    this.users = this.users.filter(user => user !== removedUser);
    this.renderUsers();
  }

  addMessage(message) {
    const currentUser = this.currentUser === message.name;
    this.messages.push({
      ...message,
      currentUser,
    });
    this.renderMessages();
  }

  renderUsers() {
    const usersHtml = this.users.map(
      username => `<li class="users-list__item user">
                <div class="user__avatar">
                </div>
                <div class="user__name">
                    ${username}${this.currentUser === username ? ' (Вы)' : ''}
                </div>
            </li>`
    );
    this.usersNode.innerHTML = usersHtml.join('');
  }

  renderMessages() {
    const messagesHtml = this.messages.map(
      ({
        name,
        message,
        currentUser,
        timestamp,
      }) => `<li class="chat__messages-item message${
        currentUser ? ' message--right-side' : ''
      }">
                        <div class="message__info">
                            ${currentUser ? 'Вы' : name}, ${formatTimestamp(
        timestamp
      )}
                        </div>
                        <div class="message__text">
                            ${message}
                        </div>
                    </li>`
    );
    this.messagesNode.innerHTML = messagesHtml.join('');
  }

  addSubscriberForm(callback) {
    this.subscribersForm.add(callback);
  }

  submit(event) {
    event.preventDefault();
    const input = this.formNode.elements.message;
    this.subscribersForm.forEach(fn =>
      fn({
        name: this.currentUser,
        timestamp: Date.now(),
        message: input.value,
      })
    );
    input.value = '';
  }
}
