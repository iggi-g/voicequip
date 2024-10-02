import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NotionIntegration from './NotionIntegration';
import { generateMockSummary } from '../utils/mockDataUtils';

const RecordingSummary = ({ audioBlob, onClose, onSave, isOpen }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [folder, setFolder] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && audioBlob) {
      generateTitleAndSummary();
    }
  }, [isOpen, audioBlob]);

  const generateTitleAndSummary = async () => {
    try {
      const { title, summary } = await generateMockSummary(audioBlob);
      setTitle(title);
      setSummary(summary);
    } catch (err) {
      console.error('Error generating title and summary:', err);
      setError('Failed to generate title and summary. Please try again.');
    }
  };

  const handleSave = () => {
    const newNote = {
      id: Date.now(),
      title,
      content: summary,
      date: new Date().toISOString().split('T')[0],
      tags: tags.split(',').map(tag => tag.trim()),
      folder,
      audioUrl: URL.createObjectURL(audioBlob)
    };

    onSave(newNote);
    onClose();
  };

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <p className="text-red-500">{error}</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recording Summary</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <audio src={audioBlob ? URL.createObjectURL(audioBlob) : ''} controls className="w-full mb-4" />
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <Select value={folder} onValueChange={setFolder}>
            <SelectTrigger>
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="ideas">Ideas</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <NotionIntegration note={{ title, content: summary, tags: tags.split(',').map(tag => tag.trim()) }} />
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Recording</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingSummary;