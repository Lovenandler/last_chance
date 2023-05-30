import React, { useEffect } from 'react';

// import './RejectedCallWindow.css';

const RejectedCallWindow = ({ reason, hideCallRejectedDialog }) => {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      });
    }, [4000]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='rejected_call_window_container'>
      <span>
        {reason}
      </span>
    </div>
  );
};

export default RejectedCallWindow;
