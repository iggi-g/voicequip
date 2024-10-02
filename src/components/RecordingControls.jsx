import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Pause, StopCircle, MessageCircle } from 'lucide-react';

const RecordingControls = ({ onNewRecording, onOpenAskAI, onOpenSummaryGenerator }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

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
        onNewRecording(blob);
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-center space-x-4 border-t">
      {isRecording ? (
        <div className="flex items-center space-x-4">
          <Button onClick={() => stopRecording()} variant="destructive" className="rounded-full">Cancel</Button>
          <span className="text-lg font-semibold">{formatTime(recordingTime)}/1:00</span>
          <Button onClick={pauseRecording} variant="outline" className="rounded-full">
            {isPaused ? <Mic className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button onClick={stopRecording} variant="default" className="rounded-full">Done</Button>
        </div>
      ) : (
        <>
          <Button onClick={startRecording} variant="default" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
            <Mic className="mr-2 h-4 w-4" /> Record
          </Button>
          <Button onClick={onOpenAskAI} variant="outline" className="rounded-full">
            <MessageCircle className="mr-2 h-4 w-4" /> Ask my AI
          </Button>
          <Button onClick={onOpenSummaryGenerator} variant="outline" className="rounded-full">Create</Button>
        </>
      )}
    </div>
  );
};

export default RecordingControls;
