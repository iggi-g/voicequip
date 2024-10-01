import React, { useState } from 'react';
import Header from './Header';
import NoteList from './NoteList';
import RecordingControls from './RecordingControls';
import SummaryGenerator from './SummaryGenerator';

const MainPage = () => {
  const [notes, setNotes] = useState([]);
  const [showSummaryGenerator, setShowSummaryGenerator] = useState(false);
  const [filter, setFilter] = useState('all');

  const addNote = (note) => {
    setNotes([note, ...notes]);
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
        <div className="mb-4">
          <button
            className={`mr-4 ${filter === 'all' ? 'font-bold' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`mr-4 ${filter === 'shared' ? 'font-bold' : ''}`}
            onClick={() => setFilter('shared')}
          >
            Shared
          </button>
          <button
            className={`mr-4 ${filter === 'starred' ? 'font-bold' : ''}`}
            onClick={() => setFilter('starred')}
          >
            Starred
          </button>
        </div>
        <NoteList notes={filteredNotes} />
        <RecordingControls
          onNewRecording={addNote}
          onOpenSummaryGenerator={() => setShowSummaryGenerator(true)}
        />
      </main>
      {showSummaryGenerator && (
        <SummaryGenerator
          notes={notes}
          onClose={() => setShowSummaryGenerator(false)}
        />
      )}
    </div>
  );
};

export default MainPage;