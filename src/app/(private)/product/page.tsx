import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import AuthContext from '@/contexts/auth';
import colors from '@/constants/theme/colors';

export default function Product() {
  const { user } = AuthContext.useAuth();

  return (
    <View style={styles.container}>
      <Text>Product</Text>
      <Text>
        Hello, {user?.user_metadata?.name} {user?.user_metadata?.last_name}
      </Text>
      <Text>email: {user?.email}</Text>

      <Link href="/(private)/profile/page" style={styles.link}>
        <Text style={styles.linkText}>Product</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.palette.primary.softWhite,
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  linkText: {
    alignItems: 'center',
    color: colors.palette.primary.serenityBlue,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
