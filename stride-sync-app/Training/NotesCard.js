import React from 'react';
import { View, Text } from 'react-native';
import styles from './TrainingSessionDetailsStyles'; // Extracted styles

const NotesCard = ({ notes }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Notes</Text>
    <View style={styles.card}>
      <Text style={styles.cardValue}>{notes}</Text>
    </View>
  </View>
);

export default NotesCard;
