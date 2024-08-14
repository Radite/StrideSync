import React, { useState, useEffect, useCallback  } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../Footer'; 
import Header from '../Header'; 
import { format, startOfWeek, endOfWeek, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import axios from 'axios'; // Make sure axios is installed
import { useFocusEffect } from '@react-navigation/native';

const TrainingLogScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('this_week');
  const [filteredData, setFilteredData] = useState([]);
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [historicalData, setHistoricalData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Fetch data from API
      axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1')
        .then(response => {
          setHistoricalData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [])
  );
  useEffect(() => {
    filterData();
  }, [searchQuery, dateFilter, startDate, endDate, historicalData]);
// Function to filter data
const filterData = () => {
  const startDateWeek = startOfWeek(new Date());
  const endDateWeek = endOfWeek(new Date());

  const filtered = historicalData.filter(session => {
    const sessionDate = new Date(session.SessionDate);

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

    const queryLowerCase = searchQuery.toLowerCase();
    const matchesQuery = session.SessionType.toLowerCase().includes(queryLowerCase) ||
                          session.Notes.toLowerCase().includes(queryLowerCase) ||
                          session.EventDetails.some(event => event.Event.toLowerCase().includes(queryLowerCase));

    return withinDateRange && matchesQuery;
  });

  setFilteredData(filtered);
};

const eventNameMapping = {
  HighJump: 'High Jump',
  LongJump: 'Long Jump',
  PoleVault: 'Pole Vault',
  TripleJump: 'Triple Jump',
  ShotPut: 'Shot Put',
  Discus: 'Discus',
  Javelin: 'Javelin',
  HammerThrow: 'Hammer Throw'
};

  // Function to calculate summary
  const calculateSummary = () => {
    const summaries = {
      Running: { totalDistance: 0, totalDuration: 0, totalSessions: 0 },
      Jump: {
        HighJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
        LongJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
        PoleVault: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
        TripleJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 }
      },
      Throw: {
        ShotPut: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
        Discus: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
        Javelin: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
        HammerThrow: { totalDistance: 0, totalThrows: 0, averageThrow: 0 }
      }
    };

    filteredData.forEach(session => {
      const { TotalDistanceRan, TotalTimeRan, TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted, TotalDistanceTripleJumped, TotalDistanceShotPut, TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown, NumberOfHighJumps, NumberOfLongJumps, NumberOfPoleVaults, NumberOfTripleJumps, NumberOfShotPuts, NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows } = session;

      if (TotalDistanceRan) {
        summaries.Running.totalDistance += TotalDistanceRan;
        summaries.Running.totalDuration += TotalTimeRan;
        summaries.Running.totalSessions += 1;
      }
      if (TotalDistanceHighJumped) {
        summaries.Jump.HighJump.totalDistance += TotalDistanceHighJumped;
        summaries.Jump.HighJump.totalJumps += NumberOfHighJumps;
      }
      if (TotalDistanceLongJumped) {
        summaries.Jump.LongJump.totalDistance += TotalDistanceLongJumped;
        summaries.Jump.LongJump.totalJumps += NumberOfLongJumps;
      }
      if (TotalDistancePoleVaulted) {
        summaries.Jump.PoleVault.totalDistance += TotalDistancePoleVaulted;
        summaries.Jump.PoleVault.totalJumps += NumberOfPoleVaults;
      }
      if (TotalDistanceTripleJumped) {
        summaries.Jump.TripleJump.totalDistance += TotalDistanceTripleJumped;
        summaries.Jump.TripleJump.totalJumps += NumberOfTripleJumps;
      }
      if (TotalDistanceShotPut) {
        summaries.Throw.ShotPut.totalDistance += TotalDistanceShotPut;
        summaries.Throw.ShotPut.totalThrows += NumberOfShotPuts;
      }
      if (TotalDistanceDiscusThrown) {
        summaries.Throw.Discus.totalDistance += TotalDistanceDiscusThrown;
        summaries.Throw.Discus.totalThrows += NumberOfDiscusThrows;
      }
      if (TotalDistanceJavelinThrown) {
        summaries.Throw.Javelin.totalDistance += TotalDistanceJavelinThrown;
        summaries.Throw.Javelin.totalThrows += NumberOfJavelinThrows;
      }
      if (TotalDistanceHammerThrown) {
        summaries.Throw.HammerThrow.totalDistance += TotalDistanceHammerThrown;
        summaries.Throw.HammerThrow.totalThrows += NumberOfHammerThrows;
      }
    });

    // Calculate averages
    Object.keys(summaries.Jump).forEach(key => {
      const jump = summaries.Jump[key];
      jump.averageJump = jump.totalJumps > 0 ? (jump.totalDistance / jump.totalJumps).toFixed(2) : 0;
    });

    Object.keys(summaries.Throw).forEach(key => {
      const throwEvent = summaries.Throw[key];
      throwEvent.averageThrow = throwEvent.totalThrows > 0 ? (throwEvent.totalDistance / throwEvent.totalThrows).toFixed(2) : 0;
    });

    // Average Avg Speed for running
    const averageSpeed = summaries.Running.totalSessions > 0
      ? (summaries.Running.totalDistance / summaries.Running.totalDuration).toFixed(2)
      : 0;

    return {
      Running: {
        totalDistance: summaries.Running.totalDistance.toFixed(2),
        totalDuration: summaries.Running.totalDuration.toFixed(2),
        averageSpeed
      },
      Jump: summaries.Jump,
      Throw: summaries.Throw
    };
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

  const setAllTime = () => {
    // Set a far past date and current date as end date
    const allTimeStartDate = '2000-01-01'; // or use a dynamic start date based on your data
    const allTimeEndDate = format(new Date(), 'yyyy-MM-dd');
  
    setStartDate(allTimeStartDate);
    setEndDate(allTimeEndDate);
    setDateFilter('custom_range');
  };
  

  const summary = calculateSummary();

  const renderSummaryCards = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Running</Text>
          <Text style={styles.summaryCardDistance}>Distance: {summary.Running.totalDistance} metres</Text>
          <Text style={styles.summaryCardDistance}>Time: {summary.Running.totalDuration} seconds</Text>
          <Text style={styles.summaryCardDistance}>Avg Speed: {summary.Running.averageSpeed} m/s</Text>
        </View>

        {Object.keys(summary.Jump).map((event) => (
          <View key={event} style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>{eventNameMapping[event]}</Text>
            <Text style={styles.summaryCardDistance}>Distance: {summary.Jump[event].totalDistance} metres</Text>
            <Text style={styles.summaryCardDistance}>Jumps: {summary.Jump[event].totalJumps}</Text>
            <Text style={styles.summaryCardDistance}>Avg Jump: {summary.Jump[event].averageJump} metres</Text>
          </View>
        ))}

        {Object.keys(summary.Throw).map((event) => (
          <View key={event} style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>{eventNameMapping[event]}</Text>
            <Text style={styles.summaryCardDistance}>Distance: {summary.Throw[event].totalDistance} metres</Text>
            <Text style={styles.summaryCardDistance}>Throws: {summary.Throw[event].totalThrows}</Text>
            <Text style={styles.summaryCardDistance}>Avg Throw: {summary.Throw[event].averageThrow} metres</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

// Update the renderSessionHistory function
const renderSessionHistory = () => {
  return filteredData.map((session, index) => {
    // Extract event details
    const events = session.EventDetails.map(event => event.Event).join(', ');

    return (
      <TouchableOpacity
        key={index}
        style={styles.sessionContainer}
        onPress={() => navigation.navigate('TrainingSessionDetails', { sessionId: session.SessionID })}
      >
        <Text style={styles.sessionDate}>{format(new Date(session.SessionDate), 'MMM dd, yyyy')}</Text>
        <Text style={styles.summaryCardDistance}>Session Type: {session.SessionType}</Text>
        <Text style={styles.summaryCardDistance}>Events: {events}</Text>
        <Text style={styles.summaryCardDistance}>Notes: {session.Notes}</Text>
      </TouchableOpacity>
    );
  });
};
  return (
    <View style={styles.container}>
      <Header title="Training Log" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Render Summary Cards */}
        {renderSummaryCards()}

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
                ? `${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`
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

        <View style={styles.content}>
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
            renderSessionHistory()
          ) : (
            <Text style={styles.noResultsText}>No results found.</Text>
          )}
        </View>
      </ScrollView>

      <Footer navigation={navigation} activeScreen="TrainingLog" />
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
    marginTop: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    width: 300,
    height: 115,
  },
  summaryCardTitle: {
    fontSize: 18,
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  summaryCardDistance: {
    fontSize: 16,
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
  summaryCardTime: {
    fontSize: 14,
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
  },
  summaryContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  filterLabel: {
    color: '#F0F0F0',
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
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
    elevation: 3,
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
    marginTop: 10,
    marginBottom: 10,
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
  content: {
    paddingBottom: 150,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
  },
  logButton: {
    backgroundColor: '#FFB74D',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  logButtonText: {
    fontSize: 22,
    color: '#0A0A0A',
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
  noResultsText: {
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  aiButton: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: '#00bfae',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  aiButtonText: {
    fontSize: 18,
    color: '#0A0A0A',
    fontFamily: 'Montserrat-Bold',
  },
});

export default TrainingLogScreen;
