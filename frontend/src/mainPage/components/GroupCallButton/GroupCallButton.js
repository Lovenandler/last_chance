import React from 'react';
import './GroupCallButton.css';

const GroupCallButton = ({ onClickHandler, label }) => {
  return (
    <button onClick={onClickHandler} className="create_room_btn">
      { label }
    </button>
  );
};

export default GroupCallButton;
