import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../Styles/CompetitionDetailScreenStyles'; // Import the styles

const NotesSection = ({ notes }) => (
  notes ? (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notes</Text>
      <View style={styles.card}>
        <Text style={styles.cardValue}>{notes}</Text>
      </View>
    </View>
  ) : null
);

export default NotesSection;
