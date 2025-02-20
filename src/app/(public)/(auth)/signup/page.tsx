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
    name: z.string().min(2, t('fields.firstName.errors.minLength')),
    lastName: z.string().min(2, t('fields.lastName.errors.minLength')),
    email: z.string().email(t('fields.email.errors.invalid')),
    password: z
      .string()
      .min(6, t('fields.password.errors.minLength'))
      .regex(/[A-Z]/, t('fields.password.errors.uppercase'))
      .regex(/[a-z]/, t('fields.password.errors.lowercase'))
      .regex(/[\W_]/, t('fields.password.errors.specialCharacter')),
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

    if (!session) Alert.alert(t('alert.emailCheck'));

    router.replace('/(public)/(auth)/signin/page');
  }

  return (
    <SafeAreaView style={signUpStyles.safeArea}>
      <ScrollView
        // force the scrollView to occupy the entire screen
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        style={signUpStyles.scrollView}
      >
        <View style={signUpStyles.container}>
          <View style={signUpStyles.header}>
            <NavigationButton
              arrow="arrow-back"
              onPress={() => router.back()}
            />
            <Text style={signUpStyles.slogan}>{t('pages.signUp.title')}</Text>
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
                  label={t('fields.password.label')}
                  onChangeText={onChange}
                  placeholder={t('fields.password.placeholder')}
                  textContentType="newPassword"
                  errorMessage={errors.password?.message}
                  {...rest}
                />
              )}
            />
            <ActionButton
              onPress={handleSubmit(handleSignup)}
              text={t('buttons.signUp')}
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
