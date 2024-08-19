import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardScreenStyles';

const RunningMetricsCard = ({ totalDistanceRan, averagePace }) => (
  <TouchableOpacity style={styles.card}>
    <Text style={styles.cardTitle}>Running Metrics</Text>
    <Text style={styles.cardValue}>Total Distance: {totalDistanceRan / 1000} km</Text>
    <Text style={styles.cardValue}>Average Pace: {averagePace} min/km</Text>
  </TouchableOpacity>
);

export default RunningMetricsCard;
