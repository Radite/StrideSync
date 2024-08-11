import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import axios from 'axios'; // For making HTTP requests
import { LineChart } from 'react-native-chart-kit'; // For mini charts
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const [mostRecentSession, setMostRecentSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
        const sessions = response.data;
        if (sessions.length > 0) {
          sessions.sort((a, b) => new Date(b.SessionDate) - new Date(a.SessionDate));
          setMostRecentSession(sessions[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Recent Personal Best</Text>
            <Text style={styles.cardValue}>10.5 km</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Average Pace</Text>
            <Text style={styles.cardValue}>4:30 min/km</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Distance Covered</Text>
            <Text style={styles.cardValue}>150 km</Text>
          </TouchableOpacity>
        </View>

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

        {/* Season Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Season Progress</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Total Distance This Season: 200 km</Text>
            <Text style={styles.progressText}>Goals Achieved: 3/5</Text>
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#1C1C1C', // Matching card background color
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
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
    fontSize: 18,
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
  progressContainer: {
    backgroundColor: '#1C1C1C', // Matching progress container background color
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
  progressText: {
    fontSize: 16,
    color: '#E0E0E0', // Consistent progress text color
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