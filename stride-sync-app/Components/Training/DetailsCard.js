import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import styles from '../../Styles/TrainingSessionDetailsStyles'; 

const DetailsCard = ({ date, type, intensity }) => (
  <View style={styles.detailsCard}>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Date</Text>
      <Text style={styles.detailValue}>{format(new Date(date), 'MMM dd, yyyy')}</Text>
    </View>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Type</Text>
      <Text style={styles.detailValue}>{type}</Text>
    </View>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Intensity</Text>
      <Text style={styles.detailValue}>{intensity}%</Text>
    </View>
  </View>
);

export default DetailsCard;
