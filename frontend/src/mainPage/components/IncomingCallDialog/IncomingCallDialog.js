import React, {useState} from 'react';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../connection/webRTC/webRTCHandler';
import './IncomingCallDialog.css';

const IncomingCallDialog = ({ callerUsername }) => {
  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
  };

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  return (
    <div>
    <div className='direct_call_dialog background_secondary_color'>
      
      <span className='direct_call_dialog_caller_name'>{callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Принять
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Отклонить
        </button>
      </div>
    </div>
    </div>
  );
};

export default IncomingCallDialog;
