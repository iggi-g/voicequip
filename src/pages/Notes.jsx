import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Folder } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Notes", content: "Discussed project timeline...", date: "2023-04-15", tags: ["work", "project"], folder: "Work" },
    { id: 2, title: "Ideas for New Feature", content: "1. Implement voice commands...", date: "2023-04-14", tags: ["feature", "development"], folder: "Ideas" },
    { id: 3, title: "Bug Report", content: "Found issue with login page...", date: "2023-04-13", tags: ["bug", "urgent"], folder: "Issues" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const folders = ['All', ...new Set(notes.map(note => note.folder))];
  const tags = ['All', ...new Set(notes.flatMap(note => note.tags))];

  const filteredNotes = notes.filter(note => 
    (selectedFolder === 'All' || note.folder === selectedFolder) &&
    (selectedTag === 'All' || note.tags.includes(selectedTag)) &&
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Your Notes</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            {folders.map(folder => (
              <SelectItem key={folder} value={folder}>{folder}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{note.content.substring(0, 50)}...</p>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                <Folder className="h-4 w-4 mr-1" />
                <span>{note.folder}</span>
              </div>
              <div className="flex flex-wrap mb-2">
                {note.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2 flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">{note.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;