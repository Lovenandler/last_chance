import {React} from 'react';
import { callToOtherUser } from '../../../connection/webRTC/webRTCHandler';
import { callStates } from '../../../storage/actions/callActions';

const UsersListItemClosed = (props) => {
  const { activeUser, callState } = props;

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };
  
  return (
    <div className='user_list_item_closed' onClick={handleListItemPressed}>
      
        <img className='user_list_image_closed' src={"https://em-content.zobj.net/thumbs/120/apple/354/alien_1f47d.png"} alt='userimage'/>
      
      <span className='user_list_text_closed'>{activeUser.username}</span>
    </div>
  );
};

export default UsersListItemClosed;
