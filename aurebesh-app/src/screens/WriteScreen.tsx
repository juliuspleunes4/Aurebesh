import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * WriteScreen allows users to convert English text to Aurebesh and vice versa.
 * Provides real-time translation with copy-to-clipboard functionality.
 */
const WriteScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="edit" size={64} color="#ccc" />
      <Text style={styles.title}>Write Aurebesh</Text>
      <Text style={styles.subtitle}>Convert between English and Aurebesh</Text>
      <Text style={styles.comingSoon}>Coming Soon!</Text>
      <Text style={styles.description}>
        This feature will allow you to translate text between English and Aurebesh in real-time.
      </Text>
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
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f81cb',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WriteScreen;
