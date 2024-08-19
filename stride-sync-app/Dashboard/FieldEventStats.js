import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/DashboardScreenStyles';

const FieldEventStats = ({ fieldEventStats }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScrollView}>
      {Object.keys(fieldEventStats).map((eventKey, index) => {
        const stats = fieldEventStats[eventKey];
        return (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{eventKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
            <Text style={styles.cardValue}>Total Distance: {stats.total.toFixed(2)} m</Text>
            <Text style={styles.cardValue}>Average Distance: {stats.average} m</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FieldEventStats;
