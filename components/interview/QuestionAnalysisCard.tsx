"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, MessageSquare, Clock } from "lucide-react";

interface QuestionAnalysisCardProps {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  duration: string;
}

const QuestionAnalysisCard = ({
  question,
  answer,
  score,
  feedback,
  duration,
}: QuestionAnalysisCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Question Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Question</h3>
          <p className="text-gray-600">{question}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Your Answer</h3>
          <p className="text-gray-600">{answer}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Score: {score}%</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <Progress value={score} className="h-2" />
        <div>
          <h3 className="font-medium mb-2">Feedback</h3>
          <p className="text-gray-600">{feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnalysisCard;
