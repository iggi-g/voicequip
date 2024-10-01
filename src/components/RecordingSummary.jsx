import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotionIntegration from './NotionIntegration';

const RecordingSummary = ({ audioBlob, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [folder, setFolder] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    generateTitleAndSummary();
  }, []);

  const generateTitleAndSummary = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer YOUR_CHATGPT_API_KEY_HERE' // Replace with your actual API key
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setTitle(data.title);
      setSummary(data.summary);
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
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Error</h3>
        <p className="text-red-500">{error}</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recording Summary</h3>
      <audio src={URL.createObjectURL(audioBlob)} controls className="w-full mb-4" />
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="mb-4"
      />
      <Select value={folder} onValueChange={setFolder}>
        <SelectTrigger className="mb-4">
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
        className="mb-4"
      />
      <NotionIntegration note={{ title, content: summary, tags: tags.split(',').map(tag => tag.trim()) }} />
      <div className="flex justify-end space-x-4 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Recording</Button>
      </div>
    </div>
  );
};

export default RecordingSummary;