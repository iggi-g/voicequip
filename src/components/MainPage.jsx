import React, { useState, useEffect } from 'react';
import Header from './Header';
import NoteList from './NoteList';
import RecordingControls from './RecordingControls';
import SummaryGenerator from './SummaryGenerator';
import AskAI from './AskAI';
import RecordingSummary from './RecordingSummary';

const MainPage = () => {
  const [notes, setNotes] = useState([]);
  const [showSummaryGenerator, setShowSummaryGenerator] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);
  const [showRecordingSummary, setShowRecordingSummary] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  const addNote = (note) => {
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleNewRecording = (blob) => {
    setCurrentRecording(blob);
    setShowRecordingSummary(true);
  };

  const filteredNotes = notes.filter(note => {
    if (filter === 'all') return true;
    if (filter === 'shared') return note.shared;
    if (filter === 'starred') return note.starred;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 flex space-x-4">
          <button
            className={`rounded-full px-4 py-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`rounded-full px-4 py-2 ${filter === 'shared' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setFilter('shared')}
          >
            Shared
          </button>
          <button
            className={`rounded-full px-4 py-2 ${filter === 'starred' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setFilter('starred')}
          >
            Starred
          </button>
        </div>
        <NoteList notes={filteredNotes} onDeleteNote={deleteNote} />
        <RecordingControls
          onNewRecording={handleNewRecording}
          onOpenAskAI={() => setShowAskAI(true)}
          onOpenSummaryGenerator={() => setShowSummaryGenerator(true)}
        />
      </main>
      {showSummaryGenerator && (
        <SummaryGenerator
          notes={notes}
          onClose={() => setShowSummaryGenerator(false)}
        />
      )}
      {showAskAI && (
        <AskAI
          notes={notes}
          onClose={() => setShowAskAI(false)}
        />
      )}
      {showRecordingSummary && currentRecording && (
        <RecordingSummary
          audioBlob={currentRecording}
          onClose={() => setShowRecordingSummary(false)}
          onSave={(note) => {
            addNote(note);
            setShowRecordingSummary(false);
          }}
        />
      )}
    </div>
  );
};

export default MainPage;