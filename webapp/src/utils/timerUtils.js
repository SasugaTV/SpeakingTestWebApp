// timerUtils.js: Helper functions for timer display and management

/**
 * Format seconds into MM:SS display format
 * @param {number} seconds - Total seconds to format
 * @returns {string} Formatted time string (MM:SS)
 */
export function formatTime(seconds) {
  if (seconds < 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Calculate percentage of time remaining (for progress bar)
 * @param {number} timeRemaining - Seconds remaining
 * @param {number} totalDuration - Total duration in seconds
 * @returns {number} Percentage of time remaining (0-100)
 */
export function calculateTimePercentage(timeRemaining, totalDuration) {
  if (totalDuration <= 0) return 0;
  const percentage = (timeRemaining / totalDuration) * 100;
  return Math.max(0, Math.min(100, percentage));
}
