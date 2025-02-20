import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

import AuthContext from '@/contexts/auth';
import { ActionButton } from '@/components/buttons';
import { MyAppEmailInput, MyAppPasswordInput } from '@/components/inputs';
import { supabase } from '@/lib/supabase';

import loginPageStyles from './styles';

export default function LoginPage() {
  const { user } = AuthContext.useAuth();
  const { t } = useTranslation();

  // Inputs values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    router.replace('/(private)/dashboard/page');
  }

  // Check if the user already has a session and redirect to the dashboard
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && user) {
        router.replace('/(private)/dashboard/page');
        return;
      }
    });
  }, [user]);

  return (
    <SafeAreaView style={loginPageStyles.safeArea}>
      <ScrollView
        // force the scrollView to occupy the entire screen
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        style={loginPageStyles.scrollView}
      >
        <View style={loginPageStyles.container}>
          <View style={loginPageStyles.header}>
            <Text style={loginPageStyles.logoText1}>
              react-native-supabase-boilerplate{' '}
              <Text style={loginPageStyles.logoText2}>2025</Text>
            </Text>
            <Text style={loginPageStyles.slogan}>Ohhh my gosssh</Text>
            <Text style={loginPageStyles.slogan}>🚀</Text>
          </View>
          <View style={loginPageStyles.form}>
            <MyAppEmailInput
              label={t('fields.email.label')}
              placeholder={t('fields.email.placeholder')}
              onChangeText={setEmail}
              value={email}
            />
            <MyAppPasswordInput
              label={t('fields.password.label')}
              onChangeText={setPassword}
              placeholder={t('fields.password.placeholder')}
              value={password}
            />

            <Link
              href="/(public)/(auth)/forgotPassword/page"
              style={loginPageStyles.linkForgotPass}
            >
              <Text style={loginPageStyles.linkText}>
                {t('links.forgotPassword')}
              </Text>
            </Link>

            <ActionButton
              onPress={handleSignIn}
              text={t('buttons.signIn')}
              disabled={!email || !password}
            />

            <Link
              href="/(public)/(auth)/signup/page"
              style={loginPageStyles.link}
            >
              <Text style={loginPageStyles.linkText}>{t('links.signUp')}</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
