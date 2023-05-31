import React from 'react';

const UsernameInput = (props) => {
  const { username, setUsername, roomNum, setRoomNum } = props;

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
        className='start_page_input'
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
      className='start_page_input'
    />
  </div>
  </div>
  );
};

export default UsernameInput;
