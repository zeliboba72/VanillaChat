import './style/index.scss';
import SocketClient from './api/SocketClient';
import AuthPopup from './components/AuthPopup';
import Chat from './components/Chat';

const authPopup = new AuthPopup();
authPopup.open().then(({ token, name }) => {
  const chat = new Chat(name);
  const socket = new SocketClient(token);
  socket.addSubscriberMessage(chat.addMessage.bind(chat));
  chat.addSubscriberForm(socket.sendMessage.bind(socket));
  chat.open();
});
