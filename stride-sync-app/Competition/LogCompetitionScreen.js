import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, startOfDay } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import Footer from '../Footer';
import Header from '../Header';

const eventOptions = [
  { label: '60m', value: '60m' },
  { label: '100m', value: '100m' },
  { label: '200m', value: '200m' },
  { label: '400m', value: '400m' },
  { label: '800m', value: '800m' },
  { label: '1500m', value: '1500m' },
  { label: '3000m', value: '3000m' },
  { label: '3000m Steeplechase', value: '3000m Steeplechase' },
  { label: '5000m', value: '5000m' },
  { label: '10000m', value: '10000m' },
  { label: 'Marathon', value: 'Marathon' },
  { label: 'Half Marathon', value: 'Half Marathon' },
  { label: 'Long Jump', value: 'Long Jump' },
  { label: 'High Jump', value: 'High Jump' },
  { label: 'Pole Vault', value: 'Pole Vault' },
  { label: 'Shot Put', value: 'Shot Put' },
  { label: 'Javelin', value: 'Javelin' },
  { label: 'Discus', value: 'Discus' },
  { label: 'Hammer Throw', value: 'Hammer Throw' }
];

const convertTimeToSeconds = (time) => {
  const timeRegex = /^((\d+):)?(\d+):(\d+)(\.(\d+))?$/;
  const matches = time.match(timeRegex);

  if (!matches) return 0;

  const hours = parseInt(matches[2] || '0', 10);
  const minutes = parseInt(matches[3], 10);
  const seconds = parseInt(matches[4], 10);
  const milliseconds = parseInt((matches[6] || '0').substring(0, 2), 10);

  return hours * 3600 + minutes * 60 + seconds + milliseconds / 100;
};

const LogCompetitionScreen = ({ navigation }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([{ event: '', mark: '', position: '' }]);
  const [notes, setNotes] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  // Get today's date
  const today = startOfDay(new Date());

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || competitionDate;

    // Ensure the selected date is not beyond today's date
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
      // Convert marks to seconds
      const competitionData = {
        AthleteID: 1, // Replace with actual athlete ID if needed
        CompetitionName: competitionName,
        CompetitionDate: format(competitionDate, 'yyyy-MM-dd'),
        EventResults: events.map(e => ({
          Event: e.event,
          Mark: convertTimeToSeconds(e.mark), // Convert mark to seconds
          Position: e.position,
        })),
        Notes: notes,
      };
  
      // Make API request to save competition data
      fetch('http://192.168.100.71:3000/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitionData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.CompetitionID) {
            // If successful, log success and navigate back
            console.log('Success: Competition data saved successfully.', data);
            navigation.navigate('CompetitionLog');
          } else {
            // Log failure response and alert user
            console.error('Failed to save competition data:', data);
            Alert.alert('Error', 'Failed to save competition data.');
          }
        })
        .catch(error => {
          // Log error and alert user
          console.error('Error saving competition data:', error);
          Alert.alert('Error', 'An error occurred while saving competition data.');
        });
    } else {
      // Alert user if validation fails
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Log Competition" navigation={navigation} />

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
              maximumDate={today} // Restrict date picker to today or earlier
              onChange={handleDateChange}
            />
          )}
        </View>

        {events.map((event, index) => (
          <View key={index} style={styles.formGroup}>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event</Text>
                <RNPickerSelect
                  placeholder={{ label: 'Select Event', value: '' }}
                  items={eventOptions}
                  onValueChange={(value) => handleEventChange(index, 'event', value)}
                  value={event.event}
                  style={pickerSelectStyles}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mark</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Event Result"
                  placeholderTextColor="#888"
                  value={event.mark}
                  onChangeText={(value) => handleEventChange(index, 'mark', value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Position</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Position"
                  placeholderTextColor="#888"
                  value={event.position}
                  onChangeText={(value) => handleEventChange(index, 'position', value)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteEvent(index)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
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

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
  },
  label: {
    fontSize: 14,
    color: '#FFB74D',
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  dateButton: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#ffffff',
    backgroundColor: '#2A2A2A',
  },
  pickerButton: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 10,
  },
  pickerButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 70,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  addButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  deleteButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pickerSelectStyles: {
    inputIOS: {
      color: '#ffffff',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#2A2A2A',
    },
    inputAndroid: {
      color: '#ffffff',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#2A2A2A',
    },
    placeholder: {
      color: '#888',
    },
  },
});
const pickerSelectStyles = {
  inputIOS: {
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
  },
  inputAndroid: {
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
  },
};
export default LogCompetitionScreen;
