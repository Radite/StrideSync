import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

const Footer = ({ navigation, activeScreen }) => {
  const getIconColor = (screenName) => (screenName === activeScreen ? '#FFB74D' : '#FFFFFF');

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Ionicons name="compass-outline" size={24} color={getIconColor('Dashboard')} />
        <Text style={styles.bottomBarText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => navigation.navigate('TrainingLog')}
      >
        <Ionicons name="barbell-outline" size={24} color={getIconColor('TrainingLog')} />
        <Text style={styles.bottomBarText}>Training</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => navigation.navigate('CompetitionLog')}
      >
        <Ionicons name="calendar-outline" size={24} color={getIconColor('CompetitionLog')} />
        <Text style={styles.bottomBarText}>Competitions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => navigation.navigate('PerformancePrediction')}
      >
        <Ionicons name="stats-chart-outline" size={24} color={getIconColor('PerformancePrediction')} />
        <Text style={styles.bottomBarText}>Performances</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => navigation.navigate('AdvancedDataVisualization')}
      >
        <Ionicons name="analytics-outline" size={24} color={getIconColor('AdvancedDataVisualization')} />
        <Text style={styles.bottomBarText}>Analytics</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute', // Position the bottom navigation bar at the bottom
    bottom: 0, // Place it at the bottom of the screen
    flexDirection: 'row',
    backgroundColor: '#000', // Change background color to solid black
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  bottomBarText: {
    color: '#FFFFFF', 
    fontSize: 12,
  },
});

export default Footer;
