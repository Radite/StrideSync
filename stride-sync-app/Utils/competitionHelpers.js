export const getOrdinal = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
};

export const getMarkUnit = (eventName) => {
  if (eventName.endsWith('m') || eventName.includes('steeplechase') || eventName.includes('marathon')) {
    return 's'; // Seconds for running events
  }
  return 'm'; // Meters for other events
};

export const fetchPersonalBests = async (athleteId) => {
  try {
    const response = await fetch(`http://192.168.100.71:3000/api/athlete-profiles/${athleteId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching personal bests:', error);
    return null;
  }
};

export const saveCompetitionData = async (competitionData) => {
  try {
    const response = await fetch('http://192.168.100.71:3000/api/competitions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(competitionData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving competition data:', error);
    return null;
  }
};
