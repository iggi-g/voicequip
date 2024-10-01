import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AskAI = ({ notes, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskQuestion = async () => {
    // This is a placeholder. In a real implementation, you would:
    // 1. Send the question and notes to your backend
    // 2. Have your backend use an AI service to generate an answer
    // 3. Return the answer and update the state
    setAnswer("This is a placeholder answer. Implement AI integration for real functionality.");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ask about your notes</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button onClick={handleAskQuestion}>Ask</Button>
          {answer && (
            <div className="mt-4">
              <h4 className="font-semibold">Answer:</h4>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAI;