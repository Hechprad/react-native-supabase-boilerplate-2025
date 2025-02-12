import { router } from 'expo-router';
import { Alert } from 'react-native';

import AuthContext from '@/contexts/auth';
import { supabase } from '@/lib/supabase';
import { ActionButton } from '@/components/buttons';

export default function SignOutButton() {
  const { user, setAuth } = AuthContext.useAuth();

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error logging out:', error.message);
      return;
    }

    setAuth(null);
    router.replace('/(public)/(auth)/signin/page');
  }

  return <ActionButton onPress={handleSignout} text="Sair" />;
}
