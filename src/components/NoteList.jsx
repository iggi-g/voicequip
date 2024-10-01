import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';

const NoteList = ({ notes }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{note.date}</span>
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{note.content}</p>
          <div className="flex items-center">
            <Play className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{note.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;