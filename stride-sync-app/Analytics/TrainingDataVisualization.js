import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';

const TrainingDataVisualization = ({ trainingData, selectedMetric, setSelectedMetric }) => {
  const getChartData = (metric) => {
    const weeks = {};
    const today = new Date();
    
    // Determine the current week's start (Sunday) and calculate the start of 4 previous weeks
    const currentWeekNumber = today.getWeek();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of the current week

    // Initialize weeks for the current week and the previous 4 weeks
    for (let i = 0; i < 5; i++) {
      const weekNumber = currentWeekNumber - i;
      weeks[weekNumber] = 0;
    }

    // Group data by week and sum the volumes
    trainingData.forEach((session) => {
        const sessionDate = new Date(session.SessionDate);
        const weekNumber = sessionDate.getWeek();
        console.log(`Session Date: ${sessionDate}, Week Number: ${weekNumber}, Metric: ${session[selectedMetric]}`);
        if (weeks.hasOwnProperty(weekNumber) && session[metric] > 0) {
            weeks[weekNumber] += session[metric];
          }
          
      });
      
    // Prepare the data for the chart
    const sortedWeeks = Object.keys(weeks).sort((a, b) => a - b);
    const lastFiveWeeks = sortedWeeks.slice(-5); // Get the last 5 weeks

    return {
      labels: lastFiveWeeks.map(week => `Week ${week}`),
      datasets: [{ data: lastFiveWeeks.map(week => weeks[week] || 0) }],
    };
  };

  const colors = [
    '#FF6347', '#FFA500', '#32CD32', '#1E90FF', '#DA70D6', '#FFD700', '#8A2BE2', '#00FA9A', '#FF4500', '#6495ED'
  ];

  const getColorForSessionType = (type, colorMap) => {
    if (!colorMap[type]) {
      const newColor = colors[Object.keys(colorMap).length % colors.length];
      colorMap[type] = newColor;
    }
    return colorMap[type];
  };

  const sessionTypeColorMap = {};

  return (
    <View>
      <Text style={styles.chartTitle}>Select Metric</Text>
      <RNPickerSelect
        selectedValue={selectedMetric}
        onValueChange={(itemValue) => setSelectedMetric(itemValue)}
        style={pickerStyles}
        items={[
          { label: 'Total Distance Ran', value: 'TotalDistanceRan' },
          { label: 'Total Time Ran', value: 'TotalTimeRan' },
          { label: 'Total Distance Long Jumped', value: 'TotalDistanceLongJumped' },
          { label: 'Total Distance Shot Put', value: 'TotalDistanceShotPut' },
          { label: 'Total Distance High Jumped', value: 'TotalDistanceHighJumped' },
          { label: 'Total Distance Discus Thrown', value: 'TotalDistanceDiscusThrown' },
          { label: 'Total Distance Javelin Thrown', value: 'TotalDistanceJavelinThrown' },
          { label: 'Total Distance Hammer Thrown', value: 'TotalDistanceHammerThrown' },
          { label: 'Total Distance Pole Vaulted', value: 'TotalDistancePoleVaulted' },
          { label: 'Total Distance Triple Jumped', value: 'TotalDistanceTripleJumped' },
        ]}
        
      />
      <Text style={styles.chartTitle}>Training Volume Per Week (Last 5 Weeks)</Text>
      <LineChart
        data={getChartData(selectedMetric)}
        width={Dimensions.get('window').width * 0.9}
        height={260}
        yAxisLabel=""
        yAxisSuffix="m"
        formatYLabel={(yValue) => {
          if (yValue >= 1000) return `${(yValue / 1000).toFixed(1)}k`;
          return yValue;
        }}
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



      <Text style={styles.chartTitle}>Distribution of Training Types</Text>
      <PieChart
        data={trainingData.reduce((acc, session) => {
          const type = acc.find((t) => t.name === session.SessionType);
          if (type) {
            type.time += 1;
          } else {
            acc.push({
              name: session.SessionType,
              time: 1,
              color: getColorForSessionType(session.SessionType, sessionTypeColorMap),
              legendFontColor: '#FFF',
              legendFontSize: 15,
            });
          }
          return acc;
        }, [])}
        width={Dimensions.get('window').width * 0.9}
        height={250}
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
    </View>
  );
};

// Style definitions
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

// Date prototype extension to get the week number
Date.prototype.getWeek = function () {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7)); // Adjust to the nearest Thursday
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  };
  
export default TrainingDataVisualization;
