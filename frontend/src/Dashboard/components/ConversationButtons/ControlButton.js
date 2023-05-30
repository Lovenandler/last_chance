import React from 'react';

const ControlButton = (props) => {
  const { onClickHandler } = props;
  return (
    <button className='conversation_button' onClick={onClickHandler}>
      {props.children}
    </button>
  );
};

export default ControlButton;
