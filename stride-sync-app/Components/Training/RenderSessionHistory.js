import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import styles from '../../Styles/TrainingLogScreenStyles'; 

const RenderSessionHistory = ({ filteredData, navigation }) => {
  return filteredData.map((session, index) => {
    const events = session.EventDetails && Array.isArray(session.EventDetails)
      ? session.EventDetails.map(event => event.Event).join(', ')
      : 'No events available';

    return (
      <TouchableOpacity
        key={index}
        style={styles.sessionContainer}
        onPress={() => navigation.navigate('TrainingSessionDetails', { sessionId: session.SessionID })}
      >
        <Text style={styles.sessionDate}>{format(new Date(session.SessionDate), 'MMM dd, yyyy')}</Text>
        <Text style={styles.summaryCardDistance}>Session Type: {session.SessionType}</Text>
        <Text style={styles.summaryCardDistance}>Events: {events}</Text>
        <Text style={styles.summaryCardDistance}>Notes: {session.Notes}</Text>
      </TouchableOpacity>
    );
  });
};

export default RenderSessionHistory;
