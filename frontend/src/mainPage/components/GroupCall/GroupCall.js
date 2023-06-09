import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../storage/actions/callActions';
import * as webRTCGroupCallHandler from '../../../connection/webRTC/GroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';

const GroupCall = (props) => {
  // eslint-disable-next-line
  const { callState, localStream, groupCallActive, groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
        <GroupCallButton onClickHandler={createRoom} label='Создать комнату' />}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label='Покинуть комнату' />}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
