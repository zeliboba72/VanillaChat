import { io } from 'socket.io-client';

export default class SocketClient {
  constructor(token) {
    this.socket = io('wss://ahj-chat-socket.herokuapp.com', {
      reconnectionDelayMax: 10000,
      auth: {
        token,
      },
    });

    this.subscribersLogin = new Set();
    this.subscribersMessage = new Set();
    this.subscribersDisconnect = new Set();

    this.socket.on('chat message', this.messageHandler.bind(this));
    this.socket.on('login', this.loginHandler.bind(this));
    this.socket.on('user disconnected', this.disconnectHandler.bind(this));
  }

  addSubscriberLogin(callback) {
    this.subscribersLogin.add(callback);
  }

  addSubscriberMessage(callback) {
    this.subscribersMessage.add(callback);
  }

  addSubscriberDisconnect(callback) {
    this.subscribersDisconnect.add(callback);
  }

  loginHandler(data) {
    this.subscribersLogin.forEach(fn => fn(data));
  }

  messageHandler(data) {
    this.subscribersMessage.forEach(fn => fn(data));
  }

  disconnectHandler(data) {
    this.subscribersDisconnect.forEach(fn => fn(data));
  }

  sendMessage(message) {
    this.socket.emit('chat message', message);
  }
}
