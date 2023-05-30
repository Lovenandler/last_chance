import React from 'react';

import './CallInfo.css';

const CallInfo = ({ username }) => {
  return (
    <div className='main_info_container'>
      <span className='main_info_text_title'>
        Привет {username}.
      </span>
      <span className='main_info_text'>
        <p>Ты можешь начать диалог с человеком в комнате напрямую или создать/присоединиться к групповому чату.</p>
      </span>
    </div>
  );
};

export default CallInfo;
