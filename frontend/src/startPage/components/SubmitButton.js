import React from 'react';

const SubmitButton = ({ handleSubmitButtonPressed }) => {
  return (
    <div className='start_page_button_container'>
      <button
        className='start_page_button'
        onClick={handleSubmitButtonPressed}
      >
      Войти
      </button>
    </div>

  );
};

export default SubmitButton;
