import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the DateTimePicker
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns'; // Import date-fns for formatting dates

const LogTraining = () => {
  const [trainingLogs, setTrainingLogs] = useState([{ eventType: 'running', sets: '', reps: '', mark: '' }]);
  const [date, setDate] = useState(new Date()); // State for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide the date picker

  const handleInputChange = (index, field, value) => {
    const newLogs = [...trainingLogs];
    newLogs[index][field] = value;
    setTrainingLogs(newLogs);
  };

  const addAnotherEntry = () => {
    setTrainingLogs([...trainingLogs, { eventType: 'running', sets: '', reps: '', mark: '' }]);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log('Submitted Logs:', trainingLogs);
    console.log('Selected Date:', format(date, 'yyyy-MM-dd')); // Log the selected date in yyyy-MM-dd format
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

      {trainingLogs.map((log, index) => (
        <View key={index} style={styles.formGroup}>
          <View style={styles.row}>
            {/* Event Type Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Event Type</Text>
              <Picker
                selectedValue={log.eventType}
                style={styles.picker}
                onValueChange={(itemValue) => handleInputChange(index, 'eventType', itemValue)}
              >
                <Picker.Item label="Running" value="running" />
                <Picker.Item label="Long Jump" value="long_jump" />
                <Picker.Item label="High Jump" value="high_jump" />
                <Picker.Item label="Shot Put" value="shot_put" />
                <Picker.Item label="Discus" value="discus" />
                <Picker.Item label="Javelin" value="javelin" />
                <Picker.Item label="Pole Vault" value="pole_vault" />
              </Picker>
            </View>

            {/* Sets Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sets</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 3"
                keyboardType="numeric"
                value={log.sets}
                onChangeText={(value) => handleInputChange(index, 'sets', value)}
              />
            </View>

            {/* Reps Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reps</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 12"
                keyboardType="numeric"
                value={log.reps}
                onChangeText={(value) => handleInputChange(index, 'reps', value)}
              />
            </View>

            {/* Mark Input - Distance for field events, Time for running */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {log.eventType === 'running' ? 'Time (e.g., 12.34s)' : 'Distance (m)'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={log.eventType === 'running' ? 'e.g., 12.34' : 'e.g., 400'}
                keyboardType="numeric"
                value={log.mark}
                onChangeText={(value) => handleInputChange(index, 'mark', value)}
              />
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addAnotherEntry}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>
      <Button title="Save" onPress={handleSubmit} color="#00bfae" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    color: '#D0FD3E',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  datePickerContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333333',
  },
  label: {
    fontSize: 14,
    color: '#D0FD3E',
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
  picker: {
    height: 40,
    color: '#ffffff',
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#D0FD3E',
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

export default LogTraining;
