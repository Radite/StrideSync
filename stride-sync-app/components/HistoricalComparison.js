import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoricalComparison = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historical Comparison</Text>
      {/* Implement your historical data visualization here */}
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

export default HistoricalComparison;
