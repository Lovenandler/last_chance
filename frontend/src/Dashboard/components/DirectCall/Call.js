import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import RejectedCallWindow from '../CallRejectedDialog/RejectedCallWindow';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallWindow from '../CallingDialog/CallWindow';
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled, setMessage } from '../../../store/actions/callActions';
import ControlButtons from '../ConversationButtons/ControlButtons';
import Messenger from '../Messenger/Messenger';

const Call = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessage,
    message
  } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <RejectedCallWindow
        reason={callRejected.reason}
        hideCallRejectedDialog={hideCallRejectedDialog}
                                />}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
      {callingDialogVisible && <CallWindow />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ControlButtons {...props} />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger message={message} setDirectCallMessage={setDirectCallMessage} />}
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) => dispatch(setMessage(received, content))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(Call);
