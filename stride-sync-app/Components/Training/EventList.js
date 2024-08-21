import React from 'react';
import { View, Text } from 'react-native';
import { formatTime } from '../../Utils/formatTime'; // Utility function for formatting time
import styles from '../../Styles/TrainingSessionDetailsStyles'; 

const EventList = ({ events }) => (
  <View style={styles.eventList}>
    <Text style={styles.sectionTitle}>Event Details</Text>
    {events.map((event, index) => (
      <View key={index} style={styles.eventCard}>
        <Text style={styles.eventTitle}>
          Event: {event.Event} {event.EventType === 'running' ? 'meters' : ''}
        </Text>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Reps:</Text>
          <Text style={styles.eventValue}>{event.Reps}</Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Marks:</Text>
          <Text style={styles.eventValue}>
            {event.Marks.map(mark => formatTime(parseFloat(mark.Mark))).join(', ')}
          </Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Total Distance:</Text>
          <Text style={styles.eventValue}>{parseFloat(event.TotalDistance).toFixed(2)}m</Text>
        </View>
        {event.EventType === 'running' && (
          <View style={styles.eventRow}>
            <Text style={styles.eventLabel}>Total Time:</Text>
            <Text style={styles.eventValue}>{formatTime(parseFloat(event.TotalTime))}</Text>
          </View>
        )}
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Grass:</Text>
          <Text style={styles.eventValue}>{event.grass ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Spikes:</Text>
          <Text style={styles.eventValue}>{event.spikes ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.eventRow}>
          <Text style={styles.eventLabel}>Sled:</Text>
          <Text style={styles.eventValue}>{event.sled ? 'Yes' : 'No'}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default EventList;
