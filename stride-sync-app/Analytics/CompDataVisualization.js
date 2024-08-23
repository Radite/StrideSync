import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';

const CompDataVisualization = ({
  dates,
  eventPerformance,
  selectedEvent,
  setSelectedEvent,
  eventNames,
  raceTypeDistributionData,
}) => {
  // Get last 5 weeks of data for the chart
  const lastFiveWeeks = dates.slice(-5);
  const performanceData = eventPerformance[selectedEvent]
    ? eventPerformance[selectedEvent].slice(-5)
    : [];

  return (
    <>
      <Text style={styles.chartTitle}>Select Event</Text>
      <RNPickerSelect
        selectedValue={selectedEvent}
        onValueChange={(itemValue) => setSelectedEvent(itemValue)}
        style={pickerStyles}
        items={eventNames.map((event) => ({
          label: event,
          value: event,
        }))}
      />

      <Text style={styles.chartTitle}>Performance Over Time (Last 5 Weeks)</Text>
      <LineChart
        data={{
          labels: lastFiveWeeks,
          datasets: [{ data: performanceData }],
        }}
        width={Dimensions.get('window').width * 0.9}
        height={250}
        yAxisLabel=""
        yAxisSuffix={selectedEvent === 'Distance' ? 'm' : 's'}
        formatYLabel={(yValue) => yValue}
        chartConfig={{
          backgroundColor: '#0A0A0A',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#1C1C1C',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
          style: {
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#FF6347',
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
            strokeOpacity: 0.2,
            strokeWidth: 1,
            stroke: '#FFF',
          },
        }}
        bezier
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Distribution of Race Types</Text>
      <PieChart
        data={raceTypeDistributionData.map((race) => ({
          name: race.name,
          population: race.count,
          color: race.color,
          legendFontColor: '#FFF',
          legendFontSize: 15,
        }))}
        width={Dimensions.get('window').width * 0.9}
        height={250}
        chartConfig={{
          backgroundColor: '#0A0A0A',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#1C1C1C',
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={[styles.chart, styles.pieChart]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 22,
    color: '#FFB74D',
    marginVertical: 15,
    fontFamily: 'Montserrat-Bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    color: '#FFF',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
  },
  inputIOS: {
    color: '#FFF',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
  },
});

export default CompDataVisualization;
