import React from 'react';
import { Play, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NoteList = ({ notes, onDeleteNote }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{note.date}</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => onDeleteNote(note.id)}>
                <Trash2 className="h-4 w-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <MoreHorizontal className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{note.content.substring(0, 100)}...</p>
          <div className="flex items-center">
            <Play className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{note.duration || '00:00'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;