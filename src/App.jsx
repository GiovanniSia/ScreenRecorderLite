import React, { useState, useRef } from "react";
import "./App.css";
import ButtonRecorder from "./components/buttonRecorder/ButtonRecorder";
import FileNameInput from "./components/fileNameInput/FileNameInput";
import Countdown from "./components/countDown/CountDown";
import VideoPlayer from "./components/videoPlayer/VideoPlayer";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCountDown, setIsRecordingCountDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [fileName, setFileName] = useState("captura");

  const handleRecording = async () => {
    try {
      const media = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {
          frameRate: { ideal: 30 },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      // es para ver el video en la web
      videoRef.current.srcObject = media;

      setIsRecordingCountDown(true);

      // Retraso de 3 segundos antes de iniciar la grabación
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval); // funcion js que limpia el temporizador
        startRecording(media);
      }, 3000); // 3 segundos de retraso
    } catch (error) {
      alert("Error al obtener la captura de pantalla:", error);
    }
  };

  const startRecording = (media) => {
    const mediarecorder = new MediaRecorder(media, {
      mimeType: "video/webm;codecs=h264,opus",
      bitsPerSecond: 5000000,
    });

    mediarecorder.start(); // inicia la grabación
    mediaRecorderRef.current = mediarecorder; // para usar a fuera de la función

    // cuando se finaliza el compartir pantalla se detiene la grabación
    const [video] = media.getVideoTracks();
    video.addEventListener("ended", () => {
      stopRecording();
    });

    // al finalizar guarda la grabación
    mediarecorder.addEventListener("dataavailable", (e) => {
      const link = document.createElement("a");
      const blob = new Blob([e.data], { type: "video/webm" });
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });

    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsRecordingCountDown(false);
      
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());

      videoRef.current.srcObject = null;

    }
  };

  return (
    <>
      <div className="card">
        <h1>Screen Lite</h1>

        <FileNameInput
          fileName={fileName}
          setFileName={setFileName}
          isRecording={isRecording}
        />

        <ButtonRecorder
          isRecording={isRecording}
          stopRecording={stopRecording}
          handleRecording={handleRecording}
        />

        <Countdown
          countdown={countdown}
          isRecordingCountDown={isRecordingCountDown}
        />
        <VideoPlayer isRecording={isRecording} videoRef={videoRef} />
      </div>
    </>
  );
}

export default App;
