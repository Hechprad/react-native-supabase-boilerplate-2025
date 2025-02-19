import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>{t('pages.notFound.title')}</Text>
        <Link href="/dashboard/page" style={styles.link}>
          <Text>{t('pages.notFound.link')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
