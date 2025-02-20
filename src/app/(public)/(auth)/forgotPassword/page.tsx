import { useState } from 'react';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '@/lib/supabase';
import { ActionButton, NavigationButton } from '@/components/buttons/';
import { MyAppEmailInput } from '@/components/inputs';

import styles from '../signup/styles';

type formFields = {
  email: string;
};

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);

  const schema = z.object({
    email: z.string().email(t('fields.email.errors.invalid')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  async function handleSignup({ email }: formFields) {
    setPending(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // @TODO - Change the redirectTo to the app link when the app is ready
      redirectTo: 'http://localhost:8081/updatePassword/page',
    });

    setPending(false);

    if (error) {
      Alert.alert(error.message);
      return;
    }

    router.replace('/(public)/(auth)/signin/page');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        // force the scrollView to occupy the entire screen
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <NavigationButton
              arrow="arrow-back"
              onPress={() => router.back()}
            />
            <Text style={styles.slogan}>{t('pages.forgotPassword.title')}</Text>
          </View>
          <View style={styles.form}>
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

            <ActionButton
              onPress={handleSubmit(handleSignup)}
              text={t('pages.forgotPassword.button')}
              disabled={!watch('email') || pending}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
