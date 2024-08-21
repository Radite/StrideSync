import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const LogTrainingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: '5%', // Responsive padding
  },
  datePickerContainer: {
    marginBottom: 20,
    padding: '5%',
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
  },
  label: {
    fontSize: 14,
    color: '#FFB74D',
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  dateButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
    padding: '5%',
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Ensure vertical alignment
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#ffffff',
    backgroundColor: '#2A2A2A',
  },
  submitButton: {
    backgroundColor: '#FFB74D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 70,
    alignItems: 'center',
    width: width * 0.9, // Responsive width
    alignSelf: 'center', // Center horizontally
  },
  addButton: {
    backgroundColor: '#FFB74D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: width * 0.9, // Responsive width
    alignSelf: 'center', // Center horizontally
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  deleteButton: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    borderRadius: 15, // This makes the button circular
    backgroundColor: 'orange', // Fill color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10, 
    right: 10, 
  },
  deleteButtonText: {
    color: 'white', // Text color
    fontSize: 16, // Font size for "X"
    fontWeight: 'bold', // Make the "X" bold
  },
});

export default LogTrainingStyles;
