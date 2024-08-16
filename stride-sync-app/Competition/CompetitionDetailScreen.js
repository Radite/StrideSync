import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format } from 'date-fns';
import Header from '../Header';
import Footer from '../Footer';

const CompetitionDetailScreen = ({ route }) => {
  const { competition } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Competition Details" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{competition.CompetitionName}</Text>
        <Text style={styles.date}>{format(new Date(competition.CompetitionDate), 'MMM dd, yyyy')}</Text>
        
        {competition.Notes ? (
          <Text style={styles.notes}>Notes: {competition.Notes}</Text>
        ) : null}
        
        <View style={styles.eventList}>
          {competition.EventResults.map((result, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{result.Event}</Text>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Position:</Text>
                <Text style={styles.eventValue}>{result.Position}</Text>
              </View>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>Mark:</Text>
                <Text style={styles.eventValue}>{result.Mark}</Text>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFC107',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#BBBBBB',
    marginBottom: 20,
  },
  notes: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  eventList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: '500',
    color: '#BBBBBB',
  },
  eventValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default CompetitionDetailScreen;
