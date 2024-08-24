import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format, startOfWeek, endOfWeek, subDays, subMonths } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import styles from '../../Styles/TrainingLogScreenStyles'; 

const DateFilter = ({ dateFilter, setDateFilter, startDate, setStartDate, endDate, setEndDate }) => {
  const [customRangeVisible, setCustomRangeVisible] = useState(false);

  const onCustomRangeSelected = () => {
    setCustomRangeVisible(false);
    setDateFilter('custom_range');
  };

  const onDayPress = (day) => {
    const selectedDate = new Date(day.dateString);

    if (!startDate || (endDate && selectedDate < new Date(startDate))) {
      setStartDate(selectedDate.toISOString());
      setEndDate(null);
    } else if (!endDate && selectedDate > new Date(startDate)) {
      setEndDate(selectedDate.toISOString());
    } else if (startDate && endDate) {
      setStartDate(selectedDate.toISOString());
      setEndDate(null);
    }
  };

  const getMarkedDates = () => {
    const markedDates = {};

    if (startDate) {
      markedDates[new Date(startDate).toLocaleDateString('en-CA')] = {
        startingDay: true,
        color: '#50cebb',
        textColor: 'white'
      };
    }

    if (endDate) {
      markedDates[new Date(endDate).toLocaleDateString('en-CA')] = {
        endingDay: true,
        color: '#50cebb',
        textColor: 'white'
      };
    }

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      while (start <= end) {
        const dateString = start.toLocaleDateString('en-CA');
        markedDates[dateString] = { color: '#70d7c7', textColor: 'white' };
        start.setDate(start.getDate() + 1);
      }
    }

    return markedDates;
  };

  const setToday = () => {
    const today = new Date();
    setStartDate(today.toISOString());
    setEndDate(today.toISOString());
    setDateFilter('custom_range');
  };

  const setYesterday = () => {
    const yesterday = subDays(new Date(), 1);
    setStartDate(yesterday.toISOString());
    setEndDate(yesterday.toISOString());
    setDateFilter('custom_range');
  };

  const setLastWeek = () => {
    const lastWeekStart = startOfWeek(subDays(new Date(), 7));
    const lastWeekEnd = endOfWeek(subDays(new Date(), 7));
    setStartDate(lastWeekStart.toISOString());
    setEndDate(lastWeekEnd.toISOString());
    setDateFilter('custom_range');
  };

  const setAllTime = () => {
    const allTimeStartDate = '2000-01-01';
    const allTimeEndDate = new Date();
  
    setStartDate(new Date(allTimeStartDate).toISOString());
    setEndDate(allTimeEndDate.toISOString());
    setDateFilter('custom_range');
  };

  return (
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
            ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
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
  );
};

export default DateFilter;
