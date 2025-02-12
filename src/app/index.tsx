import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { setZodCustomErrorMap } from '@/lib/zod';

import colors from '@/constants/theme/colors';

setZodCustomErrorMap();

// Initial loading screen
export default function Index() {
  return (
    <View style={indexStyles.container}>
      <ActivityIndicator size={44} color={colors.palette.primary.mintGreen} />
    </View>
  );
}

const indexStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.palette.primary.softWhite,
    flex: 1,
    justifyContent: 'center',
  },
});
