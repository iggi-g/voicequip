import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, RotateCcw, X } from 'lucide-react';

const AskAI = ({ notes, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [suggestions] = useState([
    "Do you have a TO DO list for me for today?",
    "What's been happening in my life these days?"
  ]);

  const handleAskQuestion = async () => {
    // Placeholder for AI integration
    setAnswer("This is a placeholder answer. Implement AI integration for real functionality.");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg p-6">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-semibold">Ask about your notes.</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask a question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAskQuestion} size="icon" className="rounded-full">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Suggestions</h4>
            <Button
              variant="outline"
              size="sm"
              className="mr-2 mb-2 rounded-full"
              onClick={() => setQuestion(suggestions[0])}
            >
              {suggestions[0]}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setQuestion(suggestions[1])}
            >
              {suggestions[1]}
            </Button>
          </div>
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