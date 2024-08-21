// DateFilter.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format, startOfWeek, endOfWeek, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import styles from '../../Styles/TrainingLogScreenStyles'; 

const DateFilter = ({ dateFilter, setDateFilter, startDate, setStartDate, endDate, setEndDate }) => {
  const [customRangeVisible, setCustomRangeVisible] = useState(false);

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
    const allTimeStartDate = '2000-01-01'; // or use a dynamic start date based on your data
    const allTimeEndDate = format(new Date(), 'yyyy-MM-dd');
  
    setStartDate(allTimeStartDate);
    setEndDate(allTimeEndDate);
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
  );
};

export default DateFilter;
