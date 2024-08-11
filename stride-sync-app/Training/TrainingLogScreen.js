import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import { format, startOfWeek, endOfWeek, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar } from 'react-native-calendars';

const TrainingLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('this_week');
  const [filteredData, setFilteredData] = useState([]);
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const historicalData = [
    { date: '2024-08-01', distance: '5 miles', time: '45 min', notes: 'Hill training' },
    { date: '2024-07-28', distance: '3 miles', time: '30 min', notes: 'Speed workout' },
    { date: '2024-07-25', distance: '10 miles', time: '90 min', notes: 'Long run' },
    { date: '2024-07-20', distance: '6 miles', time: '55 min', notes: 'Endurance training' },
  ];

  useEffect(() => {
    filterData();
  }, [searchQuery, dateFilter, startDate, endDate]);

  const filterData = () => {
    const startDateWeek = startOfWeek(new Date());
    const endDateWeek = endOfWeek(new Date());

    const filtered = historicalData.filter(session => {
      const sessionDate = new Date(session.date);

      let withinDateRange = true;
      if (dateFilter === 'this_week') {
        withinDateRange = sessionDate >= startDateWeek && sessionDate <= endDateWeek;
      } else if (dateFilter === 'last_week') {
        const start = subDays(startDateWeek, 7);
        const end = subDays(endDateWeek, 7);
        withinDateRange = sessionDate >= start && sessionDate <= end;
      } else if (dateFilter === 'last_month') {
        const start = startOfMonth(subMonths(new Date(), 1));
        const end = endOfMonth(subMonths(new Date(), 1));
        withinDateRange = sessionDate >= start && sessionDate <= end;
      } else if (dateFilter === 'custom_range') {
        withinDateRange = sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
      }

      const matchesQuery = session.distance.includes(searchQuery) ||
                           session.time.includes(searchQuery) ||
                           session.notes.toLowerCase().includes(searchQuery.toLowerCase());

      return withinDateRange && matchesQuery;
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
      // Set start date and reset end date
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (!endDate && selectedDate > startDate) {
      // Set end date only if it's after start date
      setEndDate(selectedDate);
    } else if (startDate && endDate) {
      // Reset dates if both are set
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };
  

  const getMarkedDates = () => {
    const markedDates = {};

    if (startDate) {
      markedDates[startDate] = { startingDay: true, color: '#50cebb', textColor: 'white' };
    }

    if (endDate) {
      markedDates[endDate] = { endingDay: true, color: '#50cebb', textColor: 'white' };
    }

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      while (start <= end) {
        const dateString = format(start, 'yyyy-MM-dd');
        markedDates[dateString] = { color: '#70d7c7', textColor: 'white' };
        start.setDate(start.getDate() + 1);
      }
    }

    return markedDates;
  };

  const setToday = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setStartDate(today);
    setEndDate(today);
    setDateFilter('custom_range');
  };

  const setYesterday = () => {
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    setStartDate(yesterday);
    setEndDate(yesterday);
    setDateFilter('custom_range');
  };

  const setLastWeek = () => {
    const lastWeekStart = format(startOfWeek(subDays(new Date(), 7)), 'yyyy-MM-dd');
    const lastWeekEnd = format(endOfWeek(subDays(new Date(), 7)), 'yyyy-MM-dd');
    setStartDate(lastWeekStart);
    setEndDate(lastWeekEnd);
    setDateFilter('custom_range');
  };

  const setLastMonth = () => {
    const lastMonthStart = format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');
    const lastMonthEnd = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');
    setStartDate(lastMonthStart);
    setEndDate(lastMonthEnd);
    setDateFilter('custom_range');
  };

  return (
    <View style={styles.container}>
      <Header title="Training Log" navigation={navigation} />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Date:</Text>

        <View style={styles.quickLinksContainer}>
          <TouchableOpacity style={styles.quickLink} onPress={setToday}>
            <Text style={styles.quickLinkText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setYesterday}>
            <Text style={styles.quickLinkText}>Yesterday</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setLastWeek}>
            <Text style={styles.quickLinkText}>Last Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={setLastMonth}>
            <Text style={styles.quickLinkText}>Last Month</Text>
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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search training sessions..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity
            style={styles.logButton}
            onPress={() => navigation.navigate('LogTraining')}
          >
            <Text style={styles.logButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {filteredData.length > 0 ? (
          filteredData.map((session, index) => (
            <View key={index} style={styles.sessionContainer}>
              <Text style={styles.sessionDate}>{session.date}</Text>
              <Text style={styles.sessionDetail}>Distance: {session.distance}</Text>
              <Text style={styles.sessionDetail}>Time: {session.time}</Text>
              <Text style={styles.sessionDetail}>Notes: {session.notes}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No results found.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('AITrainingProgram')}
      >
        <Text style={styles.aiButtonText}>Generate AI Training Program</Text>
      </TouchableOpacity>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  filterContainer: { paddingHorizontal: 20, marginBottom: 20, marginTop: 10, },
  filterLabel: { color: '#D0FD3E', marginBottom: 10, fontFamily: 'Montserrat-SemiBold' },
  filterDropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#333', padding: 10, borderRadius: 10 },
  filterText: { color: '#fff', fontSize: 16, fontFamily: 'Montserrat-Regular' },
  arrow: { color: '#fff', fontSize: 16 },
  quickLinksContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  quickLink: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#444', borderRadius: 5 },
  quickLinkText: { color: '#fff', fontSize: 14, fontFamily: 'Montserrat-Regular' },
  calendarContainer: { backgroundColor: '#333', borderRadius: 10, padding: 10, marginTop: 10 },
  doneButton: { backgroundColor: '#D0FD3E', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  doneButtonText: { color: '#000', fontSize: 16, fontFamily: 'Montserrat-Bold' },
  searchContainer: { paddingHorizontal: 20, marginTop: 10, marginBottom: 10, }, 
  searchInput: { backgroundColor: '#333', color: '#fff', borderRadius: 10, paddingHorizontal: 15, height: 40, fontSize: 16 },
  content: { paddingHorizontal: 20, paddingBottom: 150,},
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontFamily: 'Montserrat-Bold', color: '#D0FD3E' },
  logButton: { backgroundColor: '#D0FD3E', borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  logButtonText: { fontSize: 20, color: '#000', fontFamily: 'Montserrat-Bold' },
  sessionContainer: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 15 },
  sessionDate: { fontSize: 16, color: '#D0FD3E', marginBottom: 5, fontFamily: 'Montserrat-SemiBold' },
  sessionDetail: { fontSize: 14, color: '#fff', marginBottom: 2, fontFamily: 'Montserrat-Regular' },
  noResultsText: { color: '#fff', textAlign: 'center', marginTop: 20, fontFamily: 'Montserrat-Regular' },
  aiButton: { position: 'absolute', bottom: 50, left: 20, right: 20, backgroundColor: '#00bfae', paddingVertical: 15, borderRadius: 10, alignItems: 'center'},
  aiButtonText: { fontSize: 18, color: '#000', fontFamily: 'Montserrat-Bold' },
});

export default TrainingLogScreen;
