import React from 'react';

const SubmitButton = ({ handleSubmitButtonPressed }) => {
  return (
    <div className='login-page_button_container'>
      <button
        className='login-page_button background_main_color text_main_color'
        onClick={handleSubmitButtonPressed}
      >
      Войти
      </button>
    </div>

  );
};

export default SubmitButton;
