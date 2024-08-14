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
    SessionDate, SessionType, EventDetails, IntensityPercentage, Notes,
    TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted,
    TotalDistanceShotPut, TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown,
    TotalDistanceTripleJumped, TotalDistanceRan, TotalTimeRan, NumberOfLongJumps, NumberOfHighJumps,
    NumberOfPoleVaults, NumberOfShotPuts, NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows,
    NumberOfTripleJumps
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
                <Text style={styles.eventText}>Event: {event.Event}</Text>
                <Text style={styles.eventText}>Reps: {event.Reps}</Text>
                {event.Sets && <Text style={styles.eventText}>Sets: {event.Sets}</Text>}
                {event.Height && <Text style={styles.eventText}>Height: {event.Height}</Text>}
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

        {/* Totals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Totals</Text>
          <View style={styles.totalsContainer}>
            <View style={styles.totalColumn}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Total Distance Ran</Text>
                <Text style={styles.cardValue}>{TotalDistanceRan} meters</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>High Jumps</Text>
                <Text style={styles.cardValue}>{NumberOfHighJumps} (Total Distance: {TotalDistanceHighJumped} meters)</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Long Jumps</Text>
                <Text style={styles.cardValue}>{NumberOfLongJumps} (Total Distance: {TotalDistanceLongJumped} meters)</Text>
              </View>
            </View>
            <View style={styles.totalColumn}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Pole Vaults</Text>
                <Text style={styles.cardValue}>{NumberOfPoleVaults} (Total Distance: {TotalDistancePoleVaulted} meters)</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Triple Jumps</Text>
                <Text style={styles.cardValue}>{NumberOfTripleJumps} (Total Distance: {TotalDistanceTripleJumped} meters)</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Shot Puts</Text>
                <Text style={styles.cardValue}>{NumberOfShotPuts} (Total Distance: {TotalDistanceShotPut} meters)</Text>
              </View>
            </View>
            <View style={styles.totalColumn}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Discus Throws</Text>
                <Text style={styles.cardValue}>{NumberOfDiscusThrows} (Total Distance: {TotalDistanceDiscusThrown} meters)</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Javelin Throws</Text>
                <Text style={styles.cardValue}>{NumberOfJavelinThrows} (Total Distance: {TotalDistanceJavelinThrown} meters)</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Hammer Throws</Text>
                <Text style={styles.cardValue}>{NumberOfHammerThrows} (Total Distance: {TotalDistanceHammerThrown} meters)</Text>
              </View>
            </View>
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
    backgroundColor: '#1C1C1C',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#444',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    width: width - 40, // Adjust width based on screen dimensions
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB74D',
  },
  cardValue: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFB74D',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 5,
  },
  eventList: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 15,
  },
  eventItem: {
    marginBottom: 10,
  },
  eventText: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  errorText: {
    color: '#E0E0E0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TrainingSessionDetailsScreen;
