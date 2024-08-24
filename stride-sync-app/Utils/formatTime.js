/**
 * Formats a time value in seconds to a string in HH:MM:SS.ss format.
 * @param {number|string} seconds - The time value in seconds.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return 'Invalid time';
  }

  const numSeconds = parseFloat(seconds);
  const hours = Math.floor(numSeconds / 3600);
  const minutes = Math.floor((numSeconds % 3600) / 60);
  const secs = (numSeconds % 60).toFixed(2);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:`;
  }

  if (hours > 0 || minutes > 0) {
    formattedTime += `${minutes}:`;
  }

  // Remove trailing zeros from seconds, but keep at least one digit after decimal point
  const formattedSecs = secs.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');

  formattedTime += formattedSecs;

  return formattedTime;
};
