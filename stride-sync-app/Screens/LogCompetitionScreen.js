// src/screens/LogCompetitionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import Header from '../Header';
import Footer from '../Footer';
import CompetitionForm from '../Components/Competition/CompetitionForm';
import { fetchPersonalBests, saveCompetitionData } from '../Utils/competitionHelpers';
import styles from '../Styles/LogCompetitionScreenStyles';
import { startOfDay } from 'date-fns';

const eventOptions = [
  { label: '60m', value: '60m' },
  { label: '100m', value: '100m' },
  // ... other events
];

const LogCompetitionScreen = ({ navigation }) => {
  const [currentPBs, setCurrentPBs] = useState({});
  const today = startOfDay(new Date());

  useEffect(() => {
    const fetchPBs = async () => {
      const data = await fetchPersonalBests(1);
      if (data) {
        setCurrentPBs(data.PersonalBests);
      }
    };
    fetchPBs();
  }, []);

  const handleCompetitionSubmit = async (competitionData) => {
    const updatedPBs = { ...currentPBs };

    competitionData.EventResults.forEach(e => {
      const currentPB = parseFloat(updatedPBs[e.Event]) || Infinity;
      if (e.Mark < currentPB) {
        updatedPBs[e.Event] = e.Mark;
      }
    });

    const dataToSave = {
      ...competitionData,
      AthleteID: 1,
      UpdatedPersonalBests: updatedPBs,
    };

    const result = await saveCompetitionData(dataToSave);
    if (result && result.CompetitionID) {
      console.log('Success: Competition data saved successfully.', result);
      navigation.navigate('CompetitionLog');
    } else {
      Alert.alert('Error', 'Failed to save competition data.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Log Competition" navigation={navigation} />
      <CompetitionForm eventOptions={eventOptions} onSubmit={handleCompetitionSubmit} today={today} />
      <Footer navigation={navigation} />
    </View>
  );
};

export default LogCompetitionScreen;
