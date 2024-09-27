import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Pause, StopCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import RecordingSummary from '../components/RecordingSummary';
import { calculateTranscriptionCost } from '../utils/transcriptionUtils';
import NotionIntegration from '../components/NotionIntegration';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptionCost, setTranscriptionCost] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
        setTranscriptionCost(calculateTranscriptionCost(recordingTime + 1));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused, recordingTime]);

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
      setTranscriptionCost(0);
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
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Voice Recording</h2>
      {isRecording && (
        <div className="bg-gray-900 text-white p-4 rounded-full flex items-center space-x-4">
          <button onClick={() => setShowConfirmDialog(true)} className="text-red-500">
            Cancel
          </button>
          <span className="text-red-500">•</span>
          <span>{formatTime(recordingTime)}</span>
          <button onClick={pauseRecording} className="bg-gray-700 p-2 rounded-full">
            {isPaused ? <Mic className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
          </button>
          <button onClick={stopRecording} className="bg-green-500 text-white px-4 py-2 rounded-full">
            Done
          </button>
        </div>
      )}
      {!isRecording && (
        <Button onClick={startRecording} variant="default" size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
          <Mic className="mr-2 h-4 w-4" /> Record
        </Button>
      )}
      <div className="text-gray-600">
        Estimated transcription cost: ${transcriptionCost}
      </div>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Are you sure you want to cancel this recording?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={() => {
              stopRecording();
              setShowConfirmDialog(false);
            }}>Yes, cancel</Button>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>No, continue recording</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showSummary && audioBlob && (
        <RecordingSummary audioBlob={audioBlob} onClose={() => setShowSummary(false)} />
      )}
      <NotionIntegration note={{ audioBlob, recordingTime, transcriptionCost }} />
    </div>
  );
};

export default Recording;