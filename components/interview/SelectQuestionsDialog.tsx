"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  type: "technical" | "behavioral" | "situational";
}

interface QuestionData {
  id: string;
  question: string;
  type: string;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
}

interface SelectQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (selectedQuestions: string[]) => void;
}

const SelectQuestionsDialog = ({
  open,
  onOpenChange,
  onComplete,
}: SelectQuestionsDialogProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("interview_questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      const typedQuestions: Question[] = data.map((item) => ({
        id: item.id,
        question: item.question,
        type:
          item.type === "technical" ||
          item.type === "behavioral" ||
          item.type === "situational"
            ? (item.type as "technical" | "behavioral" | "situational")
            : "technical",
      }));
      setQuestions(typedQuestions);
    }
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      }
      return [...prev, questionId];
    });
  };

  const handleComplete = () => {
    onComplete(selectedQuestions);
    onOpenChange(false);
  };

  const getTagColor = (type: Question["type"]) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "behavioral":
        return "bg-green-100 text-green-800";
      case "situational":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Interview Questions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Selected questions: {selectedQuestions.length}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {questions.map((question) => (
              <Card key={question.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id={`question-${question.id}`}
                    checked={selectedQuestions.includes(question.id)}
                    onCheckedChange={() => handleQuestionSelect(question.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <Badge
                          variant="secondary"
                          className={getTagColor(question.type)}
                        >
                          {question.type.charAt(0).toUpperCase() +
                            question.type.slice(1)}
                        </Badge>
                        <div className="text-gray-900">{question.question}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleComplete}
            disabled={selectedQuestions.length === 0}
          >
            Continue with {selectedQuestions.length} Questions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectQuestionsDialog;
