import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingHorizontal: '5%',
    paddingBottom: 20,
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderColor: '#2A2A2A',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BBBBBB',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
  eventList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
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
  errorText: {
    color: '#F5F5F5',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderColor: '#2A2A2A',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  cardValue: {
    fontSize: 15,
    color: '#F5F5F5',
    marginTop: 8,
  },
  deleteButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
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
});

export default styles;
