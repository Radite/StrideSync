import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerformanceStats = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.stat}>Best Performance: 1500 Calories Burned</Text>
      <Text style={styles.stat}>Average Performance: 1200 Calories Burned</Text>
      {/* Add more stats as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  stat: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
});

export default PerformanceStats;
