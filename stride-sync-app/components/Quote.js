import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/dashboardStyles';

const Quote = ({ dailyQuote }) => {
  return (
    <Text style={styles.quoteText}>{dailyQuote}</Text>
  );
};

export default Quote;
