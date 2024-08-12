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
    SessionDate, SessionType, EventDetails, SpecialConditions, IntensityPercentage, Notes,
    TotalDistanceRan, TotalTimeRan, NumberOfLongJumps, NumberOfHighJumps, NumberOfPoleVaults,
    NumberOfShotPuts, NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows,
    NumberOfTripleJumps, TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted,
    TotalDistanceShotPut, TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown,
    TotalDistanceTripleJumped
  } = sessionDetails;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Training Session" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Session Details</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Date</Text>
            <Text style={styles.cardValue}>{format(new Date(SessionDate), 'MMM dd, yyyy')}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Type</Text>
            <Text style={styles.cardValue}>{SessionType}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Intensity</Text>
            <Text style={styles.cardValue}>{IntensityPercentage}%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notes</Text>
            <Text style={styles.cardValue}>{Notes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.eventList}>
            {EventDetails.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text>Event: {event.Event}</Text>
                <Text>Reps: {event.Reps}</Text>
                <Text>Sets: {event.Sets}</Text>
                <Text>Time: {event.Time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Conditions</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Surface</Text>
            <Text style={styles.cardValue}>{SpecialConditions.Surface}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weather</Text>
            <Text style={styles.cardValue}>{SpecialConditions.Weather}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Totals</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Distance Ran</Text>
            <Text style={styles.cardValue}>{TotalDistanceRan} metres</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Time Ran</Text>
            <Text style={styles.cardValue}>{TotalTimeRan} seconds</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>High Jumps</Text>
            <Text style={styles.cardValue}>{NumberOfHighJumps} (Total Distance: {TotalDistanceHighJumped} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Long Jumps</Text>
            <Text style={styles.cardValue}>{NumberOfLongJumps} (Total Distance: {TotalDistanceLongJumped} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pole Vaults</Text>
            <Text style={styles.cardValue}>{NumberOfPoleVaults} (Total Distance: {TotalDistancePoleVaulted} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Triple Jumps</Text>
            <Text style={styles.cardValue}>{NumberOfTripleJumps} (Total Distance: {TotalDistanceTripleJumped} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Shot Puts</Text>
            <Text style={styles.cardValue}>{NumberOfShotPuts} (Total Distance: {TotalDistanceShotPut} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Discus Throws</Text>
            <Text style={styles.cardValue}>{NumberOfDiscusThrows} (Total Distance: {TotalDistanceDiscusThrown} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Javelin Throws</Text>
            <Text style={styles.cardValue}>{NumberOfJavelinThrows} (Total Distance: {TotalDistanceJavelinThrown} metres)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hammer Throws</Text>
            <Text style={styles.cardValue}>{NumberOfHammerThrows} (Total Distance: {TotalDistanceHammerThrown} metres)</Text>
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
  quoteText: {
    fontSize: 18,
    color: '#E0E0E0',
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 15,
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

export default TrainingSessionDetailsScreen;
