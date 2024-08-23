import axios from 'axios';

export const fetchTrainingData = async (setTrainingData, setLoading) => {
  try {
    const response = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
    setTrainingData(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching training data:', error);
    setLoading(false);
  }
};

export const fetchCompetitionData = async (
  setCompetitionData,
  setEventNames,
  setEventPerformance,
  setSelectedEvent,
  setDates,
  setLoading
) => {
  try {
    const response = await axios.get('http://192.168.100.71:3000/api/competitions/athlete/1');
    const data = response.data;

    const events = new Set();
    const performance = {};
    const dates = [];

    data.forEach((competition) => {
      competition.EventResults.forEach((result) => {
        const eventName = result.Event;
        events.add(eventName);

        if (!performance[eventName]) {
          performance[eventName] = [];
        }

        const value = parseFloat(result.Time || result.Mark);
        performance[eventName].push(value);
        dates.push(competition.CompetitionDate);
      });
    });

    setCompetitionData(data);
    setEventNames([...events]);
    setEventPerformance(performance);
    setSelectedEvent([...events][0]);
    setDates(dates.map((date) => new Date(date).toLocaleDateString()));
    setLoading(false);
  } catch (error) {
    console.error('Error fetching competition data:', error);
    setLoading(false);
  }
};
