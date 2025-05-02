"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
}

interface QuestionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuestionsModal({
  open,
  onOpenChange,
}: QuestionsModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (open) {
      fetchQuestions();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Practice Questions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {questions.map((q) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-lg">{q.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">
                    Category: {q.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Difficulty: {q.difficulty}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
