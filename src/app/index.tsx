import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { setZodCustomErrorMap } from '@/lib/zod';
// import { Redirect } from 'expo-router';

import colors from '@/constants/theme/colors';
// import useCheckForAppUpdate from '@/hooks/useCheckForAppUpdate';

setZodCustomErrorMap();

// Initial loading screen
export default function Index() {
  // @TODO - Ativar quando o app estiver publicado
  // const hasUpdate = useCheckForAppUpdate();

  // if (hasUpdate) {
  //   return <Redirect href="/update" />;
  // }

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
