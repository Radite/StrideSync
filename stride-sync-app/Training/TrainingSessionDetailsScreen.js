import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import Header from '../Header'; // Adjust the import path as needed
import Footer from '../Footer'; // Adjust the import path as needed

const { width } = Dimensions.get('window');

const TrainingSessionDetailsScreen = ({ route, navigation }) => {
  const { sessionId } = route.params;
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    // Fetch session details from the API
    axios.get(`http://192.168.100.71:3000/api/training-sessions/${sessionId}`)
      .then(response => {
        setSessionDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching session details:', error);
      });
  }, [sessionId]);

  if (!sessionDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Training Session" navigation={navigation} />
        <View style={styles.content}>
          <Text style={styles.errorText}>Loading...</Text>
        </View>
        <Footer navigation={navigation} activeScreen="TrainingLog" />
      </SafeAreaView>
    );
  }

  const {
    SessionDate, SessionType, EventDetails, IntensityPercentage, Notes
  } = sessionDetails;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Training Session" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Card for Date, Type, and Intensity */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Date</Text>
          <Text style={styles.cardValue}>{format(new Date(SessionDate), 'MMM dd, yyyy')}</Text>
          <Text style={styles.cardTitle}>Type</Text>
          <Text style={styles.cardValue}>{SessionType}</Text>
          <Text style={styles.cardTitle}>Intensity</Text>
          <Text style={styles.cardValue}>{IntensityPercentage}%</Text>
        </View>
        
        {/* Event Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.eventList}>
            {EventDetails.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventText}>Event: {event.Event} meters</Text>
                <Text style={styles.eventText}>Reps: {event.Reps}</Text>
                <Text style={styles.eventText}>Marks: {event.Marks.map(mark => mark.Mark).join(', ')}</Text>
                <Text style={styles.eventText}>Total Distance: {event.TotalDistance} meters</Text>
                <Text style={styles.eventText}>Total Time: {event.TotalTime} seconds</Text>
                <Text style={styles.eventText}>Grass: {event.grass ? 'Yes' : 'No'}</Text>
                <Text style={styles.eventText}>Spikes: {event.spikes ? 'Yes' : 'No'}</Text>
                <Text style={styles.eventText}>Sled: {event.sled ? 'Yes' : 'No'}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{Notes}</Text>
          </View>
        </View>

      </ScrollView>
      <Footer navigation={navigation} activeScreen="TrainingLog" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Darker background for modern look
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#1E1E1E', // Use a slightly lighter background for cards
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderColor: '#2A2A2A', // Subtle border color
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: width - 40,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFC107', // Updated to a more modern yellow accent
  },
  cardValue: {
    fontSize: 15,
    color: '#F5F5F5', // Slightly lighter text for contrast
    marginTop: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFC107',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 8,
  },
  eventList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  eventItem: {
    marginBottom: 15,
  },
  eventText: {
    fontSize: 15,
    color: '#F5F5F5',
    lineHeight: 22,
  },
  errorText: {
    color: '#F5F5F5',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TrainingSessionDetailsScreen;
