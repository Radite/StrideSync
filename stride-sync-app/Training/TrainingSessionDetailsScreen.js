// TrainingSessionDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';

const TrainingSessionDetailsScreen = ({ route }) => {
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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const {
    SessionDate, SessionType, EventDetails, SpecialConditions, IntensityPercentage, Notes,
    TotalDistanceRan, TotalTimeRan, NumberOfLongJumps, NumberOfHighJumps, NumberOfPoleVaults,
    NumberOfShotPuts, NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows,
    NumberOfTripleJumps, TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted,
    TotalDistanceShotPut, TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown,
    TotalDistanceTripleJumped
  } = sessionDetails;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Training Session Details</Text>
      <Text style={styles.detail}>Date: {format(new Date(SessionDate), 'MMM dd, yyyy')}</Text>
      <Text style={styles.detail}>Type: {SessionType}</Text>
      <Text style={styles.detail}>Intensity: {IntensityPercentage}%</Text>
      <Text style={styles.detail}>Notes: {Notes}</Text>
      <Text style={styles.header}>Event Details</Text>
      {EventDetails.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.event}>Event: {event.Event}</Text>
          <Text style={styles.event}>Reps: {event.Reps}</Text>
          <Text style={styles.event}>Sets: {event.Sets}</Text>
          <Text style={styles.event}>Time: {event.Time}</Text>
        </View>
      ))}
      <Text style={styles.header}>Special Conditions</Text>
      <Text style={styles.detail}>Surface: {SpecialConditions.Surface}</Text>
      <Text style={styles.detail}>Weather: {SpecialConditions.Weather}</Text>
      <Text style={styles.header}>Totals</Text>
      <Text style={styles.detail}>Total Distance Ran: {TotalDistanceRan} metres</Text>
      <Text style={styles.detail}>Total Time Ran: {TotalTimeRan} seconds</Text>
      <Text style={styles.detail}>High Jumps: {NumberOfHighJumps} (Total Distance: {TotalDistanceHighJumped} metres)</Text>
      <Text style={styles.detail}>Long Jumps: {NumberOfLongJumps} (Total Distance: {TotalDistanceLongJumped} metres)</Text>
      <Text style={styles.detail}>Pole Vaults: {NumberOfPoleVaults} (Total Distance: {TotalDistancePoleVaulted} metres)</Text>
      <Text style={styles.detail}>Triple Jumps: {NumberOfTripleJumps} (Total Distance: {TotalDistanceTripleJumped} metres)</Text>
      <Text style={styles.detail}>Shot Puts: {NumberOfShotPuts} (Total Distance: {TotalDistanceShotPut} metres)</Text>
      <Text style={styles.detail}>Discus Throws: {NumberOfDiscusThrows} (Total Distance: {TotalDistanceDiscusThrown} metres)</Text>
      <Text style={styles.detail}>Javelin Throws: {NumberOfJavelinThrows} (Total Distance: {TotalDistanceJavelinThrown} metres)</Text>
      <Text style={styles.detail}>Hammer Throws: {NumberOfHammerThrows} (Total Distance: {TotalDistanceHammerThrown} metres)</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 10,
  },
  header: {
    fontSize: 22,
    color: '#FFB74D',
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
  },
  detail: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
  },
  eventContainer: {
    marginBottom: 10,
  },
  event: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
  },
  loadingText: {
    color: '#E0E0E0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TrainingSessionDetailsScreen;
