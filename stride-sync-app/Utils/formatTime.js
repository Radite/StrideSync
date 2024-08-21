// formatTime.js

export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return 'Invalid time';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = (seconds % 60).toFixed(2);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.padStart(5, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${secs.padStart(5, '0')}`;
  } else {
    return secs.padStart(5, '0');
  }
};
