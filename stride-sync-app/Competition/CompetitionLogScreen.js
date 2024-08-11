import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import { format, startOfWeek, endOfWeek, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar } from 'react-native-calendars';

const CompetitionLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('this_week');
  const [filteredData, setFilteredData] = useState([]);
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const competitionData = [
    { date: '2024-08-15', name: 'City Marathon', events: '5k, 10k, Half Marathon', startTime: '07:00 AM' },
    { date: '2024-07-30', name: 'Track Meet', events: '100m, 200m, 400m', startTime: '09:00 AM' },
    { date: '2024-06-25', name: 'Regional Championship', events: '5k, 10k', startTime: '06:00 AM' },
    { date: '2024-05-20', name: 'Spring Classic', events: '10k, Half Marathon', startTime: '08:00 AM' },
  ];

  useEffect(() => {
    filterData();
  }, [searchQuery, dateFilter, startDate, endDate]);

  const filterData = () => {
    const startDateWeek = startOfWeek(new Date());
    const endDateWeek = endOfWeek(new Date());

    const filtered = competitionData.filter(competition => {
      const competitionDate = new Date(competition.date);

      let withinDateRange = true;
      if (dateFilter === 'this_week') {
        withinDateRange = competitionDate >= startDateWeek && competitionDate <= endDateWeek;
      } else if (dateFilter === 'last_week') {
        const start = subDays(startDateWeek, 7);
        const end = subDays(endDateWeek, 7);
        withinDateRange = competitionDate >= start && competitionDate <= end;
      } else if (dateFilter === 'last_month') {
        const start = startOfMonth(subMonths(new Date(), 1));
        const end = endOfMonth(subMonths(new Date(), 1));
        withinDateRange = competitionDate >= start && competitionDate <= end;
      } else if (dateFilter === 'custom_range') {
        withinDateRange = competitionDate >= new Date(startDate) && competitionDate <= new Date(endDate);
      }

      const matchesQuery = competition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           competition.events.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           competition.startTime.includes(searchQuery);

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
      markedDates[startDate] = { startingDay: true, color: '#FFB74D', textColor: 'white' };
    }

    if (endDate) {
      markedDates[endDate] = { endingDay: true, color: '#FFB74D', textColor: 'white' };
    }

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      while (start <= end) {
        const dateString = format(start, 'yyyy-MM-dd');
        markedDates[dateString] = { color: '#FFB74D', textColor: 'white' };
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
      <Header title="Competition Log" navigation={navigation} />

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
          placeholder="Search competitions..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Competitions</Text>
        {filteredData.length > 0 ? (
          filteredData.map((competition, index) => (
            <View key={index} style={styles.sessionContainer}>
              <Text style={styles.sessionDate}>{competition.date}</Text>
              <Text style={styles.sessionDetail}>Name: {competition.name}</Text>
              <Text style={styles.sessionDetail}>Events: {competition.events}</Text>
              <Text style={styles.sessionDetail}>Start Time: {competition.startTime}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No competitions found</Text>
        )}
      </ScrollView>

      <Footer navigation={navigation} activeScreen="CompetitionLog" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Background color for consistency
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 150, // Ensure space for footer
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D', // Title color
    marginBottom: 20,
  },
  sessionContainer: {
    backgroundColor: '#1C1C1C', // Background color for sessions
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
    color: '#FFB74D', // Date color
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  sessionDetail: {
    fontSize: 14,
    color: '#E0E0E0', // Detail color
    marginBottom: 2,
    fontFamily: 'Montserrat-Regular',
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
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  filterLabel: {
    color: '#FFB74D', // Label color
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
    color: '#E0E0E0', // Filter text color
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  arrow: {
    color: '#E0E0E0', // Arrow color
    fontSize: 16,
  },
  quickLinksContainer: {
    flexDirection: 'row',
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
    color: '#E0E0E0', // Quick link text color
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
    color: '#0A0A0A', // Button text color
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  noResultsText: {
    color: '#E0E0E0', // No results text color
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
});

export default CompetitionLogScreen;
