import socketClient from 'socket.io-client';
import store from '../../storage/storage';
import * as mainActions from '../../storage/actions/mainPageActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/GroupCallHandler';

const SERVER = 'http://localhost:5000';

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

let socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });

  socket.on('broadcast', (data) => {
    handleBroadcastEvents(data);
  });

  // вызов
  socket.on('pre-offer', (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-offer', (data) => {
    webRTCHandler.handleOffer(data);
  });

  socket.on('webRTC-answer', (data) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data);
  });

  socket.on('user-hanged-up', () => {
    webRTCHandler.handleUserHangedUp();
  });


  socket.on('group-call-join-request', (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });

  socket.on('group-call-user-left', (data) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });
};

export const registerNewUser = (username, roomNum) => {
  socket.emit('register-new-user', {
    username: username,
    socketId: socket.id,
    roomNum: roomNum
  });
};
export const registerNewRoomNum = (roomNum) => {
  socket.emit('register-new-room-num', {
    roomNum: roomNum,
    socketId: socket.id
  });
};
// отправка событий на сервер, связанных со звонком

export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data);
};

// отправка событий группового звонка

export const registerGroupCall = (data) => {
  socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit('group-call-join-request', data);
};

export const userLeftGroupCall = (data) => {
  socket.emit('group-call-user-left', data);
};

export const groupCallClosedByHost = (data) => {
  socket.emit('group-call-closed-by-host', data);
};

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      let urlNum = window.location.href.split('/')[4]
      let activeUsers = []
      if (data.activeUsers.length >= 2) 
        {
          activeUsers = data.activeUsers.filter(activeUser => activeUser.roomNum === urlNum)
          console.log(data.activeUsers.map(({roomNum}) => roomNum).filter(function(num){
            return num.roomNum === urlNum
          }))
        }else{
          activeUsers = data.activeUsers
        }
      //const activeUsers = data.activeUsers.filter(activeUser => activeUser.roomNum === urlNum);
      //sessionStorage.setItem('users', JSON.stringify(activeUsers.map(({username}) => username)))
      store.dispatch(mainActions.setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      const groupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
      const activeGroupCallRoomId = webRTCGroupCallHandler.checkActiveGroupCall();

      if (activeGroupCallRoomId) {
        const room = groupCallRooms.find(room => room.roomId === activeGroupCallRoomId);
        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }
      store.dispatch(mainActions.setGroupCalls(groupCallRooms));
      break;
    default:
      break;
  }
};
