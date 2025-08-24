import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Interface for user settings stored locally
 */
interface UserSettings {
  notificationsEnabled: boolean;
  analyticsEnabled: boolean;
  crashReportingEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  dataSyncEnabled: boolean;
}

/**
 * Default settings for new users - all enabled by default
 */
const DEFAULT_SETTINGS: UserSettings = {
  notificationsEnabled: true,
  analyticsEnabled: true,
  crashReportingEnabled: true,
  hapticFeedbackEnabled: true,
  dataSyncEnabled: true,
};

/**
 * Settings context interface
 */
interface SettingsContextType {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => Promise<void>;
  loadSettings: () => Promise<void>;
  clearSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * Settings provider component that manages user preferences in AsyncStorage
 */
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  /**
   * Storage key for user settings
   */
  const SETTINGS_KEY = '@aurebesh_user_settings';

  /**
   * Load settings from AsyncStorage
   */
  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        // Merge with defaults to ensure new settings are added
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      } else {
        // First time user - set defaults
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings(DEFAULT_SETTINGS);
    }
  };

  /**
   * Update a specific setting and save to AsyncStorage
   */
  const updateSetting = async <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  /**
   * Clear all settings (useful for logout or reset)
   */
  const clearSettings = async () => {
    try {
      await AsyncStorage.removeItem(SETTINGS_KEY);
      setSettings(DEFAULT_SETTINGS);
    } catch (error) {
      console.error('Error clearing settings:', error);
    }
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const value: SettingsContextType = {
    settings,
    updateSetting,
    loadSettings,
    clearSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Hook to use settings context
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
