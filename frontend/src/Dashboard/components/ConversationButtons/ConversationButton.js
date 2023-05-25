import React from 'react';

const ConversationButton = (props) => {
  const { onClickHandler } = props;
  return (
    <button className='conversation_button' onClick={onClickHandler}>
      {props.children}
    </button>
  );
};

export default ConversationButton;
