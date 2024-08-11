import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import axios from 'axios'; // Import axios for HTTP requests

const logo = require('../assets/logo.png'); 

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({}); // To store error messages

  // Function to validate email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to validate password
  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Function to validate form fields
  const validateFields = () => {
    let isValid = true;
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!isValidPassword(password)) {
      errors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateFields()) return; // Exit if validation fails

    try {
      // Send data to your backend API
      const response = await axios.post('http://192.168.100.71:3000/api/users', {
        Username: username,
        Email: email,
        PasswordHash: password, // Ensure the password is hashed server-side
        Name: null,
        ProfilePicURL: null,
        DateOfBirth: null,
        Gender: null,
        Height: null,
        Weight: null,
        AppleID: null,
        FacebookID: null,
        GoogleID: null
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('SignIn'); // Navigate to sign-in screen after successful sign-up
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
      console.error('Sign Up Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>StrideSync</Text>
      </View>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        placeholderTextColor="#B0BEC5"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#B0BEC5"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#B0BEC5"
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#B0BEC5"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
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
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SignUpScreen;
