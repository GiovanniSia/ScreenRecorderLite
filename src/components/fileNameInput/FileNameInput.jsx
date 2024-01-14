import React from 'react';
import "./FileNameInput.css";

function FileNameInput({ fileName, setFileName, isRecording }) {
    const inputClassName = `fileNameInput ${isRecording ? 'invalid' : ''}`;
  return (
    <input
      type="text"
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
      placeholder="Nombre del archivo"
      className={inputClassName}
      disabled={isRecording}
    />
  );
}

export default FileNameInput;