import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useTranslation } from 'react-i18next';

import { supabase } from '../lib/supabase';

/**
 * @TODO - remove
 * Example of URL received by email triggered by supabase
 *
 * frevjjwobtboymnitqzd.supabase.co/auth/v1/verify
 *  ?token=wxyztoken
 *  &type=recovery
 *  &redirect_to=http://localhost:8081/updatePassword/page
 *
 * Ao executar o redirect, a URL recebe os tokens:
 *
 * http://localhost:8081/updatePassword/page
 *  # access_token=wxyztoken
 *  &expires_at=1740053401
 *  &expires_in=3600
 *  &refresh_token=wxyztoken
 *  &token_type=bearer
 *  &type=recovery
 */

export default function useAuthUpdatePass() {
  const router = useRouter();
  const params = useLocalSearchParams<{ '#': string }>();
  const { t } = useTranslation();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const getUrlParams = useCallback(() => {
    if (params['#']) {
      const queryString = params['#'] as string;
      const urlParams = new URLSearchParams(queryString);

      setAccessToken(urlParams.get('access_token') || '');
      setRefreshToken(urlParams.get('refresh_token') || '');
    }
  }, [params]);

  const setUserSession = useCallback(async () => {
    if (accessToken && refreshToken && !userEmail) {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!error) {
        setUserEmail(data.user?.email ?? null);
      }
    }
  }, [accessToken, refreshToken, userEmail]);

  useEffect(() => {
    getUrlParams();
  }, [getUrlParams]);

  useEffect(() => {
    setUserSession();
  }, [setUserSession]);

  const handleUpdatePassword = async (password: string) => {
    if (userEmail) {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        email: userEmail,
        password,
      });

      await supabase.auth.signOut();

      if (!error) {
        Alert.alert(t('alert.passwordUpdated'));
        setTimeout(() => {
          setLoading(false);
          return router.replace('/signin/page');
        }, 2000);
      }
    }
  };

  return {
    handleUpdatePassword,
    loading,
  };
}
