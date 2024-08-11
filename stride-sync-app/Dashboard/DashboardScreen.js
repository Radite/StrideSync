import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const { width } = Dimensions.get('window');

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
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [intensityData, setIntensityData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const competitionsResponse = await axios.get('http://192.168.100.71:3000/api/competitions/athlete/1');
        const competitions = competitionsResponse.data;
        setUpcomingEvents(competitions.filter(competition => new Date(competition.CompetitionDate) > new Date()));

        const trainingSessionsResponse = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
        const trainingSessions = trainingSessionsResponse.data;

        const groupedByWeek = trainingSessions.reduce((acc, session) => {
          const date = moment(session.SessionDate);
          const weekStart = date.startOf('week').format('YYYY-MM-DD');
          if (!acc[weekStart]) acc[weekStart] = [];
          acc[weekStart].push(session.IntensityPercentage);
          return acc;
        }, {});

        const labels = Object.keys(groupedByWeek);
        const data = labels.map(date => {
          const percentages = groupedByWeek[date];
          const avgIntensity = percentages.length > 0 ? (percentages.reduce((a, b) => a + b) / percentages.length).toFixed(2) : 0;
          return parseFloat(avgIntensity);
        });

        setIntensityData({
          labels,
          datasets: [{ data }]
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const renderEventItem = ({ item }) => (
    <Text style={styles.eventItem}>
      {item.CompetitionName} - {new Date(item.CompetitionDate).toDateString()}
    </Text>
  );

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
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.CompetitionID.toString()}
            contentContainerStyle={styles.eventList}
            ListEmptyComponent={<Text style={styles.eventItem}>No upcoming events</Text>}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <Text style={styles.chartTitle}>Average Intensity Over Time</Text>
          <LineChart
            data={intensityData}
            width={width + 20}
            height={300}
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
    marginBottom: 20,
  },
  card: {
    width: width * 0.5,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
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
    fontSize: 16,
    color: '#F0F0F0',
    fontFamily: 'Montserrat-SemiBold',
  },
  cardValue: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
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
  activityFeed: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 16,
    color: '#FFB74D',
  },
  activityDetail: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  eventList: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  eventItem: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  errorText: {
    color: '#E0E0E0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DashboardScreen;
