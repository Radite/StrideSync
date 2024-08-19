import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../styles/TrainingLogScreenStyles'; // Import styles from your file

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default LoadingIndicator;
