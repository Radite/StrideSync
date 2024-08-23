// src/components/CompetitionForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, startOfDay } from 'date-fns';
import EventForm from './EventForm';
import { convertTimeToSeconds } from '../../Utils/eventUtils';
import styles from '../../Styles/LogCompetitionScreenStyles';

// Function to validate individual marks
const validateMark = (mark, event) => {
  const fieldEvents = ['Long Jump', 'High Jump', 'Pole Vault', 'Shot Put', 'Discus', 'Javelin', 'Hammer Throw'];
  
  // If the event is a field event, validate it as a decimal number
  if (fieldEvents.includes(event)) {
    // Regular expression to validate any number with up to two decimal places
    const decimalPattern = /^\d+(\.\d{1,2})?$/;

    // Trim the input to remove any leading/trailing spaces
    const normalizedMark = mark.trim();

    if (!normalizedMark) {
      return 'Mark is required for field events.';
    }

    if (!decimalPattern.test(normalizedMark)) {
      return 'Marks for field events must be a valid number with up to two decimal places.';
    }

    return null; // No error for field events
  }

  // Regular expression to validate time format for track events
  const timePattern = /^(\d{1,2}):(\d{2}):(\d{2})\.(\d{1,2})$|^(\d{1,2}):(\d{2})\.(\d{1,2})$|^(\d{1,2}):(\d{2})$|^(\d{1,2})\.(\d{1,2})$|^(\d{1,2})$|^(\d{2})$|^(\d{1})$/;

  // Normalize the mark to ensure milliseconds are properly handled
  let normalizedMark = mark.trim();

  // Match the time pattern and capture groups
  const match = timePattern.exec(normalizedMark);
  if (!match) {
    return 'Marks must be in the format SS.ss, MM:SS.ss, or HH:MM:SS.ss.';
  }

  // Extract time components from regex match
  const [hours, minutes, seconds, milliseconds] = [
    match[1] || '00', // Default to '00' if not provided
    match[2] || '00',
    match[3] || '00',
    match[4] || '00'
  ];

  // Validate ranges for track event times
  if (hours && (hours < 0 || hours > 23)) {
    return 'Invalid hours value.';
  }
  if (minutes && (minutes < 0 || minutes > 59)) {
    return 'Invalid minutes value.';
  }
  if (seconds && (seconds < 0 || seconds > 59)) {
    return 'Invalid seconds value.';
  }
  if (milliseconds && (milliseconds < 0 || milliseconds > 99)) {
    return 'Invalid milliseconds value.';
  }

  return null; // No error for track events
};

const CompetitionForm = ({ eventOptions, onSubmit, today }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([{ event: '', mark: '', position: '', markError: '' }]);
  const [notes, setNotes] = useState('');
  const [isIndoor, setIsIndoor] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || competitionDate;
    if (isBefore(currentDate, today)) {
      setCompetitionDate(currentDate);
    } else {
      Alert.alert('Error', 'Date cannot be in the future.');
    }
    setShowDatePicker(false);
  };

  const handleAddEvent = () => {
    setEvents([...events, { event: '', mark: '', position: '', markError: '' }]);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
  
    if (field === 'mark') {
      // Pass event type to validateMark
      const error = validateMark(value, newEvents[index].event);
      newEvents[index].markError = error;
    }
  
    setEvents(newEvents);
  };
  
  const handleDeleteEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  const handleSubmit = () => {
    // Validate all marks before submission
    const isValid = events.every(e => e.mark && !e.markError);
    
    if (!competitionName) {
      Alert.alert('Error', 'Competition Name is required.');
      return;
    }
    
    if (!isValid) {
      alert('Marks must be in the format SS.ss, MM:SS.ss, or HH:MM:SS.ss.');
      return;
    }

    if (events.some(e => !e.event || !e.position)) {
      Alert.alert('Error', 'Please fill out all event fields.');
      return;
    }

    const competitionData = {
      CompetitionName: competitionName,
      CompetitionDate: format(competitionDate, 'yyyy-MM-dd'),
      EventResults: events.map(e => ({
        Event: e.event,
        Mark: convertTimeToSeconds(e.mark),
        Position: e.position,
      })),
      Notes: notes,
      IsIndoor: isIndoor,
    };
    
    onSubmit(competitionData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Competition Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter competition name"
          placeholderTextColor="#888"
          value={competitionName}
          onChangeText={setCompetitionName}
        />
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Competition Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>{format(competitionDate, 'yyyy-MM-dd')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={competitionDate}
            mode="date"
            display="default"
            maximumDate={today}
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Competition Type</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Outdoor</Text>
          <Switch
            value={isIndoor}
            onValueChange={setIsIndoor}
            thumbColor={isIndoor ? '#4CAF50' : '#ccc'}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
          />
          <Text style={styles.switchLabel}>Indoor</Text>
        </View>
      </View>

      {events.map((event, index) => (
        <EventForm
          key={index}
          index={index}
          event={event}
          eventOptions={eventOptions}
          handleEventChange={handleEventChange}
          handleDeleteEvent={handleDeleteEvent}
          markError={event.markError}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>Add Another Event</Text>
      </TouchableOpacity>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter additional notes"
          placeholderTextColor="#888"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Competition</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompetitionForm;
