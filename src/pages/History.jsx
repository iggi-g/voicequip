import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateTranscriptionCost } from '../utils/transcriptionUtils';

const History = () => {
  const [notes, setNotes] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);

    const cost = savedNotes.reduce((acc, note) => {
      // Assuming each note has a duration property in seconds
      return acc + calculateTranscriptionCost(note.duration || 0);
    }, 0);
    setTotalCost(cost);
  }, []);

  const handleRowClick = (note) => {
    // Navigate to the note details or open a modal
    console.log('Clicked note:', note);
    // Implement navigation or modal opening logic here
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Activity History</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-lg font-semibold">Total Transcription Cost: ${totalCost.toFixed(2)}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id} onClick={() => handleRowClick(note)} className="cursor-pointer hover:bg-gray-100">
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.date}</TableCell>
              <TableCell>{note.duration ? `${Math.floor(note.duration / 60)}:${(note.duration % 60).toString().padStart(2, '0')}` : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;