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
    { name: 'Speed Work', time: 20, color: '#F00' },
    { name: 'Strength', time: 15, color: 'orange' },
    { name: 'Recovery', time: 35, color: '#0f0' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Data Visualization" navigation={navigation} />
      <ScrollView style={styles.content}>
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
            backgroundColor: '#000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={styles.chart}
        />

        <Text style={styles.chartTitle}>Pyramid Chart</Text>
        <PieChart
          data={pyramidData}
          width={Dimensions.get('window').width * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: '#000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="time"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />

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
            backgroundColor: '#000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            backgroundColor: '#000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={styles.chart}
        />
      </ScrollView>
      <Footer navigation={navigation} activeScreen="AdvancedDataVisualization" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, padding: 20 },
  chartTitle: { fontSize: 20, color: '#fff', marginVertical: 10, fontFamily: 'Montserrat-Regular' },
  chart: { marginVertical: 10 },
});

export default AdvancedDataVisualizationScreen;
