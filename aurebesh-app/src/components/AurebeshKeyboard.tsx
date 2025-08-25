import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getFontFamily, getAurebeshFontFamily } from '../utils/fonts';
import { aurebeshAlphabet } from '../utils/aurebeshTranslator';
import { hapticLight } from '../utils/haptics';
import { useSettings } from '../context/SettingsContext';

const { width: screenWidth } = Dimensions.get('window');

interface AurebeshKeyboardProps {
  /** Callback function called when a character is pressed */
  onCharacterPress: (character: string) => void;
  /** Callback function called when backspace is pressed */
  onBackspace: () => void;
  /** Callback function called when space is pressed */
  onSpace: () => void;
  /** Callback function called when clear is pressed */
  onClear: () => void;
}

/**
 * Custom Aurebesh keyboard component for inputting Aurebesh characters
 * Displays the alphabet in a grid layout with visual Aurebesh characters
 * and their English equivalents for easy reference
 */
export const AurebeshKeyboard: React.FC<AurebeshKeyboardProps> = ({
  onCharacterPress,
  onBackspace,
  onSpace,
  onClear
}) => {
  const { settings } = useSettings();

  /**
   * Handles character press with haptic feedback
   */
  const handleCharacterPress = async (character: string) => {
    await hapticLight(settings.hapticFeedbackEnabled);
    onCharacterPress(character);
  };

  /**
   * Renders alphabet keys in rows
   */
  const renderAlphabetKeys = () => {
    // Split alphabet into rows for better layout
    const rows = [
      aurebeshAlphabet.slice(0, 7),   // A-G
      aurebeshAlphabet.slice(7, 14),  // H-N
      aurebeshAlphabet.slice(14, 21), // O-U
      aurebeshAlphabet.slice(21, 26), // V-Z
    ];

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.keyboardRow}>
        {row.map((char) => (
          <TouchableOpacity
            key={char.english}
            style={styles.characterKey}
            onPress={() => handleCharacterPress(char.english)}
            activeOpacity={0.7}
          >
            <Text style={[styles.aurebeshKeyText, { fontFamily: getAurebeshFontFamily() }]}>
              {char.aurebesh}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.keyboard}>
      {/* Alphabet Keys */}
      <View style={styles.alphabetSection}>
        {renderAlphabetKeys()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  alphabetSection: {
    marginBottom: 12,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 6,
  },
  characterKey: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  aurebeshKeyText: {
    fontSize: 18,
    color: '#4f81cb',
  },
});
