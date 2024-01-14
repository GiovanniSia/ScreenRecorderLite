import React from 'react';
import './ButtonRecorder.css';

function ButtonRecorder({ isRecording, stopRecording, handleRecording }) {
  return (
    <button className='buttonRecorder' onClick={isRecording ? stopRecording : handleRecording}>
      {isRecording ? '⏹️ Stop Recording' : '⏺️ Start Recording'}
    </button>
  );
}

export default ButtonRecorder;