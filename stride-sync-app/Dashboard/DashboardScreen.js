import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import axios from 'axios'; // For making HTTP requests
import { LineChart } from 'react-native-chart-kit'; // For mini charts

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total distances
        const distanceResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/distance');
        const distances = distanceResponse.data;
        
        // Set total distance ran
        setTotalDistanceRan(distances.totalDistanceRan);

        // Fetch event counts and total time ran
        const eventCountsResponse = await axios.get('http://192.168.100.71:3000/api/athlete-profiles/1/event-counts-and-distance');
        const eventCounts = eventCountsResponse.data;
        
        // Set total time ran
        setTotalTimeRan(eventCounts.totalTimeRan);

        // Calculate averages
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

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate average pace
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

  // Sample data for charts and progress
  const sampleData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      data: [2, 4, 6, 8]
    }]
  };

  return (
    <View style={styles.container}>
      <Header title="Dashboard" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Horizontal ScrollView for Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScrollView}>
          {/* Combined Card for Running Metrics */}
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

        {/* Mini Charts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <LineChart
            data={sampleData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1F1F1F',
              backgroundGradientFrom: '#1F1F1F',
              backgroundGradientTo: '#1F1F1F',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2
            }}
            style={styles.chart}
          />
        </View>

        {/* Activity Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activityFeed}>
            {mostRecentSession && (
              <View style={styles.activityItem}>
                <Text style={styles.activityDate}>{new Date(mostRecentSession.SessionDate).toDateString()}</Text>
                <Text style={styles.activityDetail}>Distance: {mostRecentSession.CumulativeDistance / 1000} km</Text>
                <Text style={styles.activityDetail}>Intensity: {mostRecentSession.IntensityPercentage}%</Text>
                <Text style={styles.activityDetail}>Type: {mostRecentSession.SessionType}</Text>
                <Text style={styles.activityDetail}>Notes: {mostRecentSession.Notes}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventList}>
            <Text style={styles.eventItem}>Event 1: 10K Race - August 20, 2024</Text>
            <Text style={styles.eventItem}>Event 2: Marathon - September 15, 2024</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer component */}
      <Footer navigation={navigation} activeScreen="Dashboard" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Matching background color
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 150, // Increased padding to match footer height
    marginTop: 10,
  },
  cardsScrollView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    width: width * 0.5, // Adjusted width for each card
    backgroundColor: '#1C1C1C', // Matching card background color
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
    color: '#F0F0F0', // Consistent font color
    fontFamily: 'Montserrat-SemiBold',
  },
  cardValue: {
    fontSize: 14,
    color: '#E0E0E0', // Consistent font color
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D', // Consistent section title color
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Consistent border color
  },
  chart: {
    marginVertical: 8,
  },
  activityFeed: {
    backgroundColor: '#1C1C1C', // Matching activity feed background color
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
    color: '#FFB74D', // Consistent date color
  },
  activityDetail: {
    fontSize: 16,
    color: '#E0E0E0', // Consistent detail color
  },
  eventList: {
    backgroundColor: '#1C1C1C', // Matching event list background color
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
    color: '#E0E0E0', // Consistent item color
    marginBottom: 10,
  },
  errorText: {
    color: '#E0E0E0', // Consistent error text color
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DashboardScreen;
