import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../../Styles/TrainingLogScreenStyles'; 

const SearchInput = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search training sessions..."
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default SearchInput;
