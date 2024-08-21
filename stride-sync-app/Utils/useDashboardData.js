import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The harder you work for something, the greater you'll feel when you achieve it."
];

const getDailyQuote = () => {
  const dayOfYear = moment().dayOfYear();
  return quotes[dayOfYear % quotes.length];
};

const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDistanceRan, setTotalDistanceRan] = useState(0);
  const [totalTimeRan, setTotalTimeRan] = useState(0);
  const [fieldEventStats, setFieldEventStats] = useState({
    highJump: { total: 0, average: 0 },
    longJump: { total: 0, average: 0 },
    poleVault: { total: 0, average: 0 },
    shotPut: { total: 0, average: 0 },
    discus: { total: 0, average: 0 },
    javelin: { total: 0, average: 0 },
    hammerThrow: { total: 0, average: 0 }
  });
  const [intensityData, setIntensityData] = useState({ labels: [], datasets: [] });
  const [dailyQuote, setDailyQuote] = useState(getDailyQuote());

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch the distance data
      const distanceResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/distance');
      const distances = distanceResponse.data;
      setTotalDistanceRan(distances.totalDistanceRan);

      // Fetch event counts and time ran data
      const eventCountsResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/event-counts-and-distance');
      const eventCounts = eventCountsResponse.data;
      setTotalTimeRan(eventCounts.totalTimeRan);

      // Calculate field event stats
      const formattedStats = {
        highJump: {
          total: distances.totalDistanceHighJumped,
          average: eventCounts.totalHighJumps > 0 ? (distances.totalDistanceHighJumped / eventCounts.totalHighJumps).toFixed(2) : 0
        },
        longJump: {
          total: distances.totalDistanceLongJumped,
          average: eventCounts.totalLongJumps > 0 ? (distances.totalDistanceLongJumped / eventCounts.totalLongJumps).toFixed(2) : 0
        },
        poleVault: {
          total: distances.totalDistancePoleVaulted,
          average: eventCounts.totalPoleVaults > 0 ? (distances.totalDistancePoleVaulted / eventCounts.totalPoleVaults).toFixed(2) : 0
        },
        shotPut: {
          total: distances.totalDistanceShotPut,
          average: eventCounts.totalShotPuts > 0 ? (distances.totalDistanceShotPut / eventCounts.totalShotPuts).toFixed(2) : 0
        },
        discus: {
          total: distances.totalDistanceDiscusThrown,
          average: eventCounts.totalDiscusThrows > 0 ? (distances.totalDistanceDiscusThrown / eventCounts.totalDiscusThrows).toFixed(2) : 0
        },
        javelin: {
          total: distances.totalDistanceJavelinThrown,
          average: eventCounts.totalJavelinThrows > 0 ? (distances.totalDistanceJavelinThrown / eventCounts.totalJavelinThrows).toFixed(2) : 0
        },
        hammerThrow: {
          total: distances.totalDistanceHammerThrown,
          average: eventCounts.totalHammerThrows > 0 ? (distances.totalDistanceHammerThrown / eventCounts.totalHammerThrows).toFixed(2) : 0
        }
      };

      setFieldEventStats(formattedStats);

      // Fetch training sessions data
      const trainingSessionsResponse = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
      const trainingSessions = trainingSessionsResponse.data;

      // Process training sessions to calculate weekly intensity data
      const today = moment();
      const startOfWeek = today.clone().startOf('week');
      const endOfWeek = startOfWeek.clone().add(6, 'days');
      const startOfLastWeek = startOfWeek.clone().subtract(1, 'week');
      const endOfLastWeek = startOfWeek.clone().subtract(1, 'day');

      const currentWeekSessions = [];
      const lastWeekSessions = [];

      trainingSessions.forEach(session => {
        const sessionDate = moment(session.SessionDate);
        if (sessionDate.isSameOrAfter(startOfWeek) && sessionDate.isSameOrBefore(endOfWeek)) {
          currentWeekSessions.push(session);
        } else if (sessionDate.isSameOrAfter(startOfLastWeek) && sessionDate.isSameOrBefore(endOfLastWeek)) {
          lastWeekSessions.push(session);
        }
      });

      const processWeeklyData = (sessions) => {
        const weekData = Array(7).fill(0);
        const sessionCounts = Array(7).fill(0);

        sessions.forEach(session => {
          const dayIndex = moment(session.SessionDate).day();
          weekData[dayIndex] += session.IntensityPercentage;
          sessionCounts[dayIndex] += 1;
        });

        return weekData.map((totalIntensity, index) => {
          return sessionCounts[index] > 0 ? (totalIntensity / sessionCounts[index]).toFixed(2) : 0;
        });
      };

      const thisWeekData = processWeeklyData(currentWeekSessions);
      const lastWeekData = processWeeklyData(lastWeekSessions);

      setIntensityData({
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: lastWeekData.map(Number),
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            strokeWidth: 3
          },
          {
            data: thisWeekData.map(Number),
            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
            strokeWidth: 3
          }
        ]
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const distanceInKilometers = totalDistanceRan / 1000;
  const timeInMinutes = totalTimeRan / 60;
  const averagePace = distanceInKilometers > 0 ? (timeInMinutes / distanceInKilometers).toFixed(2) : '0.00';

  return {
    loading,
    error,
    totalDistanceRan,
    averagePace,
    fieldEventStats,
    intensityData,
    dailyQuote
  };
};

export default useDashboardData;
