import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Switch } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import Footer from '../Footer';
import Header from '../Header';
import TrainingDataVisualization from './TrainingDataVisualization'; 
import axios from 'axios';

const AdvancedDataVisualizationScreen = ({ navigation }) => {
  const [isTraining, setIsTraining] = React.useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('TotalDistanceRan');
  const [trainingData, setTrainingData] = useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState('5K');

  const pbsData = [20, 35, 30, 50, 60, 45];
  const raceDistancesData = [
    { name: '100m', distance: 0.1, color: '#FF6347' },
    { name: '200m', distance: 0.2, color: '#FFA500' },
    { name: '400m', distance: 0.4, color: '#32CD32' },
    { name: '5K', distance: 5, color: '#FF6347' },
    { name: '10K', distance: 10, color: '#FFA500' },
    { name: 'Half Marathon', distance: 21, color: '#32CD32' },
    { name: 'Marathon', distance: 42, color: '#1E90FF' },
  ];

  const performanceData = {
    '100m': [12, 11.8, 11.5, 11.3, 11.2, 11.0],
    '200m': [24.5, 23.8, 23.4, 23.0, 22.8, 22.5],
    '400m': [56, 54.8, 54.0, 53.5, 53.0, 52.5],
    '5K': [20, 21, 19, 18, 20, 19],
    '10K': [40, 42, 41, 39, 43, 41],
    'Half Marathon': [90, 92, 89, 91, 94, 90],
    'Marathon': [200, 205, 198, 195, 210, 202],
  };

  const toggleSwitch = () => setIsTraining(!isTraining);

  const fetchTrainingData = async () => {
    try {
      const response = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
      setTrainingData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching training data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, []);

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
          <>
            <Text style={styles.chartTitle}>Select Event</Text>
            <RNPickerSelect
              selectedValue={selectedEvent}
              onValueChange={(itemValue) => setSelectedEvent(itemValue)}
              style={pickerStyles}
              items={Object.keys(performanceData).map((event) => ({
                label: event,
                value: event,
              }))}
            />

            <Text style={styles.chartTitle}>Performance Over Time</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{ data: performanceData[selectedEvent] }],
              }}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              yAxisLabel=""
              yAxisSuffix="s"
              chartConfig={{
                backgroundColor: '#0A0A0A',
                backgroundGradientFrom: '#1C1C1C',
                backgroundGradientTo: '#1C1C1C',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
                style: {
                  borderRadius: 12,
                  marginLeft: 10, // Ensure space on the left for axis labels
                },
                propsForHorizontalLabels: {
                  fontSize: 12, // Adjust font size
                },
              }}
              style={styles.chart}
            />

            <Text style={styles.chartTitle}>Distribution of Race Types</Text>
            <PieChart
              data={raceDistancesData.map((race) => ({
                name: race.name,
                time: race.distance,
                color: race.color,
              }))}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: '#0A0A0A',
                backgroundGradientFrom: '#1C1C1C',
                backgroundGradientTo: '#1C1C1C',
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
              }}
              accessor="time"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />

            <Text style={styles.chartTitle}>Performance Peaks and Tapers</Text>
            <LineChart
              data={{
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [
                  {
                    data: pbsData,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    label: 'Training Load',
                  },
                  {
                    data: performanceData[selectedEvent],
                    color: (opacity = 1) => `rgba(71, 99, 255, ${opacity})`,
                    label: 'Performance',
                  },
                ],
              }}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              yAxisLabel=""
              yAxisSuffix="km"
              chartConfig={{
                backgroundColor: '#0A0A0A',
                backgroundGradientFrom: '#1C1C1C',
                backgroundGradientTo: '#1C1C1C',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
                style: {
                  borderRadius: 12,
                  marginLeft: 10, // Ensure space on the left for axis labels
                },
                propsForHorizontalLabels: {
                  fontSize: 12, // Adjust font size
                },
              }}
              style={styles.chart}
            />
          </>
        )}
      </ScrollView>
      <Footer navigation={navigation} activeScreen="AdvancedDataVisualization" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1C1C1C',
  },
  switchLabel: {
    color: '#FFB74D',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  chartTitle: {
    fontSize: 22,
    color: '#FFB74D',
    marginVertical: 15,
    fontFamily: 'Montserrat-Bold',
  },
  chart: {
    marginVertical: 15,
    borderRadius: 12,
  },
  picker: {
    height: 50,
    width: Dimensions.get('window').width * 0.9,
    color: '#FFB74D',
  },
});


// Picker styles for RNPickerSelect
const pickerStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: Dimensions.get('window').width * 0.9,
    color: '#FFB74D',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputAndroid: {
    height: 50,
    width: Dimensions.get('window').width * 0.9,
    color: '#FFB74D',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  placeholder: {
    color: '#FFB74D',
  },
});

export default AdvancedDataVisualizationScreen;
