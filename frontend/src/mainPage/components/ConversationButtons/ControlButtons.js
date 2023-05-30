import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import ControlButton from './ControlButton';
import { switchForScreenSharingStream, hangUp } from '../../../connection/webRTC/webRTCHandler';



const ControlButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div>
      <ControlButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic className='icon_buttons_call' /> : <MdMicOff className='icon_buttons_call'/>}
      </ControlButton>
      {!groupCall && <ControlButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd className='icon_buttons_call'/>
      </ControlButton>}
      <ControlButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam className='icon_buttons_call'/> : <MdVideocamOff className='icon_buttons_call'/>}
      </ControlButton>
      {!groupCall && <ControlButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera className='icon_buttons_call'/> : <MdVideoLabel className='icon_buttons_call'/>}
      </ControlButton>}
    </div>
  );
};

export default ControlButtons;
