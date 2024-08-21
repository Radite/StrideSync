import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 100,
      marginTop: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FFC107',
      marginBottom: 10,
    },
    date: {
      fontSize: 16,
      color: '#BBBBBB',
      marginBottom: 20,
    },
    notes: {
      fontSize: 16,
      color: '#FFFFFF',
      marginBottom: 20,
    },
    eventList: {
      backgroundColor: '#1E1E1E',
      borderRadius: 12,
      padding: 20,
    },
    eventCard: {
      backgroundColor: '#2A2A2A',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFC107',
      marginBottom: 10,
    },
    eventRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    eventLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: '#BBBBBB',
    },
    eventValue: {
      fontSize: 16,
      fontWeight: '500',
      color: '#FFFFFF',
    },
    deleteButtonContainer: {
      marginVertical: 20,
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#FF3B30', // Bright red background for delete button
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    isIndoor: {
      fontSize: 16,
      color: '#fff',
      marginVertical: 8,
    },
    section: {
      marginBottom: 25,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FFC107',
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#2A2A2A',
      paddingBottom: 8,
    },
    card: {
      backgroundColor: '#1E1E1E', // Use a slightly lighter background for cards
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderColor: '#2A2A2A', // Subtle border color
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      width: '100%', // Responsive width
      alignSelf: 'center', // Center horizontally
    },
    cardValue: {
      fontSize: 15,
      color: '#F5F5F5', // Slightly lighter text for contrast
      marginTop: 8,
    },
  });

export default styles;
