import React from 'react';
import './ButtonRecorder.css';

function ButtonRecorder({ isRecording, stopRecording, handleRecording,isCounting }) {
  return (
    <button className='buttonRecorder' onClick={isRecording ? stopRecording : handleRecording} disabled={isCounting}>
      {isRecording ? '⏹️ Stop Recording' : '⏺️ Start Recording'}
    </button>
  );
}

export default ButtonRecorder;