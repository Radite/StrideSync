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
    
    // Convert distances directly in the payload calculation
    const EventDetails = trainingLogs.map(log => ({
      EventType: log.eventType,
      Event: convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit),
      Reps: log.reps,
      Marks: log.marks.map(mark => ({ Mark: mark })),
      TotalDistance: log.reps * convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit),
      TotalTime: log.marks.reduce((sum, mark) => sum + parseFloat(mark) || 0, 0), // Sum of marks as numbers
    }));
    
    // Calculate TotalDistanceRan
    const TotalDistanceRan = EventDetails
      .filter(detail => detail.EventType === 'running')  // Adjust filter if needed for running events
      .reduce((total, detail) => total + detail.TotalDistance, 0);
    
    const TotalTimeRan = EventDetails
      .filter(detail => detail.EventType === 'running')  // Filter events with EventType 'running'
      .reduce((total, detail) => total + detail.TotalTime, 0); // Sum TotalTime for these events

    const payload = {
      AthleteID: 1,
      SessionDate: formattedDate,
      SessionType: trainingType,
      EventDetails: EventDetails,
      SpecialConditions: {
        Surface: trainingLogs[0]?.spikes ? 'Spikes' : 'No Spikes',
      },
      IntensityPercentage: 0, // Placeholder for intensity
      Notes: notes,
      TotalDistanceHighJumped: trainingLogs
        .filter(log => log.subEvent === 'high_jump')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceLongJumped: trainingLogs
        .filter(log => log.subEvent === 'long_jump')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistancePoleVaulted: trainingLogs
        .filter(log => log.subEvent === 'pole_vault')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceShotPut: trainingLogs
        .filter(log => log.subEvent === 'shot_put')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceDiscusThrown: trainingLogs
        .filter(log => log.subEvent === 'discus')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceJavelinThrown: trainingLogs
        .filter(log => log.subEvent === 'javelin')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceHammerThrown: trainingLogs
        .filter(log => log.subEvent === 'hammer')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceTripleJumped: trainingLogs
        .filter(log => log.subEvent === 'triple_jump')
        .reduce((total, log) => total + convertToMeters(parseFloat(log.distance) || 0, log.distanceUnit), 0),
      TotalDistanceRan: TotalDistanceRan,
      TotalTimeRan: TotalTimeRan,
      NumberOfLongJumps: trainingLogs.filter(log => log.subEvent === 'long_jump').length,
      NumberOfHighJumps: trainingLogs.filter(log => log.subEvent === 'high_jump').length,
      NumberOfPoleVaults: trainingLogs.filter(log => log.subEvent === 'pole_vault').length,
      NumberOfShotPuts: trainingLogs.filter(log => log.subEvent === 'shot_put').length,
      NumberOfDiscusThrows: trainingLogs.filter(log => log.subEvent === 'discus').length,
      NumberOfJavelinThrows: trainingLogs.filter(log => log.subEvent === 'javelin').length,
      NumberOfHammerThrows: trainingLogs.filter(log => log.subEvent === 'hammer').length,
      NumberOfTripleJumps: trainingLogs.filter(log => log.subEvent === 'triple_jump').length,
    };
    
    // Output the payload
    console.log(payload);
    
  
    fetch('http://192.168.100.71:3000/api/training-sessions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
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
              { label: 'Other', value: 'other'},
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

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Distance</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 10"
                    keyboardType="numeric"
                    value={log.distance}
                    onChangeText={(value) => handleInputChange(index, 'distance', value)}
                  />
                  <RNPickerSelect
                    value={log.distanceUnit}
                    onValueChange={(itemValue) => handleInputChange(index, 'distanceUnit', itemValue)}
                    items={[
                      { label: 'Meters', value: 'meters' },
                      { label: 'Feet', value: 'feet' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
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
