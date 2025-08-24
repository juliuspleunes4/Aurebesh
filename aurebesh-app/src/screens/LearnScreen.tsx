import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * LearnScreen allows users to practice translating Aurebesh to English.
 * Users see a word written in Aurebesh and enter the English equivalent.
 * This is the main learning screen of the app.
 */
const LearnScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="school" size={48} color="#4f81cb" />
        <Text style={styles.title}>Learn Aurebesh</Text>
        <Text style={styles.subtitle}>
          Practice translating Aurebesh characters to English
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.instructionText}>
            Translate this Aurebesh word:
          </Text>
          
          {/* Placeholder for Aurebesh text */}
          <View style={styles.aurebeshContainer}>
            <Text style={styles.aurebeshText}>
              [Aurebesh Characters]
            </Text>
          </View>
          
          {/* Placeholder for input field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputPlaceholder}>
              Enter English translation...
            </Text>
          </View>
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.hintButton}>
            <MaterialIcons name="lightbulb-outline" size={20} color="#666" />
            <Text style={styles.hintButtonText}>Hint</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton}>
            <MaterialIcons name="skip-next" size={20} color="#666" />
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  aurebeshContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 40,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  aurebeshText: {
    fontSize: 24,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#4f81cb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hintButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skipButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
});

export default LearnScreen;
