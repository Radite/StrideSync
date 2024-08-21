import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../Styles/TrainingLogScreenStyles'; 

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default LoadingIndicator;
