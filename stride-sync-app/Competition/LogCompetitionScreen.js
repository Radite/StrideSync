import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Footer from '../Footer';
import Header from '../Header';

const LogCompetitionScreen = ({ navigation }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || competitionDate;
    setShowDatePicker(false);
    setCompetitionDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowTimePicker(false);
    setStartTime(currentTime);
  };

  const handleSubmit = () => {
    if (competitionName && events) {
      // After saving, navigate back to the CompetitionLogScreen
      navigation.navigate('CompetitionLog');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Log Competition" navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.label}>Competition Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter competition name"
          placeholderTextColor="#888"
          value={competitionName}
          onChangeText={setCompetitionName}
        />

        <Text style={styles.label}>Competition Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{format(competitionDate, 'yyyy-MM-dd')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={competitionDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Events</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter events (comma separated)"
          placeholderTextColor="#888"
          value={events}
          onChangeText={setEvents}
        />

        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{format(startTime, 'hh:mm a')}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.logButton} onPress={handleSubmit}>
          <Text style={styles.logButtonText}>Save Competition</Text>
        </TouchableOpacity>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20 },
  label: { color: '#D0FD3E', fontSize: 16, marginBottom: 10, fontFamily: 'Montserrat-SemiBold' },
  input: { backgroundColor: '#333', color: '#fff', borderRadius: 10, padding: 15, marginBottom: 20, fontSize: 16, fontFamily: 'Montserrat-Regular' },
  dateInput: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 20 },
  dateText: { color: '#fff', fontSize: 16, fontFamily: 'Montserrat-Regular' },
  logButton: { backgroundColor: '#D0FD3E', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  logButtonText: { fontSize: 18, color: '#000', fontFamily: 'Montserrat-Bold' },
});

export default LogCompetitionScreen;
