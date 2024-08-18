import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import Header from '../Header'; 
import Footer from '../Footer';

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

  const handleDelete = () => {
    // Ask for confirmation before deleting
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this training session?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios.delete(`http://192.168.100.71:3000/api/training-sessions/${sessionId}`)
              .then(() => {
                // Redirect to the Training Log screen after deletion
                navigation.navigate('TrainingLog');
              })
              .catch(error => {
                console.error('Error deleting session:', error);
                Alert.alert('Error', 'Failed to delete the session. Please try again.');
              });
          }
        }
      ]
    );
  };

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
        <Text style={styles.sectionTitle}>Training Overview</Text>

        {/* Card for Date, Type, and Intensity */}
        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{format(new Date(SessionDate), 'MMM dd, yyyy')}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{SessionType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Intensity</Text>
            <Text style={styles.detailValue}>{IntensityPercentage}%</Text>
          </View>
        </View>

        {/* Event Details */}
        <Text style={styles.sectionTitle}>Event Details</Text>
        <View style={styles.eventList}>
          {EventDetails.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>
                Event: {event.Event} {event.EventType === 'running' ? 'meters' : ''}
              </Text>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Reps:</Text>
                <Text style={styles.eventValue}>{event.Reps}</Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Marks:</Text>
                <Text style={styles.eventValue}>
                  {event.Marks.map(mark => `${parseFloat(mark.Mark).toFixed(2)}${event.EventType === 'running' ? 's' : 'm'}`).join(', ')}
                </Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Total Distance:</Text>
                <Text style={styles.eventValue}>{parseFloat(event.TotalDistance).toFixed(2)}m</Text>
              </View>
              {/* Conditionally render Total Time */}
              {event.EventType === 'running' && (
                <View style={styles.eventRow}>
                  <Text style={styles.eventLabel}>Total Time:</Text>
                  <Text style={styles.eventValue}>{parseFloat(event.TotalTime).toFixed(2)}s</Text>
                </View>
              )}
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Grass:</Text>
                <Text style={styles.eventValue}>{event.grass ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Spikes:</Text>
                <Text style={styles.eventValue}>{event.spikes ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Sled:</Text>
                <Text style={styles.eventValue}>{event.sled ? 'Yes' : 'No'}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{Notes}</Text>
          </View>
        </View>

        {/* Delete Button */}
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Session</Text>
          </TouchableOpacity>
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
  detailsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderColor: '#2A2A2A',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between', // Space items evenly across the card
  },
  detailItem: {
    alignItems: 'center', // Center the text items in each column
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BBBBBB', // Subtle color for the label
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF', // Bright color for the value
  },
  section: {
    marginBottom: 25,
    marginTop: 20,
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
  eventCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFC107',
    marginBottom: 10,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BBBBBB',
  },
  eventValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  errorText: {
    color: '#F5F5F5',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
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
  deleteButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30', // Bright red background for delete button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TrainingSessionDetailsScreen;
