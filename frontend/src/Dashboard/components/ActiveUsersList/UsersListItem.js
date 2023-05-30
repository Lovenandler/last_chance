import {React} from 'react';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';
import { callStates } from '../../../store/actions/callActions';

const UsersListItem = (props) => {
  const { activeUser, callState } = props;

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };
  

  return (
    <div className='user_list_item' onClick={handleListItemPressed}>
      
        <img className='user_list_image' src={"https://em-content.zobj.net/thumbs/120/apple/354/alien_1f47d.png"} alt='userimage'/>
      
      <span className='user_list_text'>{activeUser.username}</span>
    </div>
  );
};

export default UsersListItem;
