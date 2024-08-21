import React from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import { format } from 'date-fns';
import EventCard from '../Components/Competition/EventCard';
import NotesSection from '../Components/Competition/NotesSection';
import DeleteButton from '../Components/DeleteButton';
import styles from '../Styles/CompetitionDetailScreenStyles'; // Import the styles

const CompetitionDetailScreen = ({ route, navigation }) => {
  const { competition } = route.params;
  const sessionId = competition.CompetitionID;

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
            <EventCard key={index} result={result} />
          ))}
        </View>

        <NotesSection notes={competition.Notes} />

        <DeleteButton onDelete={handleDelete} />
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

export default CompetitionDetailScreen;
