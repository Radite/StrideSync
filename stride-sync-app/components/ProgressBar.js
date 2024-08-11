import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

const ProgressBarComponent = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progress: {Math.round(progress * 100)}%</Text>
      <Bar
        progress={progress}
        width={null}
        color="#4CAF50"
        borderWidth={0}
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});

export default ProgressBarComponent;
