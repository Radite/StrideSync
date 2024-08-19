import React from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../Header';
import Footer from '../Footer';
import RunningMetricsCard from './RunningMetricsCard';
import FieldEventCards from './FieldEventCards';
import PerformanceTrends from './PerformanceTrends';
import useDashboardData from './useDashboardData';
import styles from '../styles/DashboardScreenStyles';
import DailyQuote from './DailyQuote';

const DashboardScreen = ({ navigation }) => {
  const {
    loading,
    error,
    totalDistanceRan,
    averagePace,
    fieldEventStats,
    intensityData,
    dailyQuote
  } = useDashboardData();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Dashboard" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScrollView}>
          <RunningMetricsCard totalDistanceRan={totalDistanceRan} averagePace={averagePace} />
          <FieldEventCards fieldEventStats={fieldEventStats} />
        </ScrollView>

        <PerformanceTrends intensityData={intensityData}/>
        <DailyQuote />

      </ScrollView>

      <Footer navigation={navigation} activeScreen="Dashboard" />
    </View>
  );
};

export default DashboardScreen;
