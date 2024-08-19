import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardScreenStyles';

const FieldEventCards = ({ fieldEventStats }) => {
  return Object.keys(fieldEventStats).map((eventKey, index) => {
    const stats = fieldEventStats[eventKey];
    return (
      <TouchableOpacity key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{eventKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
        <Text style={styles.cardValue}>Total Distance: {stats.total.toFixed(2)} m</Text>
        <Text style={styles.cardValue}>Average Distance: {stats.average} m</Text>
      </TouchableOpacity>
    );
  });
};

export default FieldEventCards;
