import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Helper function to determine color class based on score
const getScoreColorClasses = (score: number) => {
  if (score >= 90)
    return "border-green-300 bg-green-50 dark:bg-green-950/40 dark:border-green-800/60";
  if (score >= 60)
    return "border-blue-300 bg-blue-50 dark:bg-blue-950/40 dark:border-blue-800/60";
  if (score >= 30)
    return "border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800/60";
  return "border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800/60";
};

// Helper function to get the appropriate icon
const getScoreIcon = (score: number) => {
  if (score >= 90)
    return (
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    );
  if (score >= 60)
    return <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  if (score >= 30)
    return (
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    );
  return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
};

export { getScoreColorClasses, getScoreIcon };
