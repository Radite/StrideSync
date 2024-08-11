import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState(null); // Placeholder for profile picture
  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');

  const handleProfilePicUpload = () => {
    // Handle profile picture upload
    console.log('Upload profile picture');
  };

  const handleSave = () => {
    // Handle save profile information
    console.log('Save profile information');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.profilePicPlaceholder}>
            <Text style={styles.profilePicText}>Upload Photo</Text>
          </View>
        )}
        <Button title="Upload Profile Picture" onPress={handleProfilePicUpload} />
        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#ffffff"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#ffffff"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save Changes</Text>
        </TouchableOpacity>
        
        <Text style={styles.achievementsTitle}>Personal Records & Achievements</Text>
        {/* Replace with actual records and achievements */}
        <Text style={styles.achievement}>Fastest 5K Run: 25 minutes</Text>
        <Text style={styles.achievement}>Highest Lifting Record: 150kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark Background Color
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicText: {
    color: '#ffffff',
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginBottom: 15,
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  achievementsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  achievement: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default ProfileScreen;
