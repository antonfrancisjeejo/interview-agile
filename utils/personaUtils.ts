export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    case "Medium":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200";
    case "Hard":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
    default:
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
  }
}

export function getMoodIcon(mood: string) {
  switch (mood) {
    case "Good":
      return "😊";
    case "Neutral":
      return "🤨";
    case "Bad":
      return "😠";
    default:
      return "😐";
  }
}

export function getRecommendationReason(personaId: string) {
  switch (personaId) {
    case "1":
      return "Based on your recent success rate (78%), practicing with curious prospects like Sarah will help build your confidence with warm leads.";
    case "2":
      return "Your handling of objections has improved 12% this month - time to practice with Michael to master skeptical client techniques.";
    case "3":
      return "Data shows your pitch pace is 15% faster than ideal - Olivia will help you improve timing with demanding clients.";
    default:
      return "Based on your recent performance metrics, this persona matches your current development needs.";
  }
}

export function getColorForText(text: string) {
  const colors = [
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
    "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
  ];

  // Hash function to get a number from the text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a valid index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
export function getFormatedMood(mood: string | undefined | null): string {
  if (!mood) {
    return "";
  }

  switch (mood) {
    case "easy-friendly":
      return "Easy and Friendly";
    case "easy-curious":
      return "Easy and Curious";
    case "medium-friendly":
      return "Medium and Friendly";
    case "medium-curious":
      return "Medium and Curious";
    case "medium-skeptical":
      return "Medium and Skeptical";
    case "hard-skeptical":
      return "Hard and Skeptical";
    case "hard-curt":
      return "Hard and Curt";
    default:
      return mood;
  }
}
