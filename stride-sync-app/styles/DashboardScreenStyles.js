import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 150,
    marginTop: 10,
  },
  cardsScrollView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    width: width * 0.6,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
    height: 120,
    marginHorizontal: 5,
    marginVertical: 10,
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: RFValue(16),
    color: '#F0F0F0',
    fontFamily: 'Montserrat-SemiBold',
  },
  cardValue: {
    fontSize: RFValue(14),
    color: '#E0E0E0',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: RFValue(22),
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quoteText: {
    fontSize: RFValue(18),
    color: '#E0E0E0',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 15,
  },
  errorText: {
    color: '#E0E0E0',
    fontSize: RFValue(16),
    textAlign: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: RFValue(18),
    fontFamily: 'Montserrat-Bold',
    color: '#FFB74D',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: RFValue(16),
    color: '#E0E0E0',
  },
});

export default styles;
