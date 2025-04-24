export const getPercentage = (value: number, total: number): number => {
  if (!value || !total) return 0; // Ensure no division by zero
  return Math.round((value / total) * 100);
};

export async function calculateWPM(
  text: string,
  timeInSeconds: number
): Promise<number> {
  return new Promise((resolve) => {
    if (!text || timeInSeconds <= 0) {
      resolve(0);
      return;
    }

    const wordCount = text
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const timeInMinutes = timeInSeconds / 60;

    resolve(Math.round(wordCount / timeInMinutes));
  });
}
