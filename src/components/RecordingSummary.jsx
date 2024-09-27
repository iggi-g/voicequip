import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RecordingSummary = ({ audioBlob, onClose }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [folder, setFolder] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    // Here you would implement the logic to save the recording with its metadata
    console.log('Saving recording:', { title, summary, folder, tags });
    onClose();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Recording Summary</h3>
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
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Recording</Button>
      </div>
    </div>
  );
};

export default RecordingSummary;