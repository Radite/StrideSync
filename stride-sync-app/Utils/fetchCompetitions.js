// fetchCompetitions.js
export const fetchCompetitions = async () => {
  try {
    const response = await fetch('http://192.168.100.71:3000/api/competitions/athlete/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Extract unique events
    const events = data.flatMap(comp => comp.EventResults.map(result => result.Event));
    const uniqueEventsSet = new Set(events);
    const uniqueEvents = ['All Events', ...Array.from(uniqueEventsSet)];
    
    return { data, uniqueEvents };
  } catch (error) {
    console.error('Error fetching competition data:', error);
    throw error;
  }
};
