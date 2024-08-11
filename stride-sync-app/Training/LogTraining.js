import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { format } from 'date-fns';

const LogTraining = () => {
  const [trainingType, setTrainingType] = useState('');
  const [trainingLogs, setTrainingLogs] = useState([
    { 
      eventType: '', 
      subEvent: '', 
      reps: '', 
      marks: [''], 
      distanceUnit: 'meters', 
      sled: false, 
      hills: false, 
      grass: false, 
      spikes: false 
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      distanceUnit: 'meters', 
      sled: false, 
      hills: false, 
      grass: false, 
      spikes: false 
    };
    setTrainingLogs([...trainingLogs, newEntry]);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    console.log('Training Type:', trainingType);
    console.log('Submitted Logs:', trainingLogs);
    console.log('Selected Date:', format(date, 'yyyy-MM-dd'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Log Training Sessions</Text>

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
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addAnotherEntry}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    color: '#FFB74D',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
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
