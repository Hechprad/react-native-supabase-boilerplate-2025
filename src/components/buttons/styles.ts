import { StyleSheet, ViewStyle } from 'react-native';
import colors from '@/constants/theme/colors';

const defaultStyle: ViewStyle = {
  height: 48,
  alignItems: 'center',
  borderRadius: 8,
  padding: 12,
  marginBottom: 20,
  width: '100%',
};

export const buttonStyles = StyleSheet.create({
  action: {
    ...defaultStyle,
    backgroundColor: colors.palette.primary.mintGreen,
  },
  actionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  backButtonDisabled: {
    alignSelf: 'flex-start',
    backgroundColor: colors.palette.primary.lightGray,
    borderRadius: 8,
    color: colors.palette.primary.softWhite,
    marginBottom: 16,
    padding: 12,
  },
  disabled: {
    ...defaultStyle,
    backgroundColor: colors.palette.primary.lightGray,
  },
});
