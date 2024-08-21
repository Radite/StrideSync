// src/components/EventForm.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { pickerSelectStyles } from '../../Styles/PickerSelectStyles';
import styles from '../../Styles/LogCompetitionScreenStyles';

const EventForm = ({ event, index, eventOptions, handleEventChange, handleDeleteEvent }) => (
  <View style={styles.formGroup}>
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
);

export default EventForm;
