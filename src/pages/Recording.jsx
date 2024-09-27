import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Pause, StopCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import RecordingSummary from '../components/RecordingSummary';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      drawWaveform();
    } else {
      cancelAnimationFrame(animationRef.current);
    }
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

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
      const y = canvas.height / 2 + Math.sin(i * 0.1) * 20 * Math.random();
      ctx.lineTo(i, y);
    }

    ctx.strokeStyle = '#10B981';
    ctx.stroke();

    animationRef.current = requestAnimationFrame(drawWaveform);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-semibold text-white">Voice Recording</h2>
      <canvas ref={canvasRef} width="300" height="100" className="bg-gray-700 rounded-lg" />
      <div className="flex space-x-4">
        {!isRecording ? (
          <Button onClick={startRecording} variant="default" size="lg" className="bg-green-500 hover:bg-green-600">
            <Mic className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        ) : (
          <>
            <Button onClick={pauseRecording} variant="outline" size="lg">
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button onClick={() => setShowConfirmDialog(true)} variant="destructive" size="lg">
              <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
            </Button>
          </>
        )}
      </div>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop Recording?</DialogTitle>
            <DialogDescription>
              Are you sure you want to stop the recording? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              stopRecording();
              setShowConfirmDialog(false);
            }}>Stop Recording</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showSummary && audioBlob && (
        <RecordingSummary audioBlob={audioBlob} onClose={() => setShowSummary(false)} />
      )}
    </div>
  );
};

export default Recording;