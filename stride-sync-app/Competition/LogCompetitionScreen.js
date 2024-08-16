import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, FlatList, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Footer from '../Footer';
import Header from '../Header';

const eventOptions = [
  '60m', '100m', '200m', '400m', '800m', '1500m', '3000m', '3000m steeplechase', '5000m', '10000m', 
  'marathon', 'half marathon', 'long jump', 'high jump', 'pole vault', 'shot put', 'javelin', 
  'discus', 'hammer throw'
];

const LogCompetitionScreen = ({ navigation }) => {
  const [competitionName, setCompetitionName] = useState('');
  const [competitionDate, setCompetitionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState([{ event: '', mark: '', position: '' }]);
  const [notes, setNotes] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || competitionDate;
    setShowDatePicker(false);
    setCompetitionDate(currentDate);
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
      // Prepare data for submission
      const competitionData = {
        AthleteID: 1, // Replace with actual athlete ID if needed
        CompetitionName: competitionName,
        CompetitionDate: format(competitionDate, 'yyyy-MM-dd'),
        EventResults: events.map(e => ({
          Event: e.event,
          Mark: e.mark,
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
  

  const openModal = (index) => {
    setSelectedEventIndex(index);
    setModalVisible(true);
  };

  const selectEvent = (event) => {
    const newEvents = [...events];
    newEvents[selectedEventIndex].event = event;
    setEvents(newEvents);
    setModalVisible(false);
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
              onChange={handleDateChange}
            />
          )}
        </View>

        {events.map((event, index) => (
          <View key={index} style={styles.formGroup}>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event</Text>
                <TouchableOpacity onPress={() => openModal(index)} style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>{event.event || 'Select Event'}</Text>
                </TouchableOpacity>
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

        {/* Modal for event selection */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={eventOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable style={styles.modalItem} onPress={() => selectEvent(item)}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between', // Ensures that Footer is pushed to the bottom
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
    marginBottom: 70, // Adjust as needed to ensure spacing from Footer
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
    width: 25, // Adjust size as needed
    height: 25, // Adjust size as needed
    borderRadius: 15, // This makes the button circular
    backgroundColor: 'orange', // Fill color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Positioning can be adjusted based on where you want the button
    top: 5, // Adjust as necessary
    right: 5, // Adjust as necessary
  },
  deleteButtonText: {
    color: 'white', // Text color
    fontSize: 14, // Font size for "X"
    fontWeight: 'bold', // Make the "X" bold
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default LogCompetitionScreen;
