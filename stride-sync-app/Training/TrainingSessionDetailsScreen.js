import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import DetailsCard from './DetailsCard';
import EventList from './EventList';
import NotesCard from './NotesCard';
import DeleteButton from './DeleteButton';
import styles from './TrainingSessionDetailsStyles'; // Extracted styles
import handleDelete from './sessionUtils'; // Import the handleDelete function

const TrainingSessionDetailsScreen = ({ route, navigation }) => {
  const { sessionId } = route.params;
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
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

  const { SessionDate, SessionType, EventDetails, IntensityPercentage, Notes } = sessionDetails;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Training Session" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <DetailsCard
          date={SessionDate}
          type={SessionType}
          intensity={IntensityPercentage}
        />
        <EventList events={EventDetails} />
        <NotesCard notes={Notes} />
        <DeleteButton onDelete={() => handleDelete(sessionId, navigation)} />
      </ScrollView>
      <Footer navigation={navigation} activeScreen="TrainingLog" />
    </SafeAreaView>
  );
};

export default TrainingSessionDetailsScreen;
