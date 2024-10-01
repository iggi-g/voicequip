import React from 'react';
import { Mic, MessageSquare, Wand2 } from 'lucide-react';

const RecordingControls = ({ onNewRecording, onOpenSummaryGenerator }) => {
  const handleRecord = () => {
    // Implement recording logic here
    const newNote = {
      id: Date.now(),
      title: 'New recording',
      content: 'Transcribing...',
      date: new Date().toLocaleString(),
      duration: '00:00',
    };
    onNewRecording(newNote);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
      <button
        onClick={handleRecord}
        className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center"
      >
        <Mic className="mr-2 h-5 w-5" />
        Record
      </button>
      <button
        onClick={() => {/* Implement AI chat logic */}}
        className="bg-gray-200 text-gray-700 px-4 py-3 rounded-full"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      <button
        onClick={onOpenSummaryGenerator}
        className="bg-gray-200 text-gray-700 px-4 py-3 rounded-full"
      >
        <Wand2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default RecordingControls;