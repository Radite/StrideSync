// TrainingDataVisualization.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, PieChart, ContributionGraph } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';

const TrainingDataVisualization = ({ trainingData, selectedMetric, setSelectedMetric }) => {
  const getChartData = (metric) => {
    const weeks = {};
    const today = new Date();
    const fiveWeeksAgo = new Date(today);
    fiveWeeksAgo.setDate(today.getDate() - 35);

    trainingData.forEach(session => {
      const sessionDate = new Date(session.SessionDate);
      if (sessionDate >= fiveWeeksAgo && sessionDate <= today) {
        const week = `Week ${sessionDate.getWeek()}`;
        weeks[week] = (weeks[week] || 0) + session[metric];
      }
    });

    const lastFiveWeeks = Object.keys(weeks).slice(-5);
    return {
      labels: lastFiveWeeks,
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
    <>
      <Text style={styles.chartTitle}>Select Metric</Text>
      <RNPickerSelect
        selectedValue={selectedMetric}
        onValueChange={(itemValue) => setSelectedMetric(itemValue)}
        style={pickerStyles}
        items={[
          { label: 'Distance Ran', value: 'TotalDistanceRan' },
          { label: 'Distance Long Jumped', value: 'TotalDistanceLongJumped' },
          { label: 'Distance Shot Putted', value: 'TotalDistanceShotPut' },
          // Add other metrics here
        ]}
      />
      <Text style={styles.chartTitle}>Training Volume Per Week (Last 5 Weeks)</Text>
      <LineChart
        data={getChartData(selectedMetric)}
        width={Dimensions.get('window').width * 0.9}
        height={220}
        yAxisLabel=""
        yAxisSuffix="m"
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
        values={trainingData.map((session) => ({
          date: session.SessionDate,
          count: session[selectedMetric],
        }))}
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
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    color: '#FFF',
    fontSize: 18,
    marginVertical: 10,
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

Date.prototype.getWeek = function () {
  var dt = new Date(this.getTime());
  dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
  return Math.ceil((((dt - new Date(dt.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

export default TrainingDataVisualization;
