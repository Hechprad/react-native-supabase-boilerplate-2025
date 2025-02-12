import colors from '@/constants/theme/colors';
import shadows from '@/constants/theme/shadows';
import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const signUpStyles = StyleSheet.create({
  arrowBackIcon: {
    color: colors.palette.primary.softWhite,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.palette.primary.mintGreen,
    borderRadius: 8,
    color: colors.palette.primary.softWhite,
    marginBottom: 16,
    padding: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.palette.primary.mintGreen,
    borderRadius: 8,
    color: colors.palette.primary.softWhite,
    height: 48,
    marginBottom: 20,
    padding: 12,
    width: '100%',
  },
  buttonText: {
    color: colors.palette.primary.softWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.palette.primary.softWhite,
    flex: 1,
    paddingTop: 32,
  },
  disabledButton: {
    backgroundColor: colors.palette.lightGray,
  },
  form: {
    backgroundColor: colors.palette.primary.softWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    height: height - 260,
    padding: 16, // Hides bottom shadow (android)
    ...shadows.shadow1,
  },
  formItem: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 40,
    paddingLeft: 12,
    paddingRight: 12,
  },
  input: {
    backgroundColor: colors.palette.primary.softWhite,
    borderColor: colors.palette.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 48,
    padding: 12,
  },
  label: {
    color: colors.palette.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.palette.primary.softWhite,
    flex: 1,
  },
  slogan: {
    color: colors.palette.support.lilac,
    fontSize: 34,
  },
});

export default signUpStyles;
