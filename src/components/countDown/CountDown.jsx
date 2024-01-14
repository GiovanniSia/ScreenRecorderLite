import React from 'react';
import "./CountDown.css";

function Countdown({ countdown, isRecordingCountDown }) {
  return (
    <div className="countdown" style={{ display: isRecordingCountDown ? '' : 'none' }}>
      {countdown > 0 && `${countdown}`}
    </div>
  );
}

export default Countdown;