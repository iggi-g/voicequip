import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, Folder, Search } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Notes", content: "Discussed project timeline...", date: "2023-04-15", tags: ["work", "project"], folder: "Work" },
    { id: 2, title: "Ideas for New Feature", content: "1. Implement voice commands...", date: "2023-04-14", tags: ["feature", "development"], folder: "Ideas" },
    { id: 3, title: "Bug Report", content: "Found issue with login page...", date: "2023-04-13", tags: ["bug", "urgent"], folder: "Issues" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');

  const folders = ['All', ...new Set(notes.map(note => note.folder))];

  const filteredNotes = notes.filter(note => 
    (selectedFolder === 'All' || note.folder === selectedFolder) &&
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Notes</h2>
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {folders.map(folder => (
            <option key={folder} value={folder}>{folder}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{note.content.substring(0, 50)}...</p>
              <div className="flex items-center mt-2 space-x-2">
                <Folder className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">{note.folder}</span>
              </div>
              <div className="flex flex-wrap mt-2">
                {note.tags.map((tag, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                    <Tag className="inline-block h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{note.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;