import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Notes = () => {
  const notes = [
    { id: 1, title: "Meeting Notes", content: "Discussed project timeline...", date: "2023-04-15" },
    { id: 2, title: "Ideas for New Feature", content: "1. Implement voice commands...", date: "2023-04-14" },
    { id: 3, title: "Bug Report", content: "Found issue with login page...", date: "2023-04-13" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Notes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{note.content.substring(0, 50)}...</p>
              <p className="text-xs text-gray-400 mt-2">{note.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;