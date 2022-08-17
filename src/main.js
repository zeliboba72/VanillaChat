import './style/index.scss';
import { io } from 'socket.io-client';
import AuthPopup from './components/AuthPopup';

const authPopup = new AuthPopup();
authPopup.open().then(token => {
  const socket = io('ws://ahj-chat-socket.herokuapp.com', {
    reconnectionDelayMax: 10000,
    auth: {
      token,
    },
  });
  socket.open(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('GOOOD!!!');
    }
  });
});
