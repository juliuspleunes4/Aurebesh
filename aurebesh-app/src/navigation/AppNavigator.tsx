import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './TabNavigator';
import { AnimatedAuthNavigator } from '../components';

/**
 * Loading screen component displayed while checking authentication status.
 * Shows a spinner to indicate the app is initializing.
 */
const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

/**
 * AppNavigator is the root navigation component that handles routing based on authentication state.
 * Automatically switches between auth screens and main app screens based on user session.
 * Shows loading screen while checking authentication status.
 */
const AppNavigator: React.FC = () => {
  const { session, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {session ? <TabNavigator /> : <AnimatedAuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default AppNavigator;
