import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LoginScreen, RegisterScreen, HomeScreen } from '../screens';

/**
 * Type definition for the navigation stack parameters.
 * Defines the screens and their expected parameters for type safety.
 */
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
 * AuthStack contains the authentication-related screens (Login, Register).
 * Used when the user is not authenticated.
 */
const AuthStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Hide header for all auth screens
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
    />
  </Stack.Navigator>
);

/**
 * MainStack contains the main app screens for authenticated users.
 * Used when the user is successfully logged in.
 */
const MainStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f8f9fa',
      },
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: 'Aurebesh' }}
    />
  </Stack.Navigator>
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
      {session ? <MainStack /> : <AuthStack />}
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
