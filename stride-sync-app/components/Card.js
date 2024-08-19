import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from '../styles/dashboardStyles';

const Card = ({ title, totalDistance, averageDistance }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>Total Distance: {totalDistance} m</Text>
      <Text style={styles.cardValue}>Average Distance: {averageDistance} m</Text>
    </TouchableOpacity>
  );
};

export default Card;
