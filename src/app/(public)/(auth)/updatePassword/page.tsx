import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ActionButton, NavigationButton } from '@/components/buttons/';
import { MyAppPasswordInput } from '@/components/inputs';
import useAuthUpdatePass from '@/hooks/useAuthUpdatePass';

import styles from '../signup/styles';

type formFields = {
  password: string;
};

export default function updatePassword() {
  const { handleUpdatePassword, loading } = useAuthUpdatePass();
  const { t } = useTranslation();

  const schema = z.object({
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

  async function handleUpdatePass({ password }: formFields) {
    handleUpdatePassword(password);
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
            <Text style={styles.slogan}>{t('pages.updatePassword.title')}</Text>
          </View>
          <View style={styles.form}>
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
              onPress={handleSubmit(handleUpdatePass)}
              text={t('pages.updatePassword.button')}
              disabled={!watch('password') || loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
