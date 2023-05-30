import React from 'react';
// import './CallingDialog.css';
import { hangUp } from '../../../utils/webRTC/webRTCHandler';
import { MdCallEnd } from 'react-icons/md';

const CallWindow = () => {
  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div className='direct_calling_dialog background_secondary_color'>
      <span>Звоним</span>
      <div onClick={handleHangUpButtonPressed}>
        <MdCallEnd style={{ width: '20px', height: '20px', fill: '#e6e5e8' }} />
      </div>
    </div>
  );
};

export default CallWindow;