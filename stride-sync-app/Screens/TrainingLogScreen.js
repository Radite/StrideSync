import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import Footer from '../Footer';
import Header from '../Header';
import useTrainingData from '../Utils/useTrainingData'; 
import styles from '../Styles/TrainingLogScreenStyles'; 
import DateFilter from '../Components/Training/DateFilter'; 
import RenderSummaryCards from '../Components/Training/RenderSummaryCards'; 
import RenderSessionHistory from '../Components/Training/RenderSessionHistory'; 
import filterData from '../Utils/filterData'; 
import SearchInput from '../Components/Training/SearchInput'; 
import SectionHeader from '../Components/Training/SectionHeader'; 
import NoResultsText from '../Components/Training/NoResultsText'; 
import LoadingIndicator from '../Components/Training/LoadingIndicator'; 

const TrainingLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('this_week');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { historicalData, loading, error, refetch } = useTrainingData();

  // Refetch data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (historicalData) {
      const filtered = filterData(historicalData, searchQuery, dateFilter, startDate, endDate);
      setFilteredData(filtered);
    }
  }, [searchQuery, dateFilter, startDate, endDate, historicalData]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Training Log" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Render Summary Cards */}
        <RenderSummaryCards filteredData={filteredData} />

        <DateFilter
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />

        <View style={styles.content}>
          <SectionHeader
            title="History"
            onLogPress={() => navigation.navigate('LogTraining')}
          />

          {filteredData.length > 0 ? (
            <RenderSessionHistory filteredData={filteredData} navigation={navigation} />
          ) : (
            <NoResultsText />
          )}
        </View>
      </ScrollView>

      <Footer navigation={navigation} activeScreen="TrainingLog" />
    </View>
  );
};

export default TrainingLogScreen;
