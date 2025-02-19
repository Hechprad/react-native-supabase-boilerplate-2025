import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

export default function useCheckForAppUpdate() {
  const [hasUpdate, setHasUpdate] = useState(false);

  async function checkForAppUpdate() {
    try {
      const androidPackageName = Constants.expoConfig?.android?.package;
      const iosAppId = Constants.expoConfig?.ios?.bundleIdentifier;
      const currentVersion = Constants.expoConfig?.version;

      if (!androidPackageName || !currentVersion) {
        return;
      }

      const latestVersion = await VersionCheck.getLatestVersion({
        provider: Platform.OS === 'android' ? 'playstore' : 'appstore',
        packageName: Platform.OS === 'android' ? androidPackageName : iosAppId,
      });

      setHasUpdate(latestVersion > currentVersion);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkForAppUpdate();
  }, []);

  return hasUpdate;
}
