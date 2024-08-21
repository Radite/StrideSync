import { StyleSheet, Dimensions } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingHorizontal: width * 0.02,  // Adjusted responsive horizontal padding
    paddingBottom: height * 0.12,    // Adjusted responsive bottom padding
    marginTop: height * 0.01,        // Adjusted responsive top margin
  },
  horizontalScroll: {
    marginBottom: height * 0.02,    // Adjusted responsive bottom margin
  },
  summaryCard: {
    backgroundColor: '#1C1C1C',
    padding: width * 0.04,          // Adjusted responsive padding
    borderRadius: width * 0.03,     // Adjusted responsive border radius
    marginRight: width * 0.02,      // Adjusted responsive margin
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    width: width * 0.8,              // Responsive width
    height: height * 0.15,            // Adjusted responsive height
  },
  summaryCardTitle: {
    fontSize: RFPercentage(2.2),     // Adjusted responsive font size
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
    marginBottom: height * 0.01,    // Adjusted responsive margin
  },
  summaryCardDistance: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
    marginBottom: height * 0.005,   // Adjusted responsive margin
  },
  summaryCardTime: {
    fontSize: RFPercentage(1.8),     // Adjusted responsive font size
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
  },
  summaryContainer: {
    paddingHorizontal: width * 0.03, // Adjusted responsive horizontal padding
    marginBottom: height * 0.02,     // Adjusted responsive bottom margin
    backgroundColor: '#1C1C1C',
    padding: width * 0.04,           // Adjusted responsive padding
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    marginTop: height * 0.01,        // Adjusted responsive top margin
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: RFPercentage(2.2),     // Adjusted responsive font size
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
    marginBottom: height * 0.01,    // Adjusted responsive margin
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,    // Adjusted responsive margin
  },
  summaryLabel: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#E0E0E0',
    fontFamily: 'Montserrat-Regular',
  },
  summaryValue: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#FFB74D',
    fontFamily: 'Montserrat-Bold',
  },
  filterContainer: {
    paddingHorizontal: width * 0.03, // Adjusted responsive horizontal padding
    marginBottom: height * 0.02,     // Adjusted responsive bottom margin
    marginTop: height * 0.01,        // Adjusted responsive top margin
  },
  filterLabel: {
    color: '#F0F0F0',
    marginBottom: height * 0.01,    // Adjusted responsive margin
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFPercentage(2),       // Adjusted responsive font size
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    padding: width * 0.03,           // Adjusted responsive padding
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    color: '#E0E0E0',
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    fontFamily: 'Montserrat-Regular',
  },
  arrow: {
    color: '#E0E0E0',
    fontSize: RFPercentage(2),       // Adjusted responsive font size
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,    // Adjusted responsive bottom margin
  },
  quickLink: {
    paddingVertical: height * 0.02, // Adjusted responsive vertical padding
    paddingHorizontal: width * 0.03, // Adjusted responsive horizontal padding
    backgroundColor: '#2C2C2C',
    borderRadius: width * 0.02,      // Adjusted responsive border radius
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
    fontSize: RFPercentage(1.8),     // Adjusted responsive font size
    fontFamily: 'Montserrat-Regular',
  },
  calendarContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    padding: width * 0.03,           // Adjusted responsive padding
    marginTop: height * 0.01,        // Adjusted responsive top margin
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
    padding: width * 0.03,           // Adjusted responsive padding
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    alignItems: 'center',
    marginTop: height * 0.02,        // Adjusted responsive top margin
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
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    fontFamily: 'Montserrat-Bold',
  },
  searchContainer: {
    paddingHorizontal: width * 0.03, // Adjusted responsive horizontal padding
    marginTop: height * 0.01,        // Adjusted responsive top margin
    marginBottom: height * 0.02,     // Adjusted responsive bottom margin
  },
  searchInput: {
    backgroundColor: '#1C1C1C',
    color: '#E0E0E0',
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    paddingHorizontal: width * 0.04, // Adjusted responsive horizontal padding
    height: height * 0.06,           // Adjusted responsive height
    fontSize: RFPercentage(2),       // Adjusted responsive font size
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
    marginBottom: height * 0.02,    // Adjusted responsive bottom margin
  },
  sectionTitle: {
    fontSize: RFPercentage(2.5),     // Adjusted responsive font size
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
  },
  logButton: {
    backgroundColor: '#FFB74D',
    borderRadius: width * 0.1,      // Adjusted responsive border radius
    width: width * 0.1,             // Adjusted responsive width
    height: width * 0.1,            // Adjusted responsive height
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  logButtonText: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#0A0A0A',
    fontFamily: 'Montserrat-Bold',
  },
  sessionContainer: {
    backgroundColor: '#1C1C1C',
    padding: width * 0.03,           // Adjusted responsive padding
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    marginBottom: height * 0.02,     // Adjusted responsive bottom margin
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionDate: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#FFB74D',
    marginBottom: height * 0.01,    // Adjusted responsive bottom margin
    fontFamily: 'Montserrat-SemiBold',
  },
  sessionDetail: {
    fontSize: RFPercentage(1.8),     // Adjusted responsive font size
    color: '#E0E0E0',
    marginBottom: height * 0.005,   // Adjusted responsive bottom margin
    fontFamily: 'Montserrat-Regular',
  },
  noResultsText: {
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: height * 0.02,       // Adjusted responsive top margin
    fontFamily: 'Montserrat-Regular',
  },
  aiButton: {
    position: 'absolute',
    bottom: height * 0.05,           // Adjusted responsive bottom margin
    left: width * 0.03,             // Adjusted responsive left margin
    right: width * 0.03,            // Adjusted responsive right margin
    backgroundColor: '#00bfae',
    paddingVertical: height * 0.02, // Adjusted responsive vertical padding
    borderRadius: width * 0.03,      // Adjusted responsive border radius
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: height * 0.02,    // Adjusted responsive bottom margin
  },
  aiButtonText: {
    fontSize: RFPercentage(2),       // Adjusted responsive font size
    color: '#0A0A0A',
    fontFamily: 'Montserrat-Bold',
  },
});

export default styles;
