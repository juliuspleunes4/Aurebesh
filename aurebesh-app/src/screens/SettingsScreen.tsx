import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Modal,
  Linking,
  Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../context/AuthContext';
import { getFontFamily } from '../utils/fonts';

/**
 * SettingsScreen allows users to customize app preferences.
 * Includes account management, privacy settings, app info, and logout functionality.
 */
const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showToS, setShowToS] = useState(false);

  /**
   * Handles user logout with confirmation dialog.
   * Clears the session and returns user to login screen.
   */
  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            // TODO: Implement account deletion with Supabase
            Alert.alert('Coming Soon', 'Account deletion functionality will be implemented soon.');
          },
        },
      ]
    );
  };

  /**
   * Handles cache clearing with confirmation.
   */
  const handleClearCache = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        },
        {
          text: 'Clear',
          onPress: async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // TODO: Implement cache clearing
            Alert.alert('Cache Cleared', 'All cached data has been cleared.');
          },
        },
      ]
    );
  };

  /**
   * Opens privacy policy modal.
   */
  const openPrivacyPolicy = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowPrivacyPolicy(true);
  };

  /**
   * Opens Terms of Service modal.
   */
  const openToS = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowToS(true);
  };

  /**
   * Opens app permissions settings.
   */
  const openPermissions = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement permissions management
    Alert.alert('Permissions', 'Permission management will be implemented soon.');
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
        <View style={styles.settingItem}>
          <MaterialIcons name="storage" size={24} color="#4f81cb" style={styles.settingIcon} />
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { fontFamily: getFontFamily() }]}>Cache Size</Text>
            <Text style={[styles.settingValue, { fontFamily: getFontFamily() }]}>~2.3 MB</Text>
          </View>
        </View>

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
              {/* TODO: Add actual Terms of Service content */}
              Terms of Service content will be added here. This will include user agreements, acceptable use policies, and legal terms.
            </Text>
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
});

export default SettingsScreen;
