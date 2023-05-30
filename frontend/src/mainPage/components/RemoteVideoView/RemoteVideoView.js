import React, { useRef, useEffect } from 'react';



const LocalVideoView = props => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div>
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default LocalVideoView;
