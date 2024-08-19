import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardScreenStyles';

const RunningMetrics = ({ totalDistanceRan, totalTimeRan }) => {
  const distanceInKilometers = totalDistanceRan / 1000;
  const timeInMinutes = totalTimeRan / 60;
  const averagePace = distanceInKilometers > 0 ? (timeInMinutes / distanceInKilometers).toFixed(2) : '0.00';

  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>Running Metrics</Text>
      <Text style={styles.cardValue}>Total Distance: {distanceInKilometers.toFixed(2)} km</Text>
      <Text style={styles.cardValue}>Average Pace: {averagePace} min/km</Text>
    </TouchableOpacity>
  );
};

export default RunningMetrics;
