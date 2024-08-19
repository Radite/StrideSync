import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { format } from 'date-fns';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';  // Import axios for HTTP requests

// Function to get the ordinal suffix
const getOrdinal = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
};

// Function to determine the mark unit
const getMarkUnit = (eventName) => {
  if (eventName.endsWith('m') || eventName.includes('steeplechase') || eventName.includes('marathon')) {
    return 's'; // Seconds for running events
  }
  return 'm'; // Meters for other events
};

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const CompetitionDetailScreen = ({ route, navigation }) => {
  const { competition } = route.params;
  const sessionId = competition.CompetitionID;  // Extract session ID from competition

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this competition?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios.delete(`http://192.168.100.71:3000/api/competitions/${sessionId}`)
              .then(() => {
                navigation.navigate('TrainingLog');
              })
              .catch(error => {
                console.error('Error deleting competition:', error);
                Alert.alert('Error', 'Failed to delete the competition. Please try again.');
              });
          }
        }
      ]
    );
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return 'Invalid time';
    }
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(2);
  
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.padStart(5, '0')}`;
    } else if (minutes > 0) {
      return `${minutes}:${secs.padStart(5, '0')}`;
    } else {
      return secs.padStart(5, '0');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Competition Details" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{competition.CompetitionName}</Text>
        <Text style={styles.date}>{format(new Date(competition.CompetitionDate), 'MMM dd, yyyy')}</Text>

        <Text style={styles.isIndoor}>
          {competition.IsIndoor ? 'Indoor Event' : 'Outdoor Event'}
        </Text>
        
        <View style={styles.eventList}>
          {competition.EventResults.map((result, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{result.Event}</Text>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Position:</Text>
                <Text style={styles.eventValue}>{getOrdinal(result.Position)}</Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Mark:</Text>
                <Text style={styles.eventValue}>
                  {formatTime(result.Mark, result.Event)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {competition.Notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.card}>
              <Text style={styles.cardValue}>{competition.Notes}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Competition</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingHorizontal: width * 0.05, // 5% of screen width
    paddingBottom: height * 0.1, // 10% of screen height
    marginTop: 10,
  },
  title: {
    fontSize: width * 0.055, // Responsive font size
    fontWeight: '700',
    color: '#FFC107',
    marginBottom: 10,
  },
  date: {
    fontSize: width * 0.04,
    color: '#BBBBBB',
    marginBottom: 20,
  },
  isIndoor: {
    fontSize: width * 0.04,
    color: '#fff',
    marginVertical: 8,
  },
  eventList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: width * 0.05,
  },
  eventCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: width * 0.04,
  },
  eventTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#FFC107',
    marginBottom: 10,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventLabel: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#BBBBBB',
  },
  eventValue: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  deleteButtonContainer: {
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.07,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  section: {
    marginBottom: height * 0.03,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#FFC107',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 8,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: width * 0.04,
    borderColor: '#2A2A2A',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
  },
  cardValue: {
    fontSize: width * 0.04,
    color: '#F5F5F5',
    marginTop: 8,
  },
});

export default CompetitionDetailScreen;
