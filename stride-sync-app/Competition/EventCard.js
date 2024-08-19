import React from 'react';
import { View, Text } from 'react-native';
import { getOrdinal, formatTime } from './helpers'; // Import helper functions
import styles from './CompetitionDetailScreenStyles'; // Import the styles

const EventCard = ({ result }) => (
  <View style={styles.eventCard}>
    <Text style={styles.eventTitle}>{result.Event}</Text>
    <View style={styles.eventRow}>
      <Text style={styles.eventLabel}>Position:</Text>
      <Text style={styles.eventValue}>{getOrdinal(result.Position)}</Text>
    </View>
    <View style={styles.eventRow}>
      <Text style={styles.eventLabel}>Mark:</Text>
      <Text style={styles.eventValue}>
        {formatTime(result.Mark)}
      </Text>
    </View>
  </View>
);

export default EventCard;
