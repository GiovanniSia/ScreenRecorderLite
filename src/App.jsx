import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [fileName, setFileName] = useState('captura.mp4');

  const handleRecording = async () => {
    try {
      const media = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {
          frameRate: { ideal: 30 },
          width: { ideal: 1920 }, // Ancho deseado
          height: { ideal: 1080 }, // Altura deseada
        },
      });

      videoRef.current.srcObject = media;

      const mediarecorder = new MediaRecorder(media, {
        mimeType: 'video/webm;codecs=h264,opus',
        bitsPerSecond: 5000000, 
      });

      mediarecorder.start();
      mediaRecorderRef.current = mediarecorder;

      const [video] = media.getVideoTracks();
      video.addEventListener('ended', () => {
        stopRecording();
      });

      mediarecorder.addEventListener('dataavailable', (e) => {
        const link = document.createElement('a');
        const blob = new Blob([e.data], { type: 'video/webm' });
        link.href = URL.createObjectURL(blob);
        link.download = fileName; // Usa el nombre de archivo del estado
        link.click();
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error al obtener la captura de pantalla:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());

      videoRef.current.srcObject = null;
    }
  };

  return (
    <>
      <div className="card">
        <h1>Screen Lite</h1>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Nombre del archivo"
          className={isRecording ? 'invalid' : ''}
          disabled={isRecording ? true: false}
        />
      <input type='checkbox' placeholder='permitir grabar micrófono'/>
        <button className='button' onClick={isRecording ? stopRecording : handleRecording}>
          {isRecording ? '⏹️ Stop Recording' : '⏺️ Start Recording'}
        </button>
        <video className="video" ref={videoRef} autoPlay muted style={{display:isRecording?'':'none'}}/>
      </div>
    </>
  );
}

export default App;
