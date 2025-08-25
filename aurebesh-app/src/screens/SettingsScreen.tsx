import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Modal,
  Linking,
  Platform,
  Switch 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { getFontFamily } from '../utils/fonts';
import { hapticMedium, hapticLight } from '../utils/haptics';
import { calculateStorageUsage, formatBytes, StorageBreakdown, clearNetworkCache } from '../utils/storage';
import { resetUserStatistics } from '../utils/learningDatabase';

/**
 * SettingsScreen allows users to customize app preferences.
 * Includes account management, privacy settings, app info, and logout functionality.
 */
const SettingsScreen: React.FC = () => {
  const { user, signOut, deleteAccount } = useAuth();
  const { settings, updateSetting, clearSettings, loadSettings } = useSettings();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showToS, setShowToS] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showCacheDetails, setShowCacheDetails] = useState(false);
  const [storageData, setStorageData] = useState<StorageBreakdown | null>(null);
  const [loadingStorage, setLoadingStorage] = useState(false);

  /**
   * Calculate storage usage when component mounts
   */
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const usage = await calculateStorageUsage();
        setStorageData(usage);
      } catch (error) {
        console.error('Error calculating initial storage usage:', error);
      }
    };

    loadStorageData();
  }, []);

  /**
   * Handles user logout with confirmation dialog.
   * Clears the session and returns user to login screen.
   */
  const handleLogout = async () => {
    await hapticMedium(settings.hapticFeedbackEnabled);
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await hapticLight(settings.hapticFeedbackEnabled);
          },
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await hapticMedium(settings.hapticFeedbackEnabled);
            signOut();
          },
        },
      ]
    );
  };

  /**
   * Handles account deletion with confirmation dialog.
   */
  const handleDeleteAccount = async () => {
    await hapticMedium(settings.hapticFeedbackEnabled);
    
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await hapticLight(settings.hapticFeedbackEnabled);
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await hapticMedium(settings.hapticFeedbackEnabled);
            
            try {
              const { error } = await deleteAccount();
              
              if (error) {
                console.error('Error deleting account:', error);
                Alert.alert(
                  'Error',
                  'Failed to delete account. Please try again or contact support.',
                  [{ text: 'OK' }]
                );
              } else {
                // Success - user should be automatically logged out
                // No need to show an alert since they'll be taken to login screen
                console.log('Account successfully deleted and user logged out');
              }
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert(
                'Error',
                'Failed to delete account. Please try again or contact support.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  /**
   * Handles resetting all learning statistics with confirmation dialog.
   */
  const handleResetStatistics = async () => {
    await hapticMedium(settings.hapticFeedbackEnabled);
    
    Alert.alert(
      'Reset Statistics',
      'This will permanently delete all your learning progress, statistics, and session history. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await hapticLight(settings.hapticFeedbackEnabled);
          },
        },
        {
          text: 'Reset All',
          style: 'destructive',
          onPress: async () => {
            await hapticMedium(settings.hapticFeedbackEnabled);
            
            try {
              const success = await resetUserStatistics();
              
              if (success) {
                Alert.alert(
                  'Statistics Reset',
                  'All your learning statistics have been successfully reset.',
                  [{ 
                    text: 'OK',
                    onPress: async () => {
                      await hapticLight(settings.hapticFeedbackEnabled);
                    }
                  }]
                );
              } else {
                Alert.alert(
                  'Error',
                  'Failed to reset statistics. Please try again or contact support.',
                  [{ text: 'OK' }]
                );
              }
            } catch (error) {
              console.error('Error resetting statistics:', error);
              Alert.alert(
                'Error',
                'Failed to reset statistics. Please try again or contact support.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  /**
   * Handles cache clearing with confirmation.
   * Currently only clears user settings/preferences, resetting them to defaults.
   */
  const handleClearCache = async () => {

    /** 
     * Right now, this only clears user settings/preferences, resetting them to defaults. 
     * There currently isn't any other data to be deleted. 
     * More functionality may be added in the future.
    */

    await hapticMedium(settings.hapticFeedbackEnabled);
    
    Alert.alert(
      'Clear Cache',
      'This will reset your app preferences (like permissions settings) to their defaults. Your learning progress will not be affected. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await hapticLight(settings.hapticFeedbackEnabled);
          },
        },
        {
          text: 'Clear',
          onPress: async () => {
            await hapticMedium(settings.hapticFeedbackEnabled);
            
            try {
              // Clear all settings and reset to defaults
              await clearSettings();
              
              // Also clear network cache
              await clearNetworkCache();
              
              // Refresh storage data
              setStorageData(null);
              const newUsage = await calculateStorageUsage();
              setStorageData(newUsage);
              
              Alert.alert('Cache Cleared', 'App preferences have been reset to their default values.');
            } catch (error) {
              console.error('Error clearing cache:', error);
              Alert.alert('Error', 'Failed to clear cache. Please try again.');
            }
          },
        },
      ]
    );
  };

  /**
   * Opens privacy policy modal.
   */
  const openPrivacyPolicy = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowPrivacyPolicy(true);
  };

  /**
   * Opens Terms of Service modal.
   */
  const openToS = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowToS(true);
  };

  /**
   * Opens app permissions settings.
   */
  const openPermissions = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowPermissions(true);
  };

  /**
   * Opens cache details modal.
   */
  const openCacheDetails = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowCacheDetails(true);
    
    // Refresh storage data when modal opens (in case it changed)
    if (!loadingStorage) {
      setLoadingStorage(true);
      try {
        const usage = await calculateStorageUsage();
        setStorageData(usage);
      } catch (error) {
        console.error('Error refreshing storage usage:', error);
      } finally {
        setLoadingStorage(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="settings" size={48} color="#4f81cb" />
        <Text style={[styles.title, { fontFamily: getFontFamily() }]}>Settings</Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: getFontFamily() }]}>Account</Text>
        
        {/* Logged in as */}
        <View style={styles.settingItem}>
          <MaterialIcons name="account-circle" size={24} color="#4f81cb" style={styles.settingIcon} />
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Logged in as</Text>
            <Text style={[styles.settingValue, { fontFamily: getFontFamily() }]}>{user?.email}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#ff4444" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, styles.logoutText, { fontFamily: getFontFamily() }]}>Logout</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Privacy & Legal Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: getFontFamily() }]}>Privacy & Legal</Text>
        
        {/* Privacy Policy */}
        <TouchableOpacity style={styles.settingItem} onPress={openPrivacyPolicy}>
          <MaterialIcons name="privacy-tip" size={24} color="#4f81cb" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Privacy Policy</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Terms of Service */}
        <TouchableOpacity style={styles.settingItem} onPress={openToS}>
          <MaterialIcons name="description" size={24} color="#4f81cb" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Terms of Service</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Permissions */}
        <TouchableOpacity style={styles.settingItem} onPress={openPermissions}>
          <MaterialIcons name="security" size={24} color="#4f81cb" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Permissions</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* App Data Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: getFontFamily() }]}>App Data</Text>
        
        {/* Cache Info */}
        <TouchableOpacity style={styles.settingItem} onPress={openCacheDetails}>
          <MaterialIcons name="storage" size={24} color="#4f81cb" style={styles.settingIcon} />
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Cache Size</Text>
            <Text style={[styles.settingValue, { fontFamily: getFontFamily() }]}>
              {storageData ? formatBytes(storageData.total) : 'Calculating...'}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Clear Cache */}
        <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
          <MaterialIcons name="clear-all" size={24} color="#ff9500" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, styles.orangeText, { fontFamily: getFontFamily() }]}>Clear Cache</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: getFontFamily() }]}>App Info</Text>
        
        {/* App Version */}
        <View style={styles.settingItem}>
          <MaterialIcons name="info" size={24} color="#4f81cb" style={styles.settingIcon} />
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Version</Text>
            <Text style={[styles.settingValue, { fontFamily: getFontFamily() }]}>1.0.0</Text>
          </View>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={[styles.section, styles.dangerSection]}>
        <Text style={[styles.sectionTitle, styles.dangerTitle, { fontFamily: getFontFamily() }]}>Danger Zone</Text>
        
        {/* Reset Statistics - HIDDEN FOR NOW */}
        {/* 
        <TouchableOpacity style={[styles.settingItem, styles.dangerItem]} onPress={handleResetStatistics}>
          <MaterialIcons name="refresh" size={24} color="#ff4444" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, styles.dangerText, { fontFamily: getFontFamily() }]}>Reset Statistics</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ff4444" />
        </TouchableOpacity>
        */}
        
        {/* Delete Account */}
        <TouchableOpacity style={[styles.settingItem, styles.dangerItem]} onPress={handleDeleteAccount}>
          <MaterialIcons name="delete-forever" size={24} color="#ff4444" style={styles.settingIcon} />
          <Text style={[styles.settingLabel, styles.dangerText, { fontFamily: getFontFamily() }]}>Delete Account</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>

      {/* Privacy Policy Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showPrivacyPolicy}
        onRequestClose={() => setShowPrivacyPolicy(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { fontFamily: getFontFamily() }]}>Privacy Policy</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPrivacyPolicy(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.modalText, { fontFamily: getFontFamily() }]}>
              <Text style={styles.privacyTitle}>Privacy Policy for Aurebesh{'\n\n'}</Text>
              
              <Text style={styles.privacyTitle}>Information We Collect{'\n'}</Text>
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:{'\n\n'}
              • Email address for account creation and authentication{'\n'}
              • Learning progress and preferences{'\n'}
              • Usage data to improve our services{'\n\n'}
              
              <Text style={styles.privacyTitle}>How We Use Your Information{'\n'}</Text>
              We use the information we collect to:{'\n\n'}
              • Provide, maintain, and improve our services{'\n'}
              • Process authentication and account management{'\n'}
              • Send you technical notices and support messages{'\n'}
              • Understand how you use our services to make improvements{'\n\n'}
              
              <Text style={styles.privacyTitle}>Data Security{'\n'}</Text>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Data Retention{'\n'}</Text>
              We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Third-Party Services{'\n'}</Text>
              Our app uses Supabase for authentication and data storage. Please review their privacy policy to understand how they handle your data.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Contact Us{'\n'}</Text>
              If you have any questions about this Privacy Policy, please contact us through our app or visit our website for more information:{'\n\n'}
              
              <Text 
                style={styles.websiteLink}
                onPress={() => Linking.openURL('https://aurebesh.app')}
              >
                https://aurebesh.app
              </Text>
              {'\n\n'}
              
              <Text style={styles.lastUpdated}>Last updated: August 2025</Text>
            </Text>
            
            {/* Empty space for scroll room */}
            <View style={styles.modalBottomSpace} />
          </ScrollView>
        </View>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showToS}
        onRequestClose={() => setShowToS(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { fontFamily: getFontFamily() }]}>Terms of Service</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowToS(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.modalText, { fontFamily: getFontFamily() }]}>
              <Text style={styles.privacyTitle}>Terms of Service for Aurebesh{'\n\n'}</Text>
              
              <Text style={styles.privacyTitle}>Acceptance of Terms{'\n'}</Text>
              By downloading, installing, or using the Aurebesh app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our app.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Description of Service{'\n'}</Text>
              Aurebesh is an educational app designed to help users learn the Aurebesh writing system from the Star Wars universe. The app provides interactive lessons, practice exercises, and translation tools.{'\n\n'}
              
              <Text style={styles.privacyTitle}>User Accounts{'\n'}</Text>
              • You must provide accurate and complete information when creating an account{'\n'}
              • You are responsible for maintaining the security of your account credentials{'\n'}
              • You must notify us immediately of any unauthorized use of your account{'\n'}
              • One person or legal entity may not maintain multiple accounts{'\n\n'}
              
              <Text style={styles.privacyTitle}>Acceptable Use{'\n'}</Text>
              You agree not to:{'\n\n'}
              • Use the app for any illegal or unauthorized purpose{'\n'}
              • Attempt to gain unauthorized access to our systems{'\n'}
              • Interfere with or disrupt the app's functionality{'\n'}
              • Share inappropriate, offensive, or harmful content{'\n'}
              • Reverse engineer, decompile, or disassemble the app{'\n\n'}
              
              <Text style={styles.privacyTitle}>Intellectual Property{'\n'}</Text>
              The Aurebesh app and its content are owned by us and are protected by copyright, trademark, and other intellectual property laws. The Aurebesh writing system itself is part of the Star Wars universe, owned by Lucasfilm Ltd.{'\n\n'}
              
              <Text style={styles.privacyTitle}>User Content{'\n'}</Text>
              Any content you create or share through the app remains your property. However, you grant us a license to use, store, and process this content to provide our services.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Disclaimers{'\n'}</Text>
              The app is provided "as is" without warranties of any kind. We do not guarantee that the app will be error-free, secure, or continuously available.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Limitation of Liability{'\n'}</Text>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Termination{'\n'}</Text>
              We may terminate or suspend your account at any time for violation of these terms. You may delete your account at any time through the app settings.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Changes to Terms{'\n'}</Text>
              We reserve the right to modify these terms at any time. We will notify users of significant changes through the app or email.{'\n\n'}
              
              <Text style={styles.privacyTitle}>Contact Information{'\n'}</Text>
              If you have questions about these Terms of Service, please contact us:{'\n\n'}
              
              <Text 
                style={styles.websiteLink}
                onPress={() => Linking.openURL('https://aurebesh.app')}
              >
                https://aurebesh.app
              </Text>
              {'\n\n'}
              
              <Text style={styles.lastUpdated}>Last updated: August 2025</Text>
            </Text>
            
            {/* Empty space for scroll room */}
            <View style={styles.modalBottomSpace} />
          </ScrollView>
        </View>
      </Modal>

      {/* Permissions Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showPermissions}
        onRequestClose={() => setShowPermissions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { fontFamily: getFontFamily() }]}>Permissions</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPermissions(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.modalText, { fontFamily: getFontFamily() }]}>
              <Text style={styles.privacyTitle}>App Permissions{'\n\n'}</Text>
              Manage what data and features the Aurebesh app can access. You can turn these permissions on or off at any time.{'\n\n'}
            </Text>

            {/* Notifications Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionContent}>
                <MaterialIcons name="notifications" size={24} color="#4f81cb" style={styles.permissionIcon} />
                <View style={styles.permissionText}>
                  <Text style={[styles.permissionLabel, { fontFamily: getFontFamily() }]}>Push Notifications</Text>
                  <Text style={[styles.permissionDescription, { fontFamily: getFontFamily() }]}>
                    Receive notifications about learning reminders and app updates
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) => updateSetting('notificationsEnabled', value)}
                trackColor={{ false: '#e0e0e0', true: '#4f81cb' }}
                thumbColor={settings.notificationsEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Analytics Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionContent}>
                <MaterialIcons name="analytics" size={24} color="#4f81cb" style={styles.permissionIcon} />
                <View style={styles.permissionText}>
                  <Text style={[styles.permissionLabel, { fontFamily: getFontFamily() }]}>Usage Analytics</Text>
                  <Text style={[styles.permissionDescription, { fontFamily: getFontFamily() }]}>
                    Help improve the app by sharing anonymous usage data
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.analyticsEnabled}
                onValueChange={(value) => updateSetting('analyticsEnabled', value)}
                trackColor={{ false: '#e0e0e0', true: '#4f81cb' }}
                thumbColor={settings.analyticsEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Crash Reporting Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionContent}>
                <MaterialIcons name="bug-report" size={24} color="#4f81cb" style={styles.permissionIcon} />
                <View style={styles.permissionText}>
                  <Text style={[styles.permissionLabel, { fontFamily: getFontFamily() }]}>Crash Reporting</Text>
                  <Text style={[styles.permissionDescription, { fontFamily: getFontFamily() }]}>
                    Automatically send crash reports to help fix bugs
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.crashReportingEnabled}
                onValueChange={(value) => updateSetting('crashReportingEnabled', value)}
                trackColor={{ false: '#e0e0e0', true: '#4f81cb' }}
                thumbColor={settings.crashReportingEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Haptic Feedback Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionContent}>
                <MaterialIcons name="vibration" size={24} color="#4f81cb" style={styles.permissionIcon} />
                <View style={styles.permissionText}>
                  <Text style={[styles.permissionLabel, { fontFamily: getFontFamily() }]}>Haptic Feedback</Text>
                  <Text style={[styles.permissionDescription, { fontFamily: getFontFamily() }]}>
                    Feel vibrations when interacting with buttons and UI elements
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.hapticFeedbackEnabled}
                onValueChange={(value) => updateSetting('hapticFeedbackEnabled', value)}
                trackColor={{ false: '#e0e0e0', true: '#4f81cb' }}
                thumbColor={settings.hapticFeedbackEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Data Sync Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionContent}>
                <MaterialIcons name="sync" size={24} color="#4f81cb" style={styles.permissionIcon} />
                <View style={styles.permissionText}>
                  <Text style={[styles.permissionLabel, { fontFamily: getFontFamily() }]}>Data Sync</Text>
                  <Text style={[styles.permissionDescription, { fontFamily: getFontFamily() }]}>
                    Sync your learning progress across devices
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.dataSyncEnabled}
                onValueChange={(value) => updateSetting('dataSyncEnabled', value)}
                trackColor={{ false: '#e0e0e0', true: '#4f81cb' }}
                thumbColor={settings.dataSyncEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Bottom spacing */}
            <View style={styles.modalBottomSpace} />
          </ScrollView>
        </View>
      </Modal>

      {/* Cache Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCacheDetails}
        onRequestClose={() => setShowCacheDetails(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { fontFamily: getFontFamily() }]}>Cache Details</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCacheDetails(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.modalText, { fontFamily: getFontFamily() }]}>
              <Text style={styles.privacyTitle}>Storage Breakdown{'\n\n'}</Text>
              {loadingStorage ? 'Calculating storage usage...' : 'Here\'s how your app\'s storage is being used:'}{'\n\n'}
            </Text>

            {loadingStorage ? (
              <View style={styles.cacheItem}>
                <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>Loading storage data...</Text>
              </View>
            ) : (
              <>
                {/* App Data Cache */}
                <View style={styles.cacheItem}>
                  <View style={styles.cacheItemHeader}>
                    <MaterialIcons name="data-usage" size={20} color="#4f81cb" style={styles.cacheIcon} />
                    <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>App Data</Text>
                  </View>
                  <Text style={[styles.cacheSize, { fontFamily: getFontFamily() }]}>
                    {storageData ? formatBytes(storageData.appData) : '0 B'}
                  </Text>
                  <Text style={[styles.cacheDescription, { fontFamily: getFontFamily() }]}>
                    User settings, preferences, and app configuration
                  </Text>
                </View>

                {/* User Progress Cache */}
                <View style={styles.cacheItem}>
                  <View style={styles.cacheItemHeader}>
                    <MaterialIcons name="trending-up" size={20} color="#4f81cb" style={styles.cacheIcon} />
                    <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>Learning Progress</Text>
                  </View>
                  <Text style={[styles.cacheSize, { fontFamily: getFontFamily() }]}>
                    {storageData ? formatBytes(storageData.learningProgress) : '0 B'}
                  </Text>
                  <Text style={[styles.cacheDescription, { fontFamily: getFontFamily() }]}>
                    Your learning achievements, completed lessons, and statistics
                  </Text>
                </View>

                {/* Fonts Cache */}
                <View style={styles.cacheItem}>
                  <View style={styles.cacheItemHeader}>
                    <MaterialIcons name="text-fields" size={20} color="#4f81cb" style={styles.cacheIcon} />
                    <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>Fonts & Assets</Text>
                  </View>
                  <Text style={[styles.cacheSize, { fontFamily: getFontFamily() }]}>
                    {storageData ? formatBytes(storageData.fontsAssets) : '0 B'}
                  </Text>
                  <Text style={[styles.cacheDescription, { fontFamily: getFontFamily() }]}>
                    Custom Aurebesh fonts and UI assets
                  </Text>
                </View>

                {/* Images Cache */}
                <View style={styles.cacheItem}>
                  <View style={styles.cacheItemHeader}>
                    <MaterialIcons name="image" size={20} color="#4f81cb" style={styles.cacheIcon} />
                    <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>Images & Icons</Text>
                  </View>
                  <Text style={[styles.cacheSize, { fontFamily: getFontFamily() }]}>
                    {storageData ? formatBytes(storageData.imagesIcons) : '0 B'}
                  </Text>
                  <Text style={[styles.cacheDescription, { fontFamily: getFontFamily() }]}>
                    App icons, learning materials, and cached images
                  </Text>
                </View>
              </>
            )}

            {/* Network Cache */}
            <View style={styles.cacheItem}>
              <View style={styles.cacheItemHeader}>
                <MaterialIcons name="cloud-download" size={20} color="#4f81cb" style={styles.cacheIcon} />
                <Text style={[styles.cacheLabel, { fontFamily: getFontFamily() }]}>Network Cache</Text>
              </View>
              <Text style={[styles.cacheSize, { fontFamily: getFontFamily() }]}>
                {storageData ? formatBytes(storageData.networkCache) : '0 B'}
              </Text>
              <Text style={[styles.cacheDescription, { fontFamily: getFontFamily() }]}>
                API responses and temporary network data
              </Text>
            </View>

            {/* Total */}
            <View style={[styles.cacheItem, styles.cacheTotalItem]}>
              <View style={styles.cacheItemHeader}>
                <MaterialIcons name="storage" size={20} color="#4f81cb" style={styles.cacheIcon} />
                <Text style={[styles.cacheLabel, styles.cacheTotalLabel, { fontFamily: getFontFamily() }]}>Total Cache Size</Text>
              </View>
              <Text style={[styles.cacheSize, styles.cacheTotalSize, { fontFamily: getFontFamily() }]}>
                {storageData ? formatBytes(storageData.total) : '0 B'}
              </Text>
            </View>

            <Text style={[styles.modalText, { fontFamily: getFontFamily() }]}>
              {'\n'}Clearing cache will remove temporary files and reset your permissions but keep your learning progress intact.
            </Text>

            {/* Bottom spacing */}
            <View style={styles.modalBottomSpace} />
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 100, // Space for tab bar
  },
  header: {
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 60,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutText: {
    color: '#ff4444',
    flex: 1,
  },
  orangeText: {
    color: '#ff9500',
    flex: 1,
  },
  dangerSection: {
    borderColor: '#ff4444',
    borderWidth: 1,
  },
  dangerTitle: {
    color: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  dangerItem: {
    backgroundColor: '#fff5f5',
  },
  dangerText: {
    color: '#ff4444',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  privacyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  websiteLink: {
    color: '#4f81cb',
    textDecorationLine: 'underline',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  modalBottomSpace: {
    height: 50,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 1,
  },
  permissionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 20,
  },
  permissionIcon: {
    marginRight: 16,
  },
  permissionText: {
    flex: 1,
  },
  permissionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  cacheItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cacheItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cacheIcon: {
    marginRight: 8,
  },
  cacheLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  cacheSize: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4f81cb',
    marginBottom: 4,
  },
  cacheDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 16,
  },
  cacheTotalItem: {
    backgroundColor: '#f8f9fa',
    borderColor: '#4f81cb',
    borderWidth: 2,
    marginTop: 8,
  },
  cacheTotalLabel: {
    fontWeight: 'bold',
    color: '#4f81cb',
  },
  cacheTotalSize: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f81cb',
  },
});

export default SettingsScreen;
