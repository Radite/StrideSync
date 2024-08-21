// src/utils/EventUtils.js
export const convertTimeToSeconds = (time) => {
  if (!time) return 0;

  const timeRegex = /^((\d{1,2}):)?(\d{1,2}):(\d{2})(\.(\d{1,3}))?$/;
  const decimalRegex = /^\d+(\.\d+)?$/;

  if (decimalRegex.test(time)) {
    return parseFloat(time);
  }

  const matches = time.match(timeRegex);

  if (!matches) {
    console.log('Time format error:', time);
    return 0;
  }

  const hours = parseInt(matches[2] || '0', 10);
  const minutes = parseInt(matches[3] || '0', 10);
  const seconds = parseInt(matches[4], 10);
  const milliseconds = parseFloat((matches[6] || '0').padEnd(3, '0'));

  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
};
