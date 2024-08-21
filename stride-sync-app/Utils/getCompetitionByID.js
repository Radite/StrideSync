// Utils/getCompetitionByID.js
import { Alert } from 'react-native';

export const getCompetitionByID = async (competitionId, navigation) => {
  try {
    const response = await fetch(`http://192.168.100.71:3000/api/competitions/${competitionId}`);
    const competitionDetails = await response.json();
    navigation.navigate('CompetitionDetails', { competition: competitionDetails });
  } catch (error) {
    console.error('Error fetching competition details:', error);
    Alert.alert('Error', 'Failed to fetch competition details.');
  }
};
