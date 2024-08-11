import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Footer from '../Footer';
import Header from '../Header';

const AdvancedDataVisualizationScreen = ({ navigation }) => {
  // Sample Data
  const data = [20, 45, 28, 80, 99, 43, 50];
  const pyramidData = [
    { name: 'Endurance', time: 30, color: 'rgba(131, 167, 234, 1)' },
    { name: 'Speed Work', time: 20, color: '#FF6347' },
    { name: 'Strength', time: 15, color: '#FFA500' },
    { name: 'Recovery', time: 35, color: '#32CD32' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Data Visualization" navigation={navigation} />
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.chartTitle}>Performance Over Time</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
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
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Tomato color
            labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
            style: { borderRadius: 12 },
          }}
          style={styles.chart}
        />

        <Text style={styles.chartTitle}>Pyramid Chart</Text>
        <View style={styles.pyramidChartContainer}>
          <PieChart
            data={pyramidData}
            width={Dimensions.get('window').width * 0.9}
            height={220}
            chartConfig={{
              backgroundColor: '#0A0A0A',
              backgroundGradientFrom: '#1C1C1C',
              backgroundGradientTo: '#1C1C1C',
              color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Tomato color
              labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
            }}
            accessor="time"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>

        <Text style={styles.chartTitle}>Cumulative Distance</Text>
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
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
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Tomato color
            labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
          }}
          style={styles.chart}
        />

        <Text style={styles.chartTitle}>Intensity Chart</Text>
        <LineChart
          data={{
            labels: ['5K', '10K', 'Half Marathon', 'Marathon'],
            datasets: [{ data: [18, 20, 25, 30] }],
          }}
          width={Dimensions.get('window').width * 0.9}
          height={220}
          yAxisLabel=""
          yAxisSuffix="min/km"
          chartConfig={{
            backgroundColor: '#0A0A0A',
            backgroundGradientFrom: '#1C1C1C',
            backgroundGradientTo: '#1C1C1C',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Tomato color
            labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`,
            style: { borderRadius: 12 },
          }}
          style={styles.chart}
        />
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
  pyramidChartContainer: {
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    backgroundColor: '#1C1C1C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default AdvancedDataVisualizationScreen;
