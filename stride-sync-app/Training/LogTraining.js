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

  const validateFields = () => {
    // Check if training type is selected
    if (!trainingType) {
      alert('Please select a Training Type.');
      return false;
    }
  
    // Check if each event has a valid type and reps/distance if required
    for (const log of trainingLogs) {
      if (!log.eventType) {
        alert('Please select an Event Type for each entry.');
        return false;
      }
  
      if (log.eventType === 'running') {
        if (!log.distance) {
          alert('Distance cannot be empty for running events.');
          return false;
        }
      }
  
      if ((log.eventType === 'field' || log.eventType === 'running') && !log.reps) {
        alert('Number of Reps cannot be empty for field and running events.');
        return false;
      }
  
      // Check if marks are filled for each rep
      if (log.reps && log.marks.length < log.reps) {
        alert('Please fill in all marks.');
        return false;
      }
      
      // Validate each mark input
      for (const mark of log.marks) {
        if (!mark) {
          alert('Marks cannot be empty.');
          return false;
        }
      }
    }
  
    return true;
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
    const updatedLogs = [...trainingLogs];
    if (!updatedLogs[logIndex].marks) {
      updatedLogs[logIndex].marks = [];
    }
    updatedLogs[logIndex].marks[markIndex] = value;
    setTrainingLogs(updatedLogs);
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
    if (validateFields()) {

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
    : { TotalReps: log.reps }), // Add TotalReps only if not running
    sled: log.sled || false,  // Default to false if not set
    grass: log.grass || false,  // Default to false if not set
    spikes: log.spikes || false,  // Default to false if not set
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

  // General function to calculate the total number of repetitions for a given sub-event
  const calculateTotalReps = (logs, subEventType) => 
    logs
      .filter(log => log.subEvent === subEventType)
      .reduce((total, log) => total + (parseInt(log.reps, 10) || 0), 0);

  // Calculate the number of different events
  const NumberOfLongJumps = calculateTotalReps(trainingLogs, 'long_jump');
  const NumberOfHighJumps = calculateTotalReps(trainingLogs, 'high_jump');
  const NumberOfPoleVaults = calculateTotalReps(trainingLogs, 'pole_vault');
  const NumberOfShotPuts = calculateTotalReps(trainingLogs, 'shot_put');
  const NumberOfDiscusThrows = calculateTotalReps(trainingLogs, 'discus');
  const NumberOfJavelinThrows = calculateTotalReps(trainingLogs, 'javelin');
  const NumberOfHammerThrows = calculateTotalReps(trainingLogs, 'hammer');
  const NumberOfTripleJumps = calculateTotalReps(trainingLogs, 'triple_jump');
    
  // Payload for training session details
  const trainingPayload = {
    AthleteID: 1,
    SessionDate: formattedDate,
    SessionType: trainingType,
    EventDetails: EventDetails,
    IntensityPercentage: 80, // Placeholder for intensity
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
      NumberOfLongJumps: NumberOfLongJumps,
      NumberOfHighJumps: NumberOfHighJumps,
      NumberOfPoleVaults: NumberOfPoleVaults,
      NumberOfShotPuts: NumberOfShotPuts,
      NumberOfDiscusThrows: NumberOfDiscusThrows,
      NumberOfJavelinThrows: NumberOfJavelinThrows,
      NumberOfHammerThrows: NumberOfHammerThrows,
      NumberOfTripleJumps: NumberOfTripleJumps,
      
    TotalDistanceRan: TotalDistanceRan,
    TotalTimeRan: TotalTimeRan,
  };

// Payload for profile update
const profileUpdatePayload = {
  AthleteID: 1, // Use profileUpdatePayload.AthleteID for consistency
  TotalDistanceRan: TotalDistanceRan,
  TotalTimeRan: TotalTimeRan,
  TotalDistanceHighJumped: TotalDistanceHighJumped,
  TotalDistanceLongJumped: TotalDistanceLongJumped,
  TotalDistancePoleVaulted: TotalDistancePoleVaulted,
  TotalDistanceShotPut: TotalDistanceShotPut,
  TotalDistanceDiscusThrown: TotalDistanceDiscusThrown,
  TotalDistanceJavelinThrown: TotalDistanceJavelinThrown,
  TotalDistanceHammerThrown: TotalDistanceHammerThrown,
  TotalDistanceTripleJumped: TotalDistanceTripleJumped,
  TotalTimesLongJumped: NumberOfLongJumps,
  TotalTimesHighJumped: NumberOfHighJumps,
  TotalTimesPoleVaulted: NumberOfPoleVaults,
  TotalTimesShotPut: NumberOfShotPuts,
  TotalTimesDiscusThrown: NumberOfDiscusThrows,
  TotalTimesJavelinThrown: NumberOfJavelinThrows,
  TotalTimesHammerThrown: NumberOfHammerThrows,
  TotalTimesTripleJumped: NumberOfTripleJumps,
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
          TotalDistanceHighJumped: (profileData.TotalDistanceHighJumped || 0) + TotalDistanceHighJumped,
          TotalDistanceLongJumped: (profileData.TotalDistanceLongJumped || 0) + TotalDistanceLongJumped,
          TotalDistancePoleVaulted: (profileData.TotalDistancePoleVaulted || 0) + TotalDistancePoleVaulted,
          TotalDistanceShotPut: (profileData.TotalDistanceShotPut || 0) + TotalDistanceShotPut,
          TotalDistanceDiscusThrown: (profileData.TotalDistanceDiscusThrown || 0) + TotalDistanceDiscusThrown,
          TotalDistanceJavelinThrown: (profileData.TotalDistanceJavelinThrown || 0) + TotalDistanceJavelinThrown,
          TotalDistanceHammerThrown: (profileData.TotalDistanceHammerThrown || 0) + TotalDistanceHammerThrown,
          TotalDistanceTripleJumped: (profileData.TotalDistanceTripleJumped || 0) + TotalDistanceTripleJumped,
          TotalTimesLongJumped: (profileData.TotalTimesLongJumped || 0) + NumberOfLongJumps,
          TotalTimesHighJumped: (profileData.TotalTimesHighJumped || 0) + NumberOfHighJumps,
          TotalTimesPoleVaulted: (profileData.TotalTimesPoleVaulted || 0) + NumberOfPoleVaults,
          TotalTimesShotPut: (profileData.TotalTimesShotPut || 0) + NumberOfShotPuts,
          TotalTimesDiscusThrown: (profileData.TotalTimesDiscusThrown || 0) + NumberOfDiscusThrows,
          TotalTimesJavelinThrown: (profileData.TotalTimesJavelinThrown || 0) + NumberOfJavelinThrows,
          TotalTimesHammerThrown: (profileData.TotalTimesHammerThrown || 0) + NumberOfHammerThrows,
          TotalTimesTripleJumped: (profileData.TotalTimesTripleJumped || 0) + NumberOfTripleJumps,
          UpdatedAt: new Date().toISOString()
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
  .catch(error => {
    console.error('Error:', error);
    // Handle error (e.g., show an error message)
  });

}};
  // Function to handle deletion
const removeEntry = (index) => {
  setTrainingLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
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
          placeholder={{ label: 'Select Training Type', value: '' }}
          style={pickerSelectStyles}
        />
      </View>

      {trainingLogs.map((log, index) => (
        <View key={index} style={styles.formGroup}>
          {/* Event Type Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Type</Text>
            <RNPickerSelect
              value={log.eventType || ''}
              onValueChange={(itemValue) => handleInputChange(index, 'eventType', itemValue)}
              items={[
                { label: 'Running', value: 'running' },
                { label: 'Field Event', value: 'field' },
              ]}
              placeholder={{ label: 'Select Event Type', value: '' }}
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
                    { label: 'Long Jump', value: 'long_jump' },
                    { label: 'High Jump', value: 'high_jump' },
                    { label: 'Pole Vault', value: 'pole_vault' },
                    { label: 'Shot Put', value: 'shot_put' },
                    { label: 'Discus', value: 'discus' },
                    { label: 'Javelin', value: 'javelin' },
                    { label: 'Triple Jump', value: 'triple_jump' },
                  ]}
                  placeholder={{ label: 'Select Field Event', value: '' }}
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
              {log.reps && Array.from({ length: log.reps }).map((_, repIndex) => (
  <View key={repIndex} style={styles.inputGroup}>
    <Text style={styles.label}>Mark {repIndex + 1}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Mark ${repIndex + 1}`}
      value={log.marks[repIndex] || ''}
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

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeEntry(index)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    marginTop:5,
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
  submitButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 70,
    alignItems: 'center',
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
