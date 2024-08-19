import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/TrainingLogScreenStyles';
import { calculateSummary } from './calculateSummary'; // Adjust path if necessary

const RenderSummaryCards = ({ filteredData }) => {
  const summary = calculateSummary(filteredData);

  const eventNameMapping = {
    HighJump: 'High Jump',
    LongJump: 'Long Jump',
    PoleVault: 'Pole Vault',
    TripleJump: 'Triple Jump',
    ShotPut: 'Shot Put',
    Discus: 'Discus',
    Javelin: 'Javelin',
    HammerThrow: 'Hammer Throw'
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Running</Text>
        <Text style={styles.summaryCardDistance}>Distance: {summary.Running.totalDistance} metres</Text>
        <Text style={styles.summaryCardDistance}>Time: {summary.Running.totalDuration} seconds</Text>
        <Text style={styles.summaryCardDistance}>Avg Speed: {summary.Running.averageSpeed} m/s</Text>
      </View>

      {Object.keys(summary.Jump).map((event) => (
        <View key={event} style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>{eventNameMapping[event]}</Text>
          <Text style={styles.summaryCardDistance}>Distance: {summary.Jump[event].totalDistance} metres</Text>
          <Text style={styles.summaryCardDistance}>Jumps: {summary.Jump[event].totalJumps}</Text>
          <Text style={styles.summaryCardDistance}>Avg Jump: {summary.Jump[event].averageJump} metres</Text>
        </View>
      ))}

      {Object.keys(summary.Throw).map((event) => (
        <View key={event} style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>{eventNameMapping[event]}</Text>
          <Text style={styles.summaryCardDistance}>Distance: {summary.Throw[event].totalDistance} metres</Text>
          <Text style={styles.summaryCardDistance}>Throws: {summary.Throw[event].totalThrows}</Text>
          <Text style={styles.summaryCardDistance}>Avg Throw: {summary.Throw[event].averageThrow} metres</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RenderSummaryCards;
