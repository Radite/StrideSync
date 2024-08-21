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
  { label: '200m', value: '200m' },
  { label: '400m', value: '400m' },
  { label: '800m', value: '800m' },
  { label: '1500m', value: '1500m' },
  { label: '3000m', value: '3000m' },
  { label: '5000m', value: '5000m' },
  { label: '10000m', value: '10000m' },
  { label: '100mH', value: '100mH' },
  { label: '110mH', value: '110mH' },
  { label: '3000m Steeplechase', value: '3000m Steeplechase' },
  { label: 'Half Marathon', value: 'Half Marathon' },
  { label: 'Marathon', value: 'Marathon' },
  { label: 'Long Jump', value: 'Long Jump' },
  { label: 'High Jump', value: 'High Jump' },
  { label: 'Pole Vault', value: 'Pole Vault' },
  { label: 'Shot Put', value: 'Shot Put' },
  { label: 'Discus', value: 'Discus' },
  { label: 'Javelin', value: 'Javelin' },
  { label: 'Hammer Throw', value: 'Hammer Throw' },
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
