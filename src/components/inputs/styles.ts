import colors from '@/constants/theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  errorBorder: {
    borderColor: colors.palette.support.softRed,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  errorMessage: {
    color: colors.palette.support.mutedRed,
    fontSize: 12,
  },
  formItem: {
    alignItems: 'center',
    backgroundColor: colors.palette.primary.softWhite,
    borderColor: colors.palette.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 4,
    overflow: 'hidden',
    paddingRight: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 48,
    includeFontPadding: false,
    paddingLeft: 12,
  },
  label: {
    color: colors.palette.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
