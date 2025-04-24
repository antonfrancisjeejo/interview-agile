export const getFormattedTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Ensure two-digit format using String.prototype.padStart
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
export const formatMeaningfulTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m : ${remainingSeconds}s`;
};

export const formatFullMeaningfulTime = (seconds: number): string => {
  if (seconds <= 0) return "0s";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0)
    parts.push(`${remainingSeconds}s`);

  return parts.join(" : ");
};

// Function to calculate and format the time difference
export function getTimeDifference(
  callStartedTime: number,
  lastReceivedTime: number
): string {
  // Calculate the difference in milliseconds
  const differenceMs = lastReceivedTime - callStartedTime;

  // Convert to seconds (absolute value to handle negative differences if needed)
  const totalSeconds = Math.abs(Math.floor(differenceMs / 1000));

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the result as "minutes:seconds sec"
  // Pad seconds with leading zero if less than 10
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds} sec`;
}
