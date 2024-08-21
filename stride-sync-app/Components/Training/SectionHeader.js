import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../Styles/TrainingLogScreenStyles';

const SectionHeader = ({ title, onLogPress }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity
      style={styles.logButton}
      onPress={onLogPress}
    >
      <Text style={styles.logButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

export default SectionHeader;
