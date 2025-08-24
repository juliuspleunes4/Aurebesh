import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

/**
 * HomeScreen serves as the main landing page for authenticated users.
 * Provides access to the main Aurebesh learning features and user account management.
 */
const HomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  /**
   * Handles user logout with confirmation dialog.
   * Clears the session and returns user to login screen.
   */
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Aurebesh</Text>
      <Text style={styles.subtitle}>Learn the Star Wars Galaxy's Written Language</Text>
      
      {user && (
        <Text style={styles.userInfo}>Logged in as: {user.email}</Text>
      )}
      
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Learning Features</Text>
        <View style={styles.featureButtons}>
          <Button title="Learn Aurebesh" onPress={() => Alert.alert('Coming Soon', 'Learn feature will be implemented soon!')} />
          <View style={styles.buttonSpacing} />
          <Button title="Write Aurebesh" onPress={() => Alert.alert('Coming Soon', 'Write feature will be implemented soon!')} />
          <View style={styles.buttonSpacing} />
          <Button title="Read Aurebesh" onPress={() => Alert.alert('Coming Soon', 'Read feature will be implemented soon!')} />
        </View>
      </View>
      
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  userInfo: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  featureButtons: {
    paddingHorizontal: 20,
  },
  buttonSpacing: {
    height: 16,
  },
  logoutContainer: {
    marginBottom: 40,
  },
});

export default HomeScreen;
