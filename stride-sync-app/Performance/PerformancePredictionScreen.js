import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Footer from '../Footer';
import Header from '../Header';
import * as DocumentPicker from 'expo-document-picker';
import Slider from '@react-native-community/slider';

const PerformancePredictionScreen = ({ navigation }) => {
  const [prediction, setPrediction] = useState('');
  const [event, setEvent] = useState('100m');
  const [targetPerformance, setTargetPerformance] = useState('');
  const [probability, setProbability] = useState('');
  const [windSpeed, setWindSpeed] = useState(0.0);
  const [inputMark, setInputMark] = useState('');
  const [adjustedPerformance, setAdjustedPerformance] = useState('');

  useEffect(() => {
    // Automatically load recent performance data from user information.
    const recentPerformance = '[Loaded Recent Data]'; 
    setPrediction(`Predicted performance based on recent data: ${recentPerformance}`);
  }, [event]);

  const calculateProbability = () => {
    // Replace with actual probability calculation logic
    setProbability(`Probability of achieving ${targetPerformance} in ${event}: 75%`);
  };

  const adjustForWind = () => {
    const adjustments = {
      '100m': { '0.0': 0, '2.0': -0.07 },
      '200m': { '0.0': 0, '2.0': -0.14 },
      '100mH': { '0.0': 0, '2.0': -0.15 },
      '110mH': { '0.0': 0, '2.0': -0.15 },
      'Long Jump': { '0.0': 0, '2.0': 0.06 },
      'Triple Jump': { '0.0': 0, '2.0': 0.10 },
    };

    const performance = parseFloat(inputMark);
    const adjustment = adjustments[event][windSpeed.toFixed(1)] || 0;

    setAdjustedPerformance(`Predicted performance with wind speed ${windSpeed.toFixed(1)} m/s: ${performance + adjustment}`);
  };

  const uploadVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      console.log(result.uri);
      alert('Video uploaded! AI feedback will be provided shortly.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Performance Prediction" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Event Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Selection</Text>
          <Picker
            selectedValue={event}
            style={styles.picker}
            onValueChange={(itemValue) => setEvent(itemValue)}
          >
            <Picker.Item label="100m" value="100m" />
            <Picker.Item label="200m" value="200m" />
            <Picker.Item label="100m Hurdles" value="100mH" />
            <Picker.Item label="110m Hurdles" value="110mH" />
            <Picker.Item label="Long Jump" value="Long Jump" />
            <Picker.Item label="Triple Jump" value="Triple Jump" />
          </Picker>
          {prediction && <Text style={styles.resultText}>{prediction}</Text>}
        </View>

        {/* Probability Calculation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Probability Calculation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter target performance (e.g., 10.00s)"
            value={targetPerformance}
            onChangeText={setTargetPerformance}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={calculateProbability}>
            <Text style={styles.buttonText}>Calculate Probability</Text>
          </TouchableOpacity>
          {probability && <Text style={styles.resultText}>{probability}</Text>}
        </View>

        {/* Wind Speed Adjustment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wind Speed Adjustment</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter distance/mark/time (e.g., 10.00s, 7.50m)"
            value={inputMark}
            onChangeText={setInputMark}
            keyboardType="numeric"
          />
          <Text style={styles.windSpeedText}>Wind Speed: {windSpeed.toFixed(1)} m/s</Text>
          <Slider
            style={styles.slider}
            minimumValue={-2.0}
            maximumValue={2.0}
            step={0.1}
            value={windSpeed}
            onValueChange={setWindSpeed}
            onSlidingComplete={adjustForWind}
          />
          {adjustedPerformance && <Text style={styles.resultText}>{adjustedPerformance}</Text>}
        </View>

        {/* Video Upload */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
            <Text style={styles.uploadButtonText}>Upload Video for AI Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer navigation={navigation} activeScreen="PerformancePrediction" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Matching background color
  },
  content: {
    paddingHorizontal: 10, // Reduced padding for consistency
    marginTop: 10,
    paddingBottom: 150, // Increased padding to match footer height
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFB74D', // Consistent title color
    fontSize: 22, // Larger font size to match other sections
    fontFamily: 'Montserrat-Bold',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#E0E0E0', // Consistent text color
    backgroundColor: '#1C1C1C', // Matching background color
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    backgroundColor: '#1C1C1C', // Consistent input background color
    color: '#E0E0E0', // Consistent input text color
    padding: 15,
    borderRadius: 12, // Matching border radius
    marginBottom: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FFB74D', // Consistent button color
    padding: 15,
    borderRadius: 12, // Matching border radius
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#F57C00',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#0A0A0A', // Consistent button text color
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  resultText: {
    marginTop: 15,
    color: '#E0E0E0', // Consistent result text color
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  windSpeedText: {
    color: '#E0E0E0', // Consistent wind speed text color
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  uploadSection: {
    marginTop: 10,
    marginBottom: 150, // Increased margin to match footer height
  },
  uploadButton: {
    backgroundColor: '#FFB74D', // Consistent upload button color
    padding: 15,
    borderRadius: 12, // Matching border radius
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#F57C00',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    color: '#0A0A0A', // Consistent upload button text color
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default PerformancePredictionScreen;
