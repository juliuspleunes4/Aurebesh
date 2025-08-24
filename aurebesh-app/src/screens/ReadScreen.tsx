import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ReadScreen displays Aurebesh characters and their English equivalents.
 * Allows users to practice reading with interactive elements like flashcards.
 */
const ReadScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="chrome-reader-mode" size={64} color="#ccc" />
      <Text style={styles.title}>Read Aurebesh</Text>
      <Text style={styles.subtitle}>Practice reading Aurebesh characters</Text>
      <Text style={styles.comingSoon}>Coming Soon!</Text>
      <Text style={styles.description}>
        This feature will display Aurebesh characters with their English equivalents and provide interactive flashcards for practice.
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

export default ReadScreen;
