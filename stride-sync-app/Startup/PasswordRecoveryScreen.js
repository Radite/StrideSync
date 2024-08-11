import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';

const logo = require('../assets/logo.png'); 

const PasswordRecoveryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>StrideSync</Text>
      </View>
      <Text style={styles.title}>Password Recovery</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#B0BEC5" />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Send Recovery Email')}>
        <Text style={styles.buttonText}>Send Recovery Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    backgroundColor: '#2C2C2C',
    color: '#ffffff',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  link: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'none',
    paddingVertical: 5,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
});

export default PasswordRecoveryScreen;
