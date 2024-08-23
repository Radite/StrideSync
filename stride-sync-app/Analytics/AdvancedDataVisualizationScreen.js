import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../Footer';
import Header from '../Header';
import TrainingDataVisualization from './TrainingDataVisualization';
import CompDataVisualization from './CompDataVisualization';
import { fetchTrainingData, fetchCompetitionData } from './analyticsDataFetching';

const AdvancedDataVisualizationScreen = ({ navigation }) => {
  const [isTraining, setIsTraining] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('TotalDistanceRan');
  const [trainingData, setTrainingData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [competitionData, setCompetitionData] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [eventPerformance, setEventPerformance] = useState({});
  const [dates, setDates] = useState([]);

  const colors = [
    '#FF6347', '#FFA500', '#32CD32', '#1E90FF', '#DA70D6', '#FFD700', '#8A2BE2', '#00FA9A', '#FF4500', '#6495ED'
  ];

  const getColorForEvent = (event, colorMap) => {
    if (!colorMap[event]) {
      const newColor = colors[Object.keys(colorMap).length % colors.length];
      colorMap[event] = newColor;
    }
    return colorMap[event];
  };

  const eventColorMap = {};

  const toggleSwitch = () => setIsTraining(!isTraining);

  useFocusEffect(
    useCallback(() => {
      fetchTrainingData(setTrainingData, setLoading);
      fetchCompetitionData(
        setCompetitionData,
        setEventNames,
        setEventPerformance,
        setSelectedEvent,
        setDates,
        setLoading
      );
    }, [])
  );

  const raceTypeDistributionData = eventNames.map((event) => ({
    name: event,
    count: competitionData.reduce(
      (count, competition) =>
        count + competition.EventResults.filter((result) => result.Event === event).length,
      0
    ),
    color: getColorForEvent(event, eventColorMap),
  }));

  return (
    <View style={styles.container}>
      <Header title="Data Visualization" navigation={navigation} />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Races</Text>
        <Switch
          value={isTraining}
          onValueChange={toggleSwitch}
          thumbColor="#FFB74D"
          trackColor={{ false: '#767577', true: '#767577' }}
        />
        <Text style={styles.switchLabel}>Training</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isTraining ? (
          <TrainingDataVisualization
            trainingData={trainingData}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
        ) : (
          <CompDataVisualization
            dates={dates}
            eventPerformance={eventPerformance}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            eventNames={eventNames}
            raceTypeDistributionData={raceTypeDistributionData}
          />
        )}
      </ScrollView>
      <Footer navigation={navigation} activeScreen="AdvancedDataVisualization" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  switchContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 },
  switchLabel: { color: '#FFF', marginHorizontal: 10 },
  scrollContent: { padding: 10 },
});

export default AdvancedDataVisualizationScreen;
