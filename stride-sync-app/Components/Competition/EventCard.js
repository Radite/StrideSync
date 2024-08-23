import React from 'react';
import { View, Text } from 'react-native';
import { formatTime } from '../../Utils/formatTime'; // Import helper functions
import { getOrdinal, getMarkUnit } from '../../Utils/competitionHelpers'; // Import helpers
import styles from '../../Styles/CompetitionDetailScreenStyles'; // Import the styles

// Define field events
const fieldEvents = ['Long Jump', 'High Jump', 'Pole Vault', 'Shot Put', 'Discus', 'Javelin', 'Hammer Throw'];

const EventCard = ({ result }) => {
  // Determine if the event is a field event
  const isFieldEvent = fieldEvents.includes(result.Event);

  return (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{result.Event}</Text>
      <View style={styles.eventRow}>
        <Text style={styles.eventLabel}>Position:</Text>
        <Text style={styles.eventValue}>{getOrdinal(result.Position)}</Text>
      </View>
      <View style={styles.eventRow}>
        <Text style={styles.eventLabel}>Mark:</Text>
        <Text style={styles.eventValue}>
          {isFieldEvent ? result.Mark : formatTime(result.Mark)}
        </Text>
      </View>
    </View>
  );
};

export default EventCard;
