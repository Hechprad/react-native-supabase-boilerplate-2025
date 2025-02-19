import Constants from 'expo-constants';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from '@/constants/theme/colors';
import { ActionButton } from '@/components/buttons';

// Update App version screen
export default function Update() {
  const { t } = useTranslation();

  async function updateAsync() {
    const androidPackageName = Constants.expoConfig?.android?.package;
    const iosAppId = Constants.expoConfig?.ios?.bundleIdentifier;

    if (Platform.OS === 'android' && androidPackageName) {
      const playStoreUrl = `https://play.google.com/store/apps/details?id=${androidPackageName}`;
      Linking.openURL(playStoreUrl).catch((err) =>
        console.error('Erro ao abrir a Play Store:', err),
      );
    }

    if (Platform.OS === 'ios' && iosAppId) {
      const playStoreUrl = `https://apps.apple.com/app/id${iosAppId}`;
      Linking.openURL(playStoreUrl).catch((err) =>
        console.error('Erro ao abrir a App Store:', err),
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('pages.update.title')}</Text>
      <Text style={styles.message}>{t('pages.update.message')}</Text>
      <ActionButton
        text={t('pages.update.button')}
        onPress={() => updateAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.palette.primary.mintGreen,
    borderRadius: 8,
    padding: 16,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 32,
    height: '100%',
    gap: 16,
    justifyContent: 'flex-start',
    backgroundColor: colors.palette.primary.softWhite,
  },
  message: {
    fontSize: 16,
    marginTop: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
