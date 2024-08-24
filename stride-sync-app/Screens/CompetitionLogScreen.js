import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import Footer from '../Footer';
import Header from '../Header';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCompetitions } from '../Utils/fetchCompetitions';
import styles from '../Styles/CompetitionLogScreenStyles';
import { formatTime } from '../Utils/formatTime';
import DateFilter from '../Components/Training/DateFilter';
import { format } from 'date-fns';
import { getCompetitionByID } from '../Utils/getCompetitionByID'; // <-- Import the function
import { isFieldEvent } from '../Utils/competitionHelpers'; // <-- Import the helper function

const CompetitionLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all_time');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');
  const [competitions, setCompetitions] = useState([]);
  const [uniqueEvents, setUniqueEvents] = useState([]);

  const fetchCompetitionsData = useCallback(async () => {
    try {
      const { data, uniqueEvents } = await fetchCompetitions();
      setCompetitions(data);
      setUniqueEvents(uniqueEvents);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch competition data.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCompetitionsData();
    }, [fetchCompetitionsData])
  );

  useEffect(() => {
    if (competitions.length > 0) {
      filterData(competitions);
    }
  }, [searchQuery, dateFilter, startDate, endDate, eventFilter, competitions]);

  const filterData = (data) => {
    const filtered = data.filter(comp => {
      const competitionDate = new Date(comp.CompetitionDate);

      let withinDateRange = true;
      if (dateFilter === 'custom_range') {
        withinDateRange = competitionDate >= new Date(startDate) && competitionDate <= new Date(endDate);
      }

      const matchesQuery = comp.CompetitionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           comp.EventResults.some(result => result.Event.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           comp.Notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEventFilter = eventFilter === 'All Events' || comp.EventResults.some(result => result.Event.toLowerCase().includes(eventFilter.toLowerCase()));

      return withinDateRange && matchesQuery && matchesEventFilter;
    });

    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <Header title="Competition Log" navigation={navigation} />

      <DateFilter 
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search competitions..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Competitions</Text>
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => navigation.navigate('LogCompetition')}
        >
          <Text style={styles.logButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredData.length > 0 ? (
          filteredData.map((comp, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sessionContainer}
              onPress={() => getCompetitionByID(comp.CompetitionID, navigation)} 
            >
              <Text style={styles.sessionDate}>{format(new Date(comp.CompetitionDate), 'MMM dd, yyyy')}</Text>
              {comp.EventResults.map((result, idx) => (
                <View key={idx} style={styles.resultContainer}>
                  <Text style={styles.event}>{result.Event}</Text>
                  <Text style={styles.position}>Position: {result.Position}</Text>
                  <Text style={styles.time}>Mark: {isFieldEvent(result.Event) ? result.Mark : formatTime(result.Mark)}</Text>
                </View>
              ))}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>No results found.</Text>
        )}
      </ScrollView>

      <Footer navigation={navigation} activeScreen="CompetitionLog" />
    </View>
  );
};

export default CompetitionLogScreen;
