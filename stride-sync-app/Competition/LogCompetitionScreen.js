import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, startOfDay } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import Footer from '../Footer';
import Header from '../Header';
import { Switch } from 'react-native'; 

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
  if (!time) return 0;

  // Regular expression to match time formats
  const timeRegex = /^((\d{1,2}):)?(\d{1,2}):(\d{2})(\.(\d{1,3}))?$/;
  const decimalRegex = /^\d+(\.\d+)?$/;

  if (decimalRegex.test(time)) {
    return parseFloat(time);
  }

  const matches = time.match(timeRegex);

  if (!matches) {
    console.log('Time format error:', time); // Log if format is incorrect
    return 0;
  }

  const hours = parseInt(matches[2] || '0', 10);
  const minutes = parseInt(matches[3] || '0', 10);
  const seconds = parseInt(matches[4], 10);
  const milliseconds = parseFloat((matches[6] || '0').padEnd(3, '0')); // Corrected to match the right group

  const totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  console.log(`Parsed Time: ${hours}:${minutes}:${seconds}.${milliseconds}, Total Seconds: ${totalSeconds}`);
  return totalSeconds;
};



const LogCompetitionScreen = ({ navigation }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([{ event: '', mark: '', position: '' }]);
  const [notes, setNotes] = useState('');
  const [currentPBs, setCurrentPBs] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [isIndoor, setIsIndoor] = useState(false);

  // Get today's date
  const today = startOfDay(new Date());

  useEffect(() => {
    // Fetch current PBs when component mounts
    fetch('http://192.168.100.71:3000/api/athlete-profiles/1')
      .then(response => response.json())
      .then(data => {
        setCurrentPBs(data.PersonalBests);
      })
      .catch(error => {
        console.error('Error fetching personal bests:', error);
      });
  }, []);

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
      // Convert marks to seconds
      const updatedPBs = { ...currentPBs };
      
      events.forEach(e => {
        if (e.event && e.mark) {
          const markInSeconds = convertTimeToSeconds(e.mark);
          console.log(`Event: ${e.event}`);
          console.log(`Raw Mark: ${e.mark}`);
          console.log(`Converted Mark in Seconds: ${markInSeconds}`);
          const currentPB = parseFloat(updatedPBs[e.event]) || Infinity;
  
          if (markInSeconds < currentPB) {
            updatedPBs[e.event] = e.mark;
          }
        }
      });
  
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
        IsIndoor: isIndoor, 
        UpdatedPersonalBests: updatedPBs,
      };
  
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
            console.log('Success: Competition data saved successfully.', data);
            navigation.navigate('CompetitionLog');
          } else {
            console.error('Failed to save competition data:', data);
            Alert.alert('Error', 'Failed to save competition data.');
          }
        })
        .catch(error => {
          console.error('Error saving competition data:', error);
          Alert.alert('Error', 'An error occurred while saving competition data.');
        });
    } else {
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: 'white',
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
