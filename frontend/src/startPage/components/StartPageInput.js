import React, {useEffect} from 'react';

const StartPageInput = (props) => {
  const { username, setUsername, roomNum, setRoomNum } = props;
  
  useEffect(() => {
    window.sessionStorage.setItem('name', username);
  }, [username]);
  return (
    <div>
    <div className='start_page_input_container'>
      <input
      id='input_username'
        placeholder='Введи своё имя'
        type='text'
        maxLength='15'
        value={username}
        onChange={(event) => { setUsername(event.target.value); }}
        className='start_page_login_input'
      />
    </div>
    <div className='start_page_input_container'>
    <input
    id='input_num'
      placeholder='Введи название комнаты'
      type='text'
      maxLength='15'
      value={roomNum}
      onChange={(event) => { setRoomNum(event.target.value); }}
      className='start_page_room_input'
    />
  </div>
  </div>
  );
};

export default StartPageInput;
