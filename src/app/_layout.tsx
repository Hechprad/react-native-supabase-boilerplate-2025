import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import 'react-native-reanimated';

import AuthContext from '@/contexts/auth';
import i18n, { initI18n } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

import type { CurrentUser } from '@/contexts/auth/types';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [hasWindow, setHasWindow] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Initialize the i18n library
  useEffect(() => {
    if (!hasWindow && typeof window !== 'undefined') {
      setHasWindow(true);
      initI18n();
    }
  }, [hasWindow]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AuthContext.AuthProvider>
        <MainLayout />
      </AuthContext.AuthProvider>
    </I18nextProvider>
  );
}

function MainLayout() {
  const { setAuth } = AuthContext.useAuth();
  const colorScheme = useColorScheme();

  // Check if the user is authenticated and redirect to the Dashboard
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAuth(session.user as CurrentUser);
        router.replace('/(private)/dashboard/page');
        return;
      }

      setAuth(null);
      router.replace('/(public)/(auth)/signin/page');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'SplashScreen',
          }}
        />
        <Stack.Screen
          name="(public)/(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(private)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
