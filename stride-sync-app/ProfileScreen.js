import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, Button } from 'react-native';
import Header from './Header'; // Adjust the import path as needed
import Footer from './Footer';
import DefaultProfilePic from './assets/Default_pfp.png'; // Adjust the import path as needed

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

  const handleLogout = () => {
    // Handle logout
    console.log('Logout');
  };

  const badges = [
    { id: '1', name: 'Marathon Runner', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Top Sprinter', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Strength Master', image: 'https://via.placeholder.com/100' },
    // Add more badges here
  ];

  const renderBadge = ({ item }) => (
    <View style={styles.badgeContainer}>
      <Image source={{ uri: item.image }} style={styles.badgeImage} />
      <Text style={styles.badgeText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" navigation={navigation} />
      <View style={styles.profileContainer}>
        <Image
          source={profilePic ? { uri: profilePic } : DefaultProfilePic}
          style={styles.profilePic}
        />
        <Button title="Upload Profile Picture" onPress={handleProfilePicUpload} color="#FFB74D" />
        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#E0E0E0"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#E0E0E0"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <Text style={styles.achievementsTitle}>Personal Records & Achievements</Text>
        <Text style={styles.achievement}>Fastest 5K Run: 25 minutes</Text>
        <Text style={styles.achievement}>Highest Bench Press: 150kg</Text>
        <Text style={styles.achievement}>Longest Distance Run in a Week: 100km</Text>
        <Text style={styles.achievement}>Most Pull-Ups in a Single Set: 20 reps</Text>
        <Text style={styles.achievement}>Highest Vertical Jump: 30 inches</Text>
        <Text style={styles.achievement}>Longest Plank Hold: 5 minutes</Text>
        <Text style={styles.achievement}>Fastest Marathon: 3 hours 30 minutes</Text>
        <Text style={styles.achievement}>Most Push-Ups in a Single Set: 50 reps</Text>
        <Text style={styles.achievement}>Longest Distance Swum in a Single Session: 2km</Text>
        <Text style={styles.achievement}>Fastest 100m Sprint: 11 seconds</Text>

        <Text style={styles.badgesTitle}>Badges</Text>
        <FlatList
          data={badges}
          renderItem={renderBadge}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.badgeRow}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Dark Background Color
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
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 15,
    color: '#E0E0E0',
    borderColor: '#333',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#FFB74D',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#F57C00',
    borderWidth: 1,
  },
  submitButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  achievementsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginTop: 20,
    marginBottom: 10,
  },
  achievement: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
  },
  badgesTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginTop: 20,
    marginBottom: 10,
  },
  badgeRow: {
    justifyContent: 'space-between',
    marginHorizontal: -5, // To handle spacing issue
  },
  badgeContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  badgeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  badgeText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  logoutButton: {
    backgroundColor: '#FFB74D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#F57C00',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default ProfileScreen;
