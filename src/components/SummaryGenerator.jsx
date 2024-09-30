import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const SummaryGenerator = ({ notes, onClose }) => {
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [summaryType, setSummaryType] = useState('summary');

  const handleNoteSelection = (noteId) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  const generateSummary = async () => {
    // This is where you'd integrate with the ChatGPT API
    console.log(`Generating ${summaryType} for notes:`, selectedNotes);
    // Implement API call here
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Summary</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={summaryType} onValueChange={setSummaryType}>
            <SelectTrigger>
              <SelectValue placeholder="Select summary type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="tweet">Tweet</SelectItem>
              <SelectItem value="blogPost">Blog post</SelectItem>
              <SelectItem value="mainPoints">Main points</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="todoList">To-do list</SelectItem>
              <SelectItem value="cleanup">Cleanup</SelectItem>
            </SelectContent>
          </Select>
          <div className="max-h-[200px] overflow-y-auto">
            {notes.map(note => (
              <div key={note.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`note-${note.id}`}
                  checked={selectedNotes.includes(note.id)}
                  onCheckedChange={() => handleNoteSelection(note.id)}
                />
                <label htmlFor={`note-${note.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {note.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={generateSummary} disabled={selectedNotes.length === 0}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryGenerator;