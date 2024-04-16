import { useState, useEffect } from 'react';

const useVideoRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up: stop accessing the camera when unmounting or changing components
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }
    };
  }, [videoStream]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => {
        setVideoChunks(prevChunks => [...prevChunks, event.data]);
      };
      setMediaRecorder(recorder);
      setVideoStream(stream);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }
    }
  };

  const clearRecording = () => {
    setVideoChunks([]);
  };

  const getBlobUrl = () => {
    if (videoChunks.length === 0) return null;
    const blob = new Blob(videoChunks, { type: 'video/webm' });
    return URL.createObjectURL(blob);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    clearRecording,
    getBlobUrl
  };
};

export default useVideoRecorder;
