import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
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
  const [initialWindSpeed, setInitialWindSpeed] = useState('');
  const [adjustedPerformance, setAdjustedPerformance] = useState('');

  useEffect(() => {
    const recentPerformance = '[Loaded Recent Data]';
    setPrediction(`Predicted performance based on recent data: ${recentPerformance}`);
  }, [event]);

  const calculateProbability = () => {
    setProbability(`Probability of achieving ${targetPerformance} in ${event}: 75%`);
  };

  const adjustForWind = (event, inputMark, initialWindSpeed, desiredWindSpeed) => {
    const windEffect = {
      '100m': { a: -0.0449, b: -0.0042, cp: 0.009459, default: 9.58 },
      '200m': { a: 0.090, b: -0.010, default: 19.19 },
      '100mH': { a: 0.093, b: -0.010, default: 12.20 },
      '110mH': { a: 0.093, b: -0.010, default: 12.80 },
      'Long Jump': { a: -0.029, b: 0, default: 8.95 },
      'Triple Jump': { a: -0.069, b: -0.009, default: 18.29 }
    };

    if (event in windEffect) {
      const { a, b, cp = 0, default: defaultPerformance } = windEffect[event];
      
      // Parse the inputs
      const basePerformance = parseFloat(inputMark) || defaultPerformance;
      const initialWind = parseFloat(initialWindSpeed) || 0;

      const correction = (performance, wind) => {
        return (a + cp * performance) * wind + b * Math.pow(wind, 2);
      };

      const initialCorrection = correction(basePerformance, initialWind);
      const desiredCorrection = correction(basePerformance, desiredWindSpeed);

      const adjustedPerformance = basePerformance + desiredCorrection - initialCorrection;
      return `Predicted performance with wind speed ${desiredWindSpeed.toFixed(1)} m/s: ${adjustedPerformance.toFixed(2)}`;
    } else {
      return `Wind speed does not significantly affect performance for ${event}.`;
    }
  };

  const handleWindSpeedChange = (value) => {
    setWindSpeed(value);
    const result = adjustForWind(event, inputMark, initialWindSpeed, value);
    setAdjustedPerformance(result);
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
          <Text style={styles.sectionTitle}>Select Your Event</Text>
          <RNPickerSelect
            value={event}
            onValueChange={(itemValue) => setEvent(itemValue)}
            items={[
              { label: '100m', value: '100m' },
              { label: '200m', value: '200m' },
              { label: '400m', value: '400m' },
              { label: '800m', value: '800m' },
              { label: '1500m', value: '1500m' },
              { label: '5000m', value: '5000m' },
              { label: '3000m Steeplechase', value: '3000m Steeplechase' },
              { label: 'Marathon', value: 'Marathon' },
              { label: '100m Hurdles', value: '100mH' },
              { label: '110m Hurdles', value: '110mH' },
              { label: 'Long Jump', value: 'Long Jump' },
              { label: 'Triple Jump', value: 'Triple Jump' },
              { label: 'Pole Vault', value: 'Pole Vault' },
              { label: 'High Jump', value: 'High Jump' },
              { label: 'Shot Put', value: 'Shot Put' },
              { label: 'Discus', value: 'Discus' },
              { label: 'Javelin', value: 'Javelin' },
              { label: 'Hammer Throw', value: 'Hammer Throw' },
            ]}
            placeholder={{ label: 'Select an event', value: '' }}
            style={pickerSelectStyles}
          />
        </View>

        {/* Performance Prediction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Predicted Performance</Text>
          {prediction && <Text style={styles.resultText}>{prediction}</Text>}
        </View>

        {/* Probability Calculation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculate Probability</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter target performance (e.g., 10.00s)"
            value={targetPerformance}
            onChangeText={setTargetPerformance}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={calculateProbability}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          {probability && <Text style={styles.resultText}>{probability}</Text>}
        </View>

        {/* Wind Speed Adjustment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adjust for Wind Speed</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter distance/mark/time (e.g., 10.00s, 7.50m)"
            value={inputMark}
            onChangeText={setInputMark}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter wind speed during performance (e.g., -1.6)"
            value={initialWindSpeed}
            onChangeText={setInitialWindSpeed}
            keyboardType="numeric"
          />
          <Text style={styles.windSpeedText}>Desired Wind Speed: {windSpeed.toFixed(1)} m/s</Text>
          <Slider
            style={styles.slider}
            minimumValue={-2.0}
            maximumValue={2.0}
            step={0.1}
            value={windSpeed}
            onValueChange={handleWindSpeedChange}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
  },
  inputAndroid: {
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 150,
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFB74D',
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#E0E0E0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#FFB74D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#F57C00',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  resultText: {
    color: '#BDBDBD',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  windSpeedText: {
    color: '#FFB74D',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  uploadSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  uploadButton: {
    backgroundColor: '#FF8A65',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});

export default PerformancePredictionScreen;
