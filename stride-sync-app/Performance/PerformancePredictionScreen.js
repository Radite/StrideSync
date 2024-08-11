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
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20, marginTop: 10 },
  section: { marginBottom: 30 },
  sectionTitle: { color: '#D0FD3E', fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 15 },
  picker: { height: 50, width: '100%', color: '#fff', backgroundColor: '#333', borderRadius: 5 },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: '#D0FD3E', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#000', fontSize: 16, fontFamily: 'Montserrat-SemiBold' },
  resultText: { marginTop: 15, color: '#fff', fontSize: 16, fontFamily: 'Montserrat-Regular' },
  windSpeedText: { color: '#fff', fontSize: 16, fontFamily: 'Montserrat-Regular', marginBottom: 10 },
  slider: { width: '100%', height: 40 },
  uploadSection: { marginTop: 10, marginBottom: 100 }, // Adds space above the upload button
  uploadButton: { backgroundColor: '#D0FD3E', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  uploadButtonText: { color: '#000', fontSize: 16, fontFamily: 'Montserrat-SemiBold' },
});

export default PerformancePredictionScreen;
