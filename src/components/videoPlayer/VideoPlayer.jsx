import React from 'react';
import "./VideoPlayer.css"

function VideoPlayer({ isRecording, videoRef }) {
  return (
    <video className="video" ref={videoRef} autoPlay muted style={{ display: isRecording ? '' : 'none' }} />
  );
}

export default VideoPlayer;