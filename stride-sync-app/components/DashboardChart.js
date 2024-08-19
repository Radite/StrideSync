import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../styles/dashboardStyles';

const { width } = Dimensions.get('window');

const DashboardChart = ({ intensityData }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.chartTitle}>Average Training Intensity Over Time</Text>
      <LineChart
        data={intensityData}
        width={width + 20}
        height={350}
        chartConfig={{
          backgroundColor: '#1F1F1F',
          backgroundGradientFrom: '#1F1F1F',
          backgroundGradientTo: '#2F2F2F',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3,
          decimalPlaces: 2,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#FFB74D",
            fill: "#FFB74D",
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
          propsForHorizontalLabels: {
            fontSize: 12,
            color: '#E0E0E0',
          },
          propsForVerticalLabels: {
            fontSize: 12,
            color: '#E0E0E0',
          },
        }}
        style={styles.chart}
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'rgba(54, 162, 235, 1)' }]} />
          <Text style={styles.legendLabel}>This Week</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'rgba(255, 99, 132, 1)' }]} />
          <Text style={styles.legendLabel}>Last Week</Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardChart;
