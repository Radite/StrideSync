// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark Background Color
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  logo: {
    width: 80,
    height: 80, // Adjust size as needed
  },
  logoText: {
    color: '#ffffff', // White Text Color
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold', // Replace with your font
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25, // Rounded corners
    marginTop: 10,
    width: '100%',
  },
  appleButton: {
    backgroundColor: '#ffffff', // Apple Sign-In Button Color
  },
  facebookButton: {
    backgroundColor: '#3b5998', // Facebook Button Color
  },
  googleButton: {
    backgroundColor: '#db4437', // Google Button Color
  },
  emailButton: {
    backgroundColor: '#4CAF50', // Email Button Color
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  appleButtonText: {
    color: '#000000', // Black Text for Apple Button
  },
  buttonText: {
    color: '#ffffff', // White Text for Other Buttons
    fontSize: 16,
    fontFamily: 'Montserrat-Bold', // Replace with your font
  },
  slogan: {
    color: '#ffffff', // White Text Color
    fontSize: 18, // Adjust size as needed
    fontFamily: 'Montserrat-Regular', // Replace with your font
    textAlign: 'center',
    marginTop: 0, // Space between slogan and buttons
  },
  input: {
    height: 50,
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular', // Replace with your font
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Default Button Color
    padding: 15,
    borderRadius: 25, // Rounded corners
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff', // White Text Color
    fontSize: 16,
    fontFamily: 'Montserrat-Bold', // Replace with your font
  },
  link: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default styles;
