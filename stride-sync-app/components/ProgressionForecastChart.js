import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressionForecastChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Season Progression Forecast</Text>
      {/* Implement your forecast chart here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
});

export default ProgressionForecastChart;
