import { useState, useEffect } from 'react';

const useAudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Request access to the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = event => {
          setAudioChunks(prevChunks => [...prevChunks, event.data]);
        };
        setMediaRecorder(recorder);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const clearRecording = () => {
    setAudioChunks([]);
  };

  const getBlobUrl = () => {
    if (audioChunks.length === 0) return null;
    const blob = new Blob(audioChunks, { type: 'audio/webm' });
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

export default useAudioRecorder;
