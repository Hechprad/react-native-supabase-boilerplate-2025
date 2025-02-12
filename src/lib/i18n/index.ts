import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationPt from './locales/pt-BR.json';

// Configuração das traduções
const resources = {
  'pt-BR': { translation: translationPt },
};

export const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode ?? 'pt-BR';
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: savedLanguage,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  });

  // Configura a direção do texto (LTR ou RTL)
  // I18nManager.allowRTL(false);
  // I18nManager.forceRTL(Localization.isRTL);
};

export default i18n;
