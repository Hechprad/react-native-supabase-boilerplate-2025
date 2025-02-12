import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import AuthContext from '@/contexts/auth';
import { ActionButton } from '@/components/buttons';
import { MyAppEmailInput, MyAppPasswordInput } from '@/components/inputs';
import { supabase } from '@/lib/supabase';

import loginPageStyles from './styles';

export default function LoginPage() {
  const { user } = AuthContext.useAuth();

  // Inputs values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(event: GestureResponderEvent) {
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
              label="Email"
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              value={email}
            />
            <MyAppPasswordInput
              label="Senha"
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              value={password}
            />

            <ActionButton
              onPress={handleSignIn}
              text="Acessar"
              disabled={!email || !password}
            />

            <Link
              href="/(public)/(auth)/signup/page"
              style={loginPageStyles.link}
            >
              <Text style={loginPageStyles.linkText}>
                Ainda não possui uma conta? Cadastre-se
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
