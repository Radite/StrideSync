import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import axios from 'axios'; // For making HTTP requests

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
          // Sort sessions by date in descending order
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

  return (
    <View style={styles.container}>
      <Header title="Dashboard" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Combined Performance Overview and Recent Activity */}
        <View style={styles.combinedSection}>
          <View style={styles.metricsContainer}>
            {mostRecentSession && (
              <>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Last Training:</Text>
                  <Text style={styles.metricValue}>
                    {mostRecentSession.CumulativeDistance / 1000} km, {mostRecentSession.IntensityPercentage}% Intensity
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Session Type:</Text>
                  <Text style={styles.metricValue}>{mostRecentSession.SessionType}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Notes:</Text>
                  <Text style={styles.metricValue}>{mostRecentSession.Notes}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Season Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Season Forecast</Text>
          <View style={styles.graphContainer}>
            <View style={styles.placeholderGraph}>
              <Text style={styles.placeholderText}>[Line Graph - Distance Over Time]</Text>
            </View>
          </View>
        </View>

        {/* Motivational Section with Achievement Badges */}
        <View style={styles.achievementSection}>
          <Text style={styles.motivationalQuote}>
            “Push yourself, because no one else will do it for you.”
          </Text>
          {/*<View style={styles.badges}>
            <Text style={styles.placeholderText}>[Achievement Badges]</Text>
          </View>*/}
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
    backgroundColor: '#121212', // Dark background for a modern look
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  combinedSection: {
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#E0E0E0', // Light color for text
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Subtle border for separation
  },
  metricsContainer: {
    padding: 15,
    borderRadius: 12, // More rounded corners for a modern look
    backgroundColor: '#1F1F1F',
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Android shadow
    marginBottom: 20,
  },
  metricItem: {
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 16,
    color: '#B0B0B0', // Slightly lighter color for labels
    fontFamily: 'Montserrat-SemiBold',
  },
  metricValue: {
    fontSize: 16,
    color: '#FFFFFF', // Contrast color for values
  },
  graphContainer: {
    marginBottom: 20,
  },
  placeholderGraph: {
    height: 300,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  placeholderText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  motivationalQuote: {
    fontSize: 16,
    color: '#E0E0E0', // Light color for text
    fontFamily: 'Montserrat-Italic', // Custom italic font if available
    fontWeight: 'bold', // Bold text
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  badges: {
    height: 100, // Fixed height for badges section
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  achievementSection: {
    marginTop: 20, // Ensure consistent spacing from the graph
    marginBottom: 20, // Add some space at the bottom to prevent crowding
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  errorText: {
    color: '#E0E0E0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DashboardScreen;
