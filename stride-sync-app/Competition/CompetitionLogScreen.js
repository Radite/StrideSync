import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import Footer from '../Footer';
import Header from '../Header';
import { format, startOfWeek, endOfWeek, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar } from 'react-native-calendars';

const CompetitionLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all_time');
  const [filteredData, setFilteredData] = useState([]);
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');
  const [competitions, setCompetitions] = useState([]);
  const [uniqueEvents, setUniqueEvents] = useState([]);

  useEffect(() => {
    fetch('http://192.168.100.71:3000/api/competitions/athlete/1')
      .then(response => response.json())
      .then(data => {
        setCompetitions(data);

        // Extract unique events
        const events = data.flatMap(comp => comp.EventResults.map(result => result.Event));
        const uniqueEventsSet = new Set(events);
        setUniqueEvents(['All Events', ...Array.from(uniqueEventsSet)]);
      })
      .catch(error => {
        console.error('Error fetching competition data:', error);
        Alert.alert('Error', 'Failed to fetch competition data.');
      });
  }, []);

  useEffect(() => {
    if (competitions.length > 0) {
      filterData(competitions);
    }
  }, [searchQuery, dateFilter, startDate, endDate, eventFilter, competitions]);

  const filterData = (data) => {
    const today = new Date();
    const startDateWeek = startOfWeek(today);
    const endDateWeek = endOfWeek(today);

    const filtered = data.filter(comp => {
      const competitionDate = new Date(comp.CompetitionDate);

      let withinDateRange = true;
      if (dateFilter === 'today') {
        withinDateRange = format(competitionDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
      } else if (dateFilter === 'last_week') {
        const start = subDays(startDateWeek, 7);
        const end = subDays(endDateWeek, 7);
        withinDateRange = competitionDate >= start && competitionDate <= end;
      } else if (dateFilter === 'last_month') {
        const start = startOfMonth(subMonths(today, 1));
        const end = endOfMonth(subMonths(today, 1));
        withinDateRange = competitionDate >= start && competitionDate <= end;
      } else if (dateFilter === 'all_time') {
        withinDateRange = true;
      } else if (dateFilter === 'custom_range') {
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

  const onCustomRangeSelected = () => {
    setCustomRangeVisible(false);
    setDateFilter('custom_range');
  };

  const onDayPress = (day) => {
    const selectedDate = day.dateString;

    if (!startDate || (endDate && selectedDate < startDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (!endDate && selectedDate > startDate) {
      setEndDate(selectedDate);
    } else if (startDate && endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const getMarkedDates = () => {
    const markedDates = {};

    if (startDate) {
      markedDates[startDate] = { startingDay: true, color: '#FFB74D', textColor: '#0A0A0A' };
    }

    if (endDate) {
      markedDates[endDate] = { endingDay: true, color: '#FFB74D', textColor: '#0A0A0A' };
    }

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      while (start <= end) {
        const dateString = format(start, 'yyyy-MM-dd');
        markedDates[dateString] = { color: '#FFB74D', textColor: '#0A0A0A' };
        start.setDate(start.getDate() + 1);
      }
    }

    return markedDates;
  };

  const setToday = () => {
    setDateFilter('today');
  };

  const setLastWeek = () => {
    setDateFilter('last_week');
  };

  const setLastMonth = () => {
    setDateFilter('last_month');
  };

  const setAllTime = () => {
    setDateFilter('all_time');
  };

  const handleEventPress = async (competitionId) => {
    try {
      const response = await fetch(`http://192.168.100.71:3000/api/competitions/${competitionId}`);
      const competitionDetails = await response.json();
      navigation.navigate('CompetitionDetails', { competition: competitionDetails });
    } catch (error) {
      console.error('Error fetching competition details:', error);
      Alert.alert('Error', 'Failed to fetch competition details.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Competition Log" navigation={navigation} />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Date:</Text>

        <View style={styles.quickLinksContainer}>
          <TouchableOpacity style={styles.quickLink} onPress={setToday}>
            <Text style={styles.quickLinkText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setLastWeek}>
            <Text style={styles.quickLinkText}>Last Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setLastMonth}>
            <Text style={styles.quickLinkText}>Last Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setAllTime}>
            <Text style={styles.quickLinkText}>All Time</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterDropdown}
          onPress={() => setCustomRangeVisible(!customRangeVisible)}
        >
          <Text style={styles.filterText}>
            {dateFilter === 'custom_range'
              ? `${format(new Date(startDate), 'MMM dd')} - ${format(new Date(endDate), 'MMM dd')}`
              : 'Select Range'}
          </Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

        {customRangeVisible && (
          <View style={styles.calendarContainer}>
            <Calendar
              markingType={'period'}
              markedDates={getMarkedDates()}
              onDayPress={onDayPress}
              minDate={'2024-01-01'}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={onCustomRangeSelected}
              disabled={!startDate || !endDate}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Event:</Text>
        <View style={styles.quickLinksContainer}>
          {uniqueEvents.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickLink, eventFilter === event && styles.activeFilter]}
              onPress={() => setEventFilter(event)}
            >
              <Text style={styles.quickLinkText}>{event}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
              onPress={() => handleEventPress(comp.CompetitionID)}
            >
              <Text style={styles.sessionDate}>{format(new Date(comp.CompetitionDate), 'MMM dd, yyyy')}</Text>
              {comp.EventResults.map((result, idx) => (
                <View key={idx} style={styles.resultContainer}>
                  <Text style={styles.event}>{result.Event}</Text>
                  <Text style={styles.position}>Position: {result.Position}</Text>
                  <Text style={styles.time}>Mark: {result.Mark}</Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 150,
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  filterLabel: {
    color: '#FFB74D',
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    padding: 12,
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  arrow: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  quickLinkText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  calendarContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  doneButton: {
    backgroundColor: '#FFB74D',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#F57C00',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  searchContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1C1C1C',
    color: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFB74D',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  logButton: {
    backgroundColor: '#FFB74D',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  logButtonText: {
    color: '#0A0A0A',
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  sessionContainer: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionDate: {
    fontSize: 16,
    color: '#FFB74D',
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  sessionDetail: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 2,
    fontFamily: 'Montserrat-Regular',
  },
  resultContainer: {
    marginVertical: 4,
  },
  event: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  position: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  time: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  noDataText: {
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  activeFilter: {
    backgroundColor: '#FFB74D',
  },
});

export default CompetitionLogScreen;
