import React from 'react';

import './Dashboardinformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Привет {username}.
      </span>
      <span className='dashboard_info_text_description'>
        <p>Ты можешь начать диалог с человеком в комнате напрямую или создать/присоединиться к групповому чату.</p>
      </span>
    </div>
  );
};

export default DashboardInformation;
