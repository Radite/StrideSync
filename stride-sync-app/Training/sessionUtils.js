// sessionUtils.js
import axios from 'axios';
import { Alert } from 'react-native';

const handleDelete = (sessionId, navigation) => {
  Alert.alert(
    "Confirm Delete",
    "Are you sure you want to delete this training session?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          axios.delete(`http://192.168.100.71:3000/api/training-sessions/${sessionId}`)
            .then(() => {
              navigation.navigate('TrainingLog');
            })
            .catch(error => {
              console.error('Error deleting session:', error);
              Alert.alert('Error', 'Failed to delete the session. Please try again.');
            });
        }
      }
    ]
  );
};

export default handleDelete;
