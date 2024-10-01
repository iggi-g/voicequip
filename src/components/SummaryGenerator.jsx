import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SummaryGenerator = ({ notes, onClose }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedNotes, setSelectedNotes] = useState([]);

  const summaryTypes = [
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'tweet', label: 'Tweet', icon: '🐦' },
    { id: 'blog', label: 'Blog post', icon: '📰' },
    { id: 'main-points', label: 'Main points', icon: '📊' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'todo', label: 'To-do list', icon: '✅' },
    { id: 'cleanup', label: 'Cleanup', icon: '🧹' },
  ];

  const handleCreate = () => {
    // Implement summary creation logic here
    console.log('Creating summary:', selectedType, selectedNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">What do you want to create?</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {summaryTypes.map((type) => (
            <button
              key={type.id}
              className={`p-2 rounded-full ${
                selectedType === type.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="block text-sm">{type.label}</span>
            </button>
          ))}
        </div>
        <h3 className="font-semibold mb-2">Select the notes</h3>
        <div className="max-h-40 overflow-y-auto mb-4">
          {notes.map((note) => (
            <label key={note.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 rounded-full"
                checked={selectedNotes.includes(note.id)}
                onChange={() => {
                  setSelectedNotes((prev) =>
                    prev.includes(note.id)
                      ? prev.filter((id) => id !== note.id)
                      : [...prev, note.id]
                  );
                }}
              />
              {note.title}
            </label>
          ))}
        </div>
        <Button
          className="w-full bg-black text-white rounded-full"
          onClick={handleCreate}
          disabled={!selectedType || selectedNotes.length === 0}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default SummaryGenerator;