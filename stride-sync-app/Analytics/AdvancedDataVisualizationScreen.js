import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Switch } from 'react-native';
import { LineChart, PieChart, ContributionGraph } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select'; // Import RNPickerSelect
import Footer from '../Footer';
import Header from '../Header';

const AdvancedDataVisualizationScreen = ({ navigation }) => {
  // State to toggle between Races and Training
  const [isTraining, setIsTraining] = React.useState(true);

  // State for selected event in races section
  const [selectedEvent, setSelectedEvent] = React.useState('5K');

  // Sample Data
  const trainingVolumeData = [20, 45, 28, 80, 99, 43];
  const trainingTypeData = [
    { name: 'Endurance', time: 30, color: 'rgba(131, 167, 234, 1)' },
    { name: 'Speed Work', time: 20, color: '#FF6347' },
    { name: 'Strength', time: 15, color: '#FFA500' },
    { name: 'Recovery', time: 35, color: '#32CD32' },
  ];

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

  const heatmapData = [
    { date: '2024-08-12', count: 3 },
    { date: '2024-08-13', count: 5 },
    { date: '2024-08-14', count: 2 },
    { date: '2024-08-15', count: 6 },
  ];

  const performanceData = {
    '100m': [12, 11.8, 11.5, 11.3, 11.1, 11.0],
    '200m': [24.5, 23.8, 23.4, 23.0, 22.8, 22.5],
    '400m': [56, 54.8, 54.0, 53.5, 53.0, 52.5],
    '5K': [20, 21, 19, 18, 20, 19],
    '10K': [40, 42, 41, 39, 43, 41],
    'Half Marathon': [90, 92, 89, 91, 94, 90],
    'Marathon': [200, 205, 198, 195, 210, 202],
  };

  const toggleSwitch = () => setIsTraining(!isTraining);

  return (
    <View style={styles.container}>
      <Header title="Data Visualization" navigation={navigation} />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Training</Text>
        <Switch
          value={isTraining}
          onValueChange={toggleSwitch}
          thumbColor="#FFB74D"
          trackColor={{ false: '#767577', true: '#FFB74D' }}
        />
        <Text style={styles.switchLabel}>Races</Text>
      </View>
      <ScrollView style={styles.scrollContent}>
        {isTraining ? (
          <>
            <Text style={styles.chartTitle}>Training Volume Per Week</Text>
            <LineChart
              data={{
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{ data: trainingVolumeData }],
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
                style: { borderRadius: 12 },
              }}
              style={styles.chart}
            />

            <Text style={styles.chartTitle}>Distribution of Training Types</Text>
            <PieChart
              data={trainingTypeData}
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

            <Text style={styles.chartTitle}>Volume by Day of the Week</Text>
            <ContributionGraph
              values={heatmapData}
              endDate={new Date()}
              numDays={7}
              width={Dimensions.get('window').width * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: '#0A0A0A',
                backgroundGradientFrom: '#1C1C1C',
                backgroundGradientTo: '#1C1C1C',
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
              }}
              style={styles.chart}
            />
          </>
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
                style: { borderRadius: 12 },
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
                    data: trainingVolumeData,
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
                style: { borderRadius: 12 },
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
