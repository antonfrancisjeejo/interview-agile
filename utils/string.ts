export const getFirstCharacter = (input: string | undefined): string => {
  if (!input) {
    return "";
  }
  return input.charAt(0).toUpperCase();
};

export const getNameShortcut = (name: string): string => {
  const words = name.trim().split(/\s+/); // Split by spaces and remove extra spaces

  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase(); // First letter of first two words
  } else {
    return words[0].slice(0, 2).toUpperCase(); // First two letters of the first word
  }
};

export function getFeedbackMessage(score: number): string {
  if (score >= 90 && score <= 100) {
    return "Excellent Work! 🏆";
  } else if (score >= 80 && score <= 89) {
    return "Great Job! 👍";
  } else if (score >= 70 && score <= 79) {
    return "Good Effort! ✅";
  } else if (score >= 60 && score <= 69) {
    return "Needs Improvement 📚 ";
  } else if (score >= 50 && score <= 59) {
    return "Work Harder ⚠️ ";
  } else if (score >= 0 && score <= 49) {
    return "Retake Required ❌ ";
  } else {
    return "Invalid Score";
  }
}
