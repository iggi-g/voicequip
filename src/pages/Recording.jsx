import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Pause, StopCircle } from 'lucide-react';
import RecordingSummary from '../components/RecordingSummary';
import { useNavigate } from 'react-router-dom';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setAudioBlob(blob);
        setShowSummary(true);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSaveRecording = (newNote) => {
    // Save the note to localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = [newNote, ...savedNotes];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Navigate to the Notes page
    navigate('/notes');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Voice Recording</h2>
      {isRecording && (
        <div className="bg-gray-900 text-white p-4 rounded-full flex items-center space-x-4">
          <span className="text-red-500">•</span>
          <span>{formatTime(recordingTime)}</span>
          <Button onClick={pauseRecording} variant="ghost" size="sm" className="rounded-full">
            {isPaused ? <Mic className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
          </Button>
          <Button onClick={stopRecording} variant="ghost" size="sm" className="rounded-full">
            <StopCircle className="h-6 w-6" />
          </Button>
        </div>
      )}
      {!isRecording && (
        <Button onClick={startRecording} variant="default" size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
          <Mic className="mr-2 h-4 w-4" /> Record
        </Button>
      )}
      <RecordingSummary
        audioBlob={audioBlob}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onSave={handleSaveRecording}
      />
    </div>
  );
};

export default Recording;