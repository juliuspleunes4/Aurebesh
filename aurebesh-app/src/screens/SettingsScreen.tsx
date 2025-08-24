import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../context/AuthContext';

/**
 * SettingsScreen allows users to customize app preferences.
 * Includes theme settings, account management, and logout functionality.
 */
const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  /**
   * Handles user logout with confirmation dialog.
   * Clears the session and returns user to login screen.
   */
  const handleLogout = async () => {
    // Haptic feedback for logout button press
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: async () => {
            // Light haptic for cancel
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // Success haptic for logout confirmation
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            signOut();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your Aurebesh experience</Text>
      
      {/* User Info */}
      {user?.email && (
        <Text style={styles.userInfo}>Logged in as: {user.email}</Text>
      )}
      
      {/* TODO: Add more settings options */}
      
      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff4444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  logoutContainer: {
    marginTop: 50,
  },
});

export default SettingsScreen;
