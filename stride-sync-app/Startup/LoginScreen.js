import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const logo = require('../assets/logo.png');

const LoginScreen = ({ navigation }) => {
  const handleAppleSignIn = () => {
    console.log('Apple Sign-In');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook Sign-In');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  const handleEmailSignIn = () => {
    // Navigate to the Email Sign-In Screen
    navigation.navigate('EmailSignIn');
  };

  const openTermsOfUse = () => {
    navigation.navigate('WebViewScreen', { uri: require('../assets/terms-of-use.html') });
  };

  const openPrivacyPolicy = () => {
    navigation.navigate('WebViewScreen', { uri: require('../assets/privacy-policy.html') });
  };

  const logoSize = 100;
  const fontSize = logoSize * 0.3;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={[styles.logoText, { fontSize }]}>StrideSync</Text>
        </View>
        <Text style={styles.slogan}>Your Path to Peak Performance</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={handleAppleSignIn}>
          <Icon name="apple" size={20} color="#000000" style={styles.icon} />
          <Text style={[styles.buttonText, styles.appleButtonText]}>Sign In with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebookSignIn}>
          <Icon name="facebook" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.buttonText}>Sign In with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignIn}>
          <Icon name="google" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.emailButton]} onPress={handleEmailSignIn}>
          <Icon name="envelope" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.buttonText}>Sign In with Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing in, you agree to our{' '}
          <TouchableOpacity onPress={openTermsOfUse}>
            <Text style={styles.termsLink}>Terms of Use</Text>
          </TouchableOpacity>{' '}
          and{' '}
          <TouchableOpacity onPress={openPrivacyPolicy}>
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </TouchableOpacity>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: '#ffffff',
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
  slogan: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
  },
  appleButton: {
    backgroundColor: '#ffffff',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  emailButton: {
    backgroundColor: '#4CAF50',
  },
  icon: {
    marginRight: 10,
  },
  appleButtonText: {
    color: '#000000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  termsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  termsText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  termsLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
