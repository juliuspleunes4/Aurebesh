import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Main App component that serves as the root of the Aurebesh learning application.
 * Wraps the entire app with AuthProvider to manage authentication state globally.
 * Handles navigation between auth screens and main app screens automatically.
 */
export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider>
  );
}
