import { useState } from 'react';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '@/lib/supabase';
import signUpStyles from './styles';
import { ActionButton, NavigationButton } from '@/components/buttons/';
import {
  MyAppEmailInput,
  MyAppPasswordInput,
  MyAppTextInput,
} from '@/components/inputs';
import { useTranslation } from 'react-i18next';

type formFields = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);

  const schema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    lastName: z.string().min(2, 'O sobrenome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    // .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    // .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    // .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial')
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  async function handleSignup({ email, lastName, name, password }: formFields) {
    setPending(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password: password,
      options: {
        data: {
          first_name: name,
          last_name: lastName,
        },
      },
    });

    setPending(false);

    if (error) {
      Alert.alert(error.message);
      return;
    }

    if (!session) Alert.alert('Por favor, verifique seu e-mail!');

    router.replace('/(public)/(auth)/signin/page');
  }

  return (
    <SafeAreaView style={signUpStyles.safeArea}>
      <ScrollView
        // force the scrollView to occupy the entire screen
        contentContainerStyle={{ flexGrow: 1 }}
        style={signUpStyles.scrollView}
      >
        <View style={signUpStyles.container}>
          <View style={signUpStyles.header}>
            <NavigationButton
              arrow="arrow-back"
              onPress={() => router.back()}
            />
            <Text style={signUpStyles.slogan}>Criar uma conta</Text>
          </View>
          <View style={signUpStyles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, ref, ...rest } }) => (
                <MyAppTextInput
                  label={t('fields.firstName.label')}
                  placeholder={t('fields.firstName.placeholder')}
                  textContentType="givenName"
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                  {...rest}
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, ref, ...rest } }) => (
                <MyAppTextInput
                  label={t('fields.lastName.label')}
                  onChangeText={onChange}
                  placeholder={t('fields.lastName.placeholder')}
                  textContentType="familyName"
                  errorMessage={errors.lastName?.message}
                  {...rest}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, ref, ...rest } }) => (
                <MyAppEmailInput
                  label={t('fields.email.label')}
                  onChangeText={onChange}
                  placeholder={t('fields.email.placeholder')}
                  errorMessage={errors.email?.message}
                  {...rest}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, ref, ...rest } }) => (
                <MyAppPasswordInput
                  label={t('fields.pass.label')}
                  onChangeText={onChange}
                  placeholder={t('fields.pass.placeholder')}
                  textContentType="newPassword"
                  errorMessage={errors.password?.message}
                  {...rest}
                />
              )}
            />
            <ActionButton
              onPress={handleSubmit(handleSignup)}
              text="Cadastrar"
              disabled={
                !watch('name') ||
                !watch('lastName') ||
                !watch('email') ||
                !watch('password') ||
                pending
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
