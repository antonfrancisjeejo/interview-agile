/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowUp, Brain, Check, Lightbulb, MessageSquareText } from "lucide-react";


// Get the right icon for each suggestion category
export const getCategoryIcon = (category:any) => {
  switch(category) {
    case 'pitch':
      return <MessageSquareText className="h-4 w-4 text-blue-500" />;
    case 'objection':
      return <ArrowUp className="h-4 w-4 text-amber-500" />;
    case 'closing':
      return <Check className="h-4 w-4 text-green-500" />;
    case 'rapport':
      return <Brain className="h-4 w-4 text-purple-500" />;
    case 'discovery':
      return <Lightbulb className="h-4 w-4 text-cyan-500" />;
    default:
      return <Lightbulb className="h-4 w-4 text-primary" />;
  }
};

// Style based on difficulty level
export const getDifficultyStyle = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  switch(difficulty) {
    case 'beginner':
      return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    case 'intermediate':
      return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
    case 'advanced':
      return "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
  }
};

export const getScoreColorClass = (score: number) => {
  return score >= 85 ? 'text-green-600' : 
         score >= 70 ? 'text-amber-600' : 'text-red-600';
};
