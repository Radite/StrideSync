import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Modal, Button, Alert } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [privacyEnabled, setPrivacyEnabled] = React.useState(true);
  const [theme, setTheme] = React.useState('Dark'); // For Theme Selection
  const [showModal, setShowModal] = React.useState(false); // For Account Deletion Modal

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const togglePrivacy = () => setPrivacyEnabled(!privacyEnabled);

  const handleThemeChange = () => {
    setTheme(theme === 'Dark' ? 'Light' : 'Dark');
  };

  const handleAccountDeletion = () => {
    setShowModal(true);
  };

  const confirmAccountDeletion = () => {
    setShowModal(false);
    Alert.alert("Account Deleted", "Your account has been deleted.");
    // Add actual deletion logic here
  };

  const cancelAccountDeletion = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Account Settings</Text>
        {/* Add account settings options */}
        
        <Text style={styles.settingsTitle}>Notification Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>

        <Text style={styles.settingsTitle}>Privacy Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Private Profile</Text>
          <Switch value={privacyEnabled} onValueChange={togglePrivacy} />
        </View>

        <Text style={styles.settingsTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Theme</Text>
          <TouchableOpacity onPress={handleThemeChange}>
            <Text style={styles.settingText}>{theme} Mode</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.settingsTitle}>Change Password</Text>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionButtonText}>Change Password</Text>
        </TouchableOpacity>

        <Text style={styles.settingsTitle}>Language</Text>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('LanguageSelection')}>
          <Text style={styles.optionButtonText}>Select Language</Text>
        </TouchableOpacity>

        <Text style={styles.settingsTitle}>Privacy Policy & Terms</Text>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.optionButtonText}>View Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('TermsOfService')}>
          <Text style={styles.optionButtonText}>View Terms of Service</Text>
        </TouchableOpacity>

        <Text style={styles.settingsTitle}>Account Deletion</Text>
        <TouchableOpacity style={styles.optionButton} onPress={handleAccountDeletion}>
          <Text style={styles.optionButtonText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.submitButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Account Deletion Confirmation */}
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete your account? This action cannot be undone.</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={cancelAccountDeletion} />
              <Button title="Delete" onPress={confirmAccountDeletion} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark Background Color
  },
  settingsContainer: {
    padding: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    color: '#ffffff',
    fontSize: 16,
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
  optionButton: {
    marginBottom: 15,
  },
  optionButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default SettingsScreen;
