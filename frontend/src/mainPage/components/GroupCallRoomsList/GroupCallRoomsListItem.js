import React from 'react';
import * as webRTCGroupCallHandler from '../../../connection/webRTC/GroupCallHandler';

const GroupCallRoomsListItem = ({ room }) => {
  const handleListItemPressed = () => {
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
  };

  return (
    <div onClick={handleListItemPressed} className='group_calls_list_item background_main_color'>
      <img className='group_call_icon' src='https://em-content.zobj.net/thumbs/120/apple/354/croissant_1f950.png' alt=''></img>
      <span className='group_call_name'>{room.hostName}</span>
    </div>
  );
};

export default GroupCallRoomsListItem;
