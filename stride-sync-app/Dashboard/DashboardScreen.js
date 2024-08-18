import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');

// Sample motivational quotes
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

const DashboardScreen = ({ navigation }) => {
  const [mostRecentSession, setMostRecentSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldEventStats, setFieldEventStats] = useState({
    highJump: { total: 0, average: 0 },
    longJump: { total: 0, average: 0 },
    poleVault: { total: 0, average: 0 },
    shotPut: { total: 0, average: 0 },
    discus: { total: 0, average: 0 },
    javelin: { total: 0, average: 0 },
    hammerThrow: { total: 0, average: 0 }
  });
  const [totalDistanceRan, setTotalDistanceRan] = useState(0);
  const [totalTimeRan, setTotalTimeRan] = useState(0);
  const [intensityData, setIntensityData] = useState({ labels: [], datasets: [] });
  const [dailyQuote, setDailyQuote] = useState(getDailyQuote());

  const fetchData = async () => {
    try {
      setLoading(true);
      const distanceResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/distance');
      const distances = distanceResponse.data;
      setTotalDistanceRan(distances.totalDistanceRan);
  
      const eventCountsResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/event-counts-and-distance');
      const eventCounts = eventCountsResponse.data;
      setTotalTimeRan(eventCounts.totalTimeRan);
  
      const formattedStats = {
        highJump: { total: distances.totalDistanceHighJumped, average: (eventCounts.totalHighJumps > 0 ? (distances.totalDistanceHighJumped / eventCounts.totalHighJumps).toFixed(2) : 0) },
        longJump: { total: distances.totalDistanceLongJumped, average: (eventCounts.totalLongJumps > 0 ? (distances.totalDistanceLongJumped / eventCounts.totalLongJumps).toFixed(2) : 0) },
        poleVault: { total: distances.totalDistancePoleVaulted, average: (eventCounts.totalPoleVaults > 0 ? (distances.totalDistancePoleVaulted / eventCounts.totalPoleVaults).toFixed(2) : 0) },
        shotPut: { total: distances.totalDistanceShotPut, average: (eventCounts.totalShotPuts > 0 ? (distances.totalDistanceShotPut / eventCounts.totalShotPuts).toFixed(2) : 0) },
        discus: { total: distances.totalDistanceDiscusThrown, average: (eventCounts.totalDiscusThrows > 0 ? (distances.totalDistanceDiscusThrown / eventCounts.totalDiscusThrows).toFixed(2) : 0) },
        javelin: { total: distances.totalDistanceJavelinThrown, average: (eventCounts.totalJavelinThrows > 0 ? (distances.totalDistanceJavelinThrown / eventCounts.totalJavelinThrows).toFixed(2) : 0) },
        hammerThrow: { total: distances.totalDistanceHammerThrown, average: (eventCounts.totalHammerThrows > 0 ? (distances.totalDistanceHammerThrown / eventCounts.totalHammerThrows).toFixed(2) : 0) }
      };
  
      setFieldEventStats(formattedStats);
  
      const trainingSessionsResponse = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
      const trainingSessions = trainingSessionsResponse.data;
  
// Current date
const today = moment();
// Start of the current week
const startOfWeek = today.clone().startOf('week');
// End of the current week (6 days after the start)
const endOfWeek = startOfWeek.clone().add(6, 'days');
// Start of the previous week
const startOfLastWeek = startOfWeek.clone().subtract(1, 'week');
// End of the previous week (the day before the start of the current week)
const endOfLastWeek = startOfWeek.clone().subtract(1, 'day');

// Arrays to hold sessions
const currentWeekSessions = [];
const lastWeekSessions = [];

// Process training sessions
trainingSessions.forEach(session => {
    const sessionDate = moment(session.SessionDate);
    if (sessionDate.isSameOrAfter(startOfWeek) && sessionDate.isSameOrBefore(endOfWeek)) {
        currentWeekSessions.push(session);
    } else if (sessionDate.isSameOrAfter(startOfLastWeek) && sessionDate.isSameOrBefore(endOfLastWeek)) {
        lastWeekSessions.push(session);
    }
});

// Log date ranges
console.log('Date range for the current week:');
console.log('Start:', startOfWeek.format('YYYY-MM-DD'));
console.log('End:', endOfWeek.format('YYYY-MM-DD'));

console.log('Date range for the last week:');
console.log('Start:', startOfLastWeek.format('YYYY-MM-DD'));
console.log('End:', endOfLastWeek.format('YYYY-MM-DD'));


      const processWeeklyData = (sessions) => {
        const weekData = Array(7).fill(0); // Array for 7 days, filled with 0
        const sessionCounts = Array(7).fill(0); // Track the number of sessions for each day

        sessions.forEach(session => {
          const dayIndex = moment(session.SessionDate).day(); // 0 = Sunday, 6 = Saturday
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
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red line for last week
            strokeWidth: 3
          },
          {
            data: thisWeekData.map(Number),
            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Blue line for this week
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Dashboard" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScrollView}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Running Metrics</Text>
            <Text style={styles.cardValue}>Total Distance: {totalDistanceRan / 1000} km</Text>
            <Text style={styles.cardValue}>Average Pace: {averagePace} min/km</Text>
          </TouchableOpacity>
          {Object.keys(fieldEventStats).map((eventKey, index) => {
            const stats = fieldEventStats[eventKey];
            return (
              <TouchableOpacity key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{eventKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                <Text style={styles.cardValue}>Total Distance: {stats.total.toFixed(2)} m</Text>
                <Text style={styles.cardValue}>Average Distance: {stats.average} m</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <Text style={styles.chartTitle}>Average Training Intensity Over Time</Text>
          <LineChart
            data={intensityData}
            width={width + 20}
            height={350}
            chartConfig={{
              backgroundColor: '#1F1F1F',
              backgroundGradientFrom: '#1F1F1F',
              backgroundGradientTo: '#2F2F2F',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 3,
              decimalPlaces: 2,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#FFB74D",
                fill: "#FFB74D"
              },
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
              propsForHorizontalLabels: {
                fontSize: 12,
                color: '#E0E0E0'
              },
              propsForVerticalLabels: {
                fontSize: 12,
                color: '#E0E0E0'
              }
            }}
            style={styles.chart}
          />

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: 'rgba(54, 162, 235, 1)' }]} />
              <Text style={styles.legendLabel}>This Week</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: 'rgba(255, 99, 132, 1)' }]} />
              <Text style={styles.legendLabel}>Last Week</Text>
            </View>
          </View>

          <Text style={styles.quoteText}>{dailyQuote}</Text>
        </View>
      </ScrollView>

      <Footer navigation={navigation} activeScreen="Dashboard" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 150,
    marginTop: 10,
  },
  cardsScrollView: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  card: {
    width: width * 0.6,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
    height: 120,
    marginHorizontal: 5,
    marginVertical: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: RFValue(16),
    color: '#F0F0F0',
    fontFamily: 'Montserrat-SemiBold',
  },
  cardValue: {
    fontSize: RFValue(14),
    color: '#E0E0E0',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: RFValue(22),
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quoteText: {
    fontSize: RFValue(18),
    color: '#E0E0E0',
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 15,
  },
  errorText: {
    color: '#E0E0E0',
    fontSize: RFValue(16),
    textAlign: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: RFValue(18),
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: RFValue(16),
    color: '#E0E0E0',
  },
});

export default DashboardScreen;
