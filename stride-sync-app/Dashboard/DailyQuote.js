import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import styles from '../styles/DashboardScreenStyles';

// Sample motivational quotes
const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The harder you work for something, the greater you'll feel when you achieve it."
];

const getDailyQuote = () => {
  const dayOfYear = moment().dayOfYear();
  return quotes[dayOfYear % quotes.length];
};

const DailyQuote = () => {
  const dailyQuote = getDailyQuote();
  return <Text style={styles.quoteText}>{dailyQuote}</Text>;
};

export default DailyQuote;
