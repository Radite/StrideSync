// src/components/CompetitionForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, startOfDay } from 'date-fns';
import EventForm from './EventForm';
import { convertTimeToSeconds } from '../../Utils/EventUtils';
import styles from '../../Styles/LogCompetitionScreenStyles';

const CompetitionForm = ({ eventOptions, onSubmit, today }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([{ event: '', mark: '', position: '' }]);
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
    setEvents([...events, { event: '', mark: '', position: '' }]);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
    setEvents(newEvents);
  };

  const handleDeleteEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  const handleSubmit = () => {
    if (competitionName && events.every(e => e.event && e.mark && e.position)) {
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
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
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
