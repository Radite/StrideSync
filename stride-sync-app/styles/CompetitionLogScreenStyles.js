import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: width * 0.03,   // Responsive horizontal padding
    paddingBottom: height * 0.1,      // Responsive bottom padding
  },
  filterContainer: {
    paddingHorizontal: width * 0.03,  // Responsive horizontal padding
    marginBottom: height * 0.02,      // Responsive bottom margin
    marginTop: height * 0.01,         // Responsive top margin
  },
  filterLabel: {
    color: '#FFB74D',
    marginBottom: height * 0.01,      // Responsive margin
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFPercentage(2.2),      // Responsive font size
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    padding: width * 0.03,            // Responsive padding
    borderRadius: width * 0.03,       // Responsive border radius
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    color: '#E0E0E0',
    fontSize: RFPercentage(2),        // Responsive font size
    fontFamily: 'Montserrat-Regular',
  },
  arrow: {
    color: '#E0E0E0',
    fontSize: RFPercentage(2),        // Responsive font size
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,     // Responsive bottom margin
  },
  quickLink: {
    paddingVertical: height * 0.02,  // Responsive vertical padding
    paddingHorizontal: width * 0.03, // Responsive horizontal padding
    backgroundColor: '#2C2C2C',
    borderRadius: width * 0.02,      // Responsive border radius
    borderColor: '#444',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  quickLinkText: {
    color: '#E0E0E0',
    fontSize: RFPercentage(1.8),     // Responsive font size
    fontFamily: 'Montserrat-Regular',
  },
  calendarContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: width * 0.03,      // Responsive border radius
    padding: width * 0.03,           // Responsive padding
    marginTop: height * 0.01,        // Responsive top margin
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  doneButton: {
    backgroundColor: '#FFB74D',
    padding: width * 0.03,           // Responsive padding
    borderRadius: width * 0.03,      // Responsive border radius
    alignItems: 'center',
    marginTop: height * 0.02,        // Responsive top margin
    borderColor: '#F57C00',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#0A0A0A',
    fontSize: RFPercentage(2),        // Responsive font size
    fontFamily: 'Montserrat-Bold',
  },
  searchContainer: {
    paddingHorizontal: width * 0.03, // Responsive horizontal padding
    marginBottom: height * 0.02,     // Responsive bottom margin
  },
  searchInput: {
    backgroundColor: '#1C1C1C',
    color: '#E0E0E0',
    borderRadius: width * 0.03,      // Responsive border radius
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
    height: height * 0.06,           // Responsive height
    fontSize: RFPercentage(2),        // Responsive font size
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.03,  // Responsive horizontal margin
    marginBottom: height * 0.02,     // Responsive bottom margin
  },
  sectionTitle: {
    color: '#FFB74D',
    fontSize: RFPercentage(2.5),     // Responsive font size
    fontFamily: 'Montserrat-SemiBold',
  },
  logButton: {
    backgroundColor: '#FFB74D',
    width: width * 0.1,             // Responsive width
    height: width * 0.1,            // Responsive height
    borderRadius: width * 0.05,     // Responsive border radius
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  logButtonText: {
    color: '#0A0A0A',
    fontSize: RFPercentage(2.5),     // Responsive font size
    fontFamily: 'Montserrat-Bold',
  },
  sessionContainer: {
    backgroundColor: '#1C1C1C',
    padding: width * 0.03,           // Responsive padding
    borderRadius: width * 0.03,      // Responsive border radius
    marginBottom: height * 0.02,     // Responsive bottom margin
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionDate: {
    fontSize: RFPercentage(2),        // Responsive font size
    color: '#FFB74D',
    marginBottom: height * 0.01,     // Responsive bottom margin
    fontFamily: 'Montserrat-SemiBold',
  },
  sessionDetail: {
    fontSize: RFPercentage(1.8),      // Responsive font size
    color: '#E0E0E0',
    marginBottom: height * 0.005,    // Responsive bottom margin
    fontFamily: 'Montserrat-Regular',
  },
  resultContainer: {
    marginVertical: height * 0.01,   // Responsive vertical margin
  },
  event: {
    fontSize: RFPercentage(2),        // Responsive font size
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  position: {
    fontSize: RFPercentage(2),        // Responsive font size
    color: '#E0E0E0',
  },
  time: {
    fontSize: RFPercentage(2),        // Responsive font size
    color: '#E0E0E0',
  },
  noDataText: {
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: height * 0.02,        // Responsive top margin
    fontFamily: 'Montserrat-Regular',
    fontSize: RFPercentage(2),       // Responsive font size
  },
  activeFilter: {
    backgroundColor: '#FFB74D',
  },
});

export default styles;
