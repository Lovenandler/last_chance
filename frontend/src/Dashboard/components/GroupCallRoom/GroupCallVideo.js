import React, { useRef, useEffect } from 'react';


const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  return (
    <div className='group_member_video_container'>
      <video className='group_member_video' ref={videoRef} autoPlay />
    </div>
  );
};

export default GroupCallVideo;
