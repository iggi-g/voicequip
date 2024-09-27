import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from 'lucide-react';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    // Implement recording logic here
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Implement stop recording logic here
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-semibold">Voice Recording</h2>
      {isRecording ? (
        <Button onClick={stopRecording} variant="destructive" size="lg">
          <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording} variant="default" size="lg">
          <Mic className="mr-2 h-4 w-4" /> Start Recording
        </Button>
      )}
      <p className="text-sm text-gray-500">
        {isRecording ? "Recording in progress..." : "Click to start recording"}
      </p>
    </div>
  );
};

export default Recording;