import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../Styles/TrainingSessionDetailsStyles'; 

const DeleteButton = ({ onDelete }) => (
  <View style={styles.deleteButtonContainer}>
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteButtonText}>Delete Session</Text>
    </TouchableOpacity>
  </View>
);

export default DeleteButton;
