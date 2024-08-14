import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { format } from 'date-fns';
import Header from '../Header'; // Adjust the import path as needed
import Footer from '../Footer'; // Adjust the import path as needed

const LogTraining = ({ navigation }) => {
  const [trainingType, setTrainingType] = useState('');
  const [trainingLogs, setTrainingLogs] = useState([
    { 
      eventType: '', 
      subEvent: '', 
      reps: '', 
      marks: [''], 
      distance: '', 
      distanceUnit: 'meters', 
      sled: false, 
      hills: false, 
      grass: false, 
      spikes: false,
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState(''); // Notes field for the entire session

  // Convert distance to meters
  const convertToMeters = (distance, unit) => {
    if (unit === 'miles') return distance * 1609.34;
    if (unit === 'feet') return distance * 0.3048;
    return distance;
  };

  // Calculate total distance for running events
  const calculateTotalDistance = () => {
    return trainingLogs
      .filter(log => log.eventType === 'running')
      .reduce((total, log) => {
        const distanceInMeters = convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit);
        return total + (distanceInMeters * (parseInt(log.reps) || 0));
      }, 0);
  };

  // Calculate total distance for field events
  const calculateFieldEventTotal = (eventType) => {
    return trainingLogs
      .filter(log => log.eventType === eventType)
      .reduce((total, log) => {
        const distanceInMeters = convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit);
        return total + (distanceInMeters * (parseInt(log.reps) || 0));
      }, 0);
  };

  // Calculate total time for running events
  const calculateTotalTimeRan = () => {
    return trainingLogs
      .filter(log => log.eventType === 'running')
      .reduce((total, log) => {
        const timePerMark = parseFloat(log.marks.join(',').split(',').reduce((acc, mark) => acc + (parseFloat(mark) || 0), 0)) || 0;
        return total + (timePerMark * (parseInt(log.reps) || 0));
      }, 0);
  };

  const handleInputChange = (index, field, value) => {
    const newLogs = [...trainingLogs];
    newLogs[index][field] = value;

    if (field === 'reps') {
      const numReps = parseInt(value) || 0;
      newLogs[index].marks = Array(numReps).fill('');
    }

    setTrainingLogs(newLogs);
  };

  const handleMarkChange = (logIndex, markIndex, value) => {
    const newLogs = [...trainingLogs];
    newLogs[logIndex].marks[markIndex] = value;
    setTrainingLogs(newLogs);
  };

  const addAnotherEntry = () => {
    const newEntry = { 
      eventType: '', 
      subEvent: '', 
      reps: '', 
      marks: [''], 
      distance: '', 
      distanceUnit: 'meters', 
      sled: false, 
      hills: false, 
      grass: false, 
      spikes: false,
    };
    setTrainingLogs([...trainingLogs, newEntry]);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    const formattedDate = "2024-08-11"; // Example formatted date
    const trainingType = "Interval"; // Example training type
    const notes = "Training session went well."; // Example notes
    
      // Process training logs to calculate event details
      const EventDetails = trainingLogs.map(log => ({
        EventType: log.eventType,
        Event: log.eventType === 'running' 
          ? convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit)
          : log.subEvent,
        Reps: log.reps,
        Marks: log.marks.map(mark => ({ Mark: mark })),
        TotalDistance: log.eventType === 'running'
          ? log.reps * convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit)
          : log.marks.reduce((sum, mark) => sum + (parseFloat(mark) || 0), 0), // Sum of marks for field events
        ...(log.eventType === 'running' 
          ? { TotalTime: log.marks.reduce((sum, mark) => sum + (parseFloat(mark) || 0), 0) }
          : { TotalReps: log.reps }) // Add TotalReps only if not running
      }));
      
      console.log(trainingLogs);


  // General function to calculate total distance for a given event
  const calculateTotalDistance = (events, eventType) => 
    events
      .filter(detail => detail.Event === eventType)
      .reduce((total, detail) => total + (parseFloat(detail.TotalDistance) || 0), 0);

  // Calculate TotalDistanceRan
  const TotalDistanceRan = EventDetails
    .filter(detail => detail.EventType === 'running')
    .reduce((total, detail) => total + (parseFloat(detail.TotalDistance) || 0), 0);

    const TotalTimeRan = EventDetails
    .filter(detail => detail.EventType === 'running')  // Filter for running events
    .reduce((total, detail) => total + detail.TotalTime, 0); // Sum TotalTime for running events

  // Calculate TotalDistanceLongJumped
  const TotalDistanceLongJumped = calculateTotalDistance(EventDetails, 'long_jump');

  // Calculate TotalDistanceHighJumped
  const TotalDistanceHighJumped = calculateTotalDistance(EventDetails, 'high_jump');

  // Calculate TotalDistancePoleVaulted
  const TotalDistancePoleVaulted = calculateTotalDistance(EventDetails, 'pole_vault');

  // Calculate TotalDistanceShotPut
  const TotalDistanceShotPut = calculateTotalDistance(EventDetails, 'shot_put');

  // Calculate TotalDistanceDiscusThrown
  const TotalDistanceDiscusThrown = calculateTotalDistance(EventDetails, 'discus');

  // Calculate TotalDistanceJavelinThrown
  const TotalDistanceJavelinThrown = calculateTotalDistance(EventDetails, 'javelin');

  // Calculate TotalDistanceHammerThrown
  const TotalDistanceHammerThrown = calculateTotalDistance(EventDetails, 'hammer');

  // Calculate TotalDistanceTripleJumped
  const TotalDistanceTripleJumped = calculateTotalDistance(EventDetails, 'triple_jump');

    
  // Payload for training session details
  const trainingPayload = {
    AthleteID: 1,
    SessionDate: formattedDate,
    SessionType: trainingType,
    EventDetails: EventDetails,
    SpecialConditions: {
      Surface: trainingLogs[0]?.spikes ? 'Spikes' : 'No Spikes',
    },
    IntensityPercentage: 0, // Placeholder for intensity
    Notes: notes,
      // Total Distance for Each Event
      TotalDistanceHighJumped: TotalDistanceHighJumped,
      TotalDistanceLongJumped: TotalDistanceLongJumped,
      TotalDistancePoleVaulted: TotalDistancePoleVaulted,
      TotalDistanceShotPut: TotalDistanceShotPut,
      TotalDistanceDiscusThrown: TotalDistanceDiscusThrown,
      TotalDistanceJavelinThrown: TotalDistanceJavelinThrown,
      TotalDistanceHammerThrown: TotalDistanceHammerThrown,
      TotalDistanceTripleJumped: TotalDistanceTripleJumped,
      
  NumberOfLongJumps: trainingLogs
    .filter(log => log.subEvent === 'long_jump')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfHighJumps: trainingLogs
    .filter(log => log.subEvent === 'high_jump')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfPoleVaults: trainingLogs
    .filter(log => log.subEvent === 'pole_vault')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfShotPuts: trainingLogs
    .filter(log => log.subEvent === 'shot_put')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfDiscusThrows: trainingLogs
    .filter(log => log.subEvent === 'discus')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfJavelinThrows: trainingLogs
    .filter(log => log.subEvent === 'javelin')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfHammerThrows: trainingLogs
    .filter(log => log.subEvent === 'hammer')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

  NumberOfTripleJumps: trainingLogs
    .filter(log => log.subEvent === 'triple_jump')
    .reduce((total, log) => total + parseInt(log.reps, 10) || 0, 0),

    TotalDistanceRan: TotalDistanceRan,
    TotalTimeRan: TotalTimeRan,
  };

  // Payload for profile update with only TotalDistanceRan and TotalTimeRan
  const profileUpdatePayload = {
    AthleteID: 1,
    TotalDistanceRan: TotalDistanceRan,
    TotalTimeRan: TotalTimeRan,
  };

  // Submit training session details
  fetch('http://192.168.100.71:3000/api/training-sessions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trainingPayload),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Training session submitted successfully:', data);

    // Fetch the current profile to get existing values
    return fetch(`http://192.168.100.71:3000/api/athlete-profiles/${profileUpdatePayload.AthleteID}`)
      .then(response => response.json())
      .then(profileData => {
        // Calculate new totals
        const updatedProfilePayload = {
          AthleteID: profileUpdatePayload.AthleteID,
          TotalDistanceRan: (profileData.TotalDistanceRan || 0) + TotalDistanceRan,
          TotalTimeRan: (profileData.TotalTimeRan || 0) + TotalTimeRan,
        };

        // Update athlete profile with new totals
        return fetch(`http://192.168.100.71:3000/api/athlete-profiles/${updatedProfilePayload.AthleteID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProfilePayload),
        });
      });
  })
  .then(response => response.json())
  .then(data => {
    console.log('Athlete profile updated successfully:', data);
    // Handle success (e.g., navigate to another screen or show a success message)
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle error (e.g., show an error message)
  });
};
  
return (
  <View style={styles.container}>
    <Header title="Log Training Sessions" navigation={navigation} />

    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Date Selector */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Training Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {format(date, 'eeee, MMMM do, yyyy')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Training Type Selector */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Training Type</Text>
        <RNPickerSelect
          value={trainingType}
          onValueChange={(itemValue) => setTrainingType(itemValue)}
          items={[
            { label: 'Select Training Type', value: '' },
            { label: 'Speed', value: 'speed' },
            { label: 'Interval', value: 'interval' },
            { label: 'Tempo', value: 'tempo' },
            { label: 'Hill', value: 'hill' },
            { label: 'Long Run', value: 'long_run' },
            { label: 'Speed Endurance', value: 'speed_endurance' },
            { label: 'Block Work', value: 'block_work' },
            { label: 'Endurance', value: 'endurance' },
            { label: 'Recovery', value: 'recovery' },
            { label: 'Power', value: 'power' },
            { label: 'Other', value: 'other' },
          ]}
          style={pickerSelectStyles}
        />
      </View>

      {trainingLogs.map((log, index) => (
        <View key={index} style={styles.formGroup}>
          {/* Event Type Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Type</Text>
            <RNPickerSelect
              value={log.eventType}
              onValueChange={(itemValue) => handleInputChange(index, 'eventType', itemValue)}
              items={[
                { label: 'Select Event Type', value: '' },
                { label: 'Running', value: 'running' },
                { label: 'Field Event', value: 'field' },
              ]}
              style={pickerSelectStyles}
            />
          </View>

          {/* Conditional Sub-Event Selector for Field Events */}
          {log.eventType === 'field' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Field Event</Text>
                <RNPickerSelect
                  value={log.subEvent}
                  onValueChange={(itemValue) => handleInputChange(index, 'subEvent', itemValue)}
                  items={[
                    { label: 'Select Field Event', value: '' },
                    { label: 'Long Jump', value: 'long_jump' },
                    { label: 'High Jump', value: 'high_jump' },
                    { label: 'Pole Vault', value: 'pole_vault' },
                    { label: 'Shot Put', value: 'shot_put' },
                    { label: 'Discus', value: 'discus' },
                    { label: 'Javelin', value: 'javelin' },
                    { label: 'Triple Jump', value: 'triple_jump' },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>

              {/* Reps for Field Events */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>No. of Reps</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 5"
                  keyboardType="numeric"
                  value={log.reps}
                  onChangeText={(value) => handleInputChange(index, 'reps', value)}
                />
              </View>

              {/* Marks for Each Rep */}
              {Array.from({ length: log.reps }).map((_, repIndex) => (
                <View key={repIndex} style={styles.inputGroup}>
                  <Text style={styles.label}>Mark {repIndex + 1}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`Mark ${repIndex + 1}`}
                    value={log.marks[repIndex]}
                    onChangeText={(value) => handleMarkChange(index, repIndex, value)}
                  />
                </View>
              ))}
            </>
          )}

          {/* Conditional Distance Input for Running */}
          {log.eventType === 'running' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Distance</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 100"
                keyboardType="numeric"
                value={log.distance}
                onChangeText={(value) => handleInputChange(index, 'distance', value)}
              />
              <RNPickerSelect
                value={log.distanceUnit}
                onValueChange={(itemValue) => handleInputChange(index, 'distanceUnit', itemValue)}
                items={[
                  { label: 'Meters', value: 'meters' },
                  { label: 'Miles', value: 'miles' },
                ]}
                style={pickerSelectStyles}
              />
            </View>
          )}

          {/* Running-specific options */}
          {log.eventType === 'running' && (
            <>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Sled</Text>
                  <RNPickerSelect
                    value={log.sled ? 'yes' : 'no'}
                    onValueChange={(itemValue) => handleInputChange(index, 'sled', itemValue === 'yes')}
                    items={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hills</Text>
                  <RNPickerSelect
                    value={log.hills ? 'yes' : 'no'}
                    onValueChange={(itemValue) => handleInputChange(index, 'hills', itemValue === 'yes')}
                    items={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Grass</Text>
                  <RNPickerSelect
                    value={log.grass ? 'yes' : 'no'}
                    onValueChange={(itemValue) => handleInputChange(index, 'grass', itemValue === 'yes')}
                    items={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Spikes</Text>
                  <RNPickerSelect
                    value={log.spikes ? 'yes' : 'no'}
                    onValueChange={(itemValue) => handleInputChange(index, 'spikes', itemValue === 'yes')}
                    items={[
                      { label: 'No', value: 'no' },
                      { label: 'Yes', value: 'yes' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>No. of Reps</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 5"
                    keyboardType="numeric"
                    value={log.reps}
                    onChangeText={(value) => handleInputChange(index, 'reps', value)}
                  />
                </View>
              </View>

              {log.marks.map((mark, markIndex) => (
                <View key={markIndex} style={styles.inputGroup}>
                  <Text style={styles.label}>Mark {markIndex + 1}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`Mark ${markIndex + 1}`}
                    value={mark}
                    onChangeText={(value) => handleMarkChange(index, markIndex, value)}
                  />
                </View>
              ))}
            </>
          )}

          {/* Field Events Spikes Option */}
          {log.eventType === 'field' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Spikes</Text>
              <RNPickerSelect
                value={log.spikes ? 'yes' : 'no'}
                onValueChange={(itemValue) => handleInputChange(index, 'spikes', itemValue === 'yes')}
                items={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
                style={pickerSelectStyles}
              />
            </View>
          )}
        </View>
      ))}

      {/* Notes Section (One per session) */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]} // Make input taller for notes
          placeholder="Add any additional notes here..."
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={(value) => setNotes(value)}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addAnotherEntry}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Submit</Text>
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
  addButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
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

export default LogTraining;
