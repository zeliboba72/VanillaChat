import { io } from 'socket.io-client';

export default class SocketClient {
  constructor(token) {
    this.socket = io('ws://ahj-chat-socket.herokuapp.com', {
      reconnectionDelayMax: 10000,
      auth: {
        token,
      },
    });
    this.subscribersMessage = new Set();
    this.messageHandler = this.messageHandler.bind(this);
    this.socket.on('chat message', this.messageHandler);
  }

  addSubscriberMessage(callback) {
    this.subscribersMessage.add(callback);
  }

  messageHandler([data]) {
    this.subscribersMessage.forEach(fn => fn(data));
  }

  sendMessage(message) {
    this.socket.emit('chat message', message);
  }
}
