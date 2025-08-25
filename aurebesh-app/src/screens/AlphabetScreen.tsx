import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { getFontFamily, getAurebeshFontFamily } from '../utils/fonts';
import { hapticLight } from '../utils/haptics';

/**
 * Interface defining the structure of an Aurebesh character
 */
interface AurebeshCharacter {
  english: string;
  aurebesh: string;
  name: string;
}

/**
 * Complete Aurebesh alphabet with proper character names from Star Wars lore.
 * Each character maps an English letter to its Aurebesh equivalent and includes the canonical name.
 */
const aurebeshAlphabet: AurebeshCharacter[] = [
  { english: 'A', aurebesh: 'a', name: 'Aurek' },
  { english: 'B', aurebesh: 'b', name: 'Besh' },
  { english: 'C', aurebesh: 'c', name: 'Cresh' },
  { english: 'D', aurebesh: 'd', name: 'Dorn' },
  { english: 'E', aurebesh: 'e', name: 'Esk' },
  { english: 'F', aurebesh: 'f', name: 'Forn' },
  { english: 'G', aurebesh: 'g', name: 'Grek' },
  { english: 'H', aurebesh: 'h', name: 'Herf' },
  { english: 'I', aurebesh: 'i', name: 'Isk' },
  { english: 'J', aurebesh: 'j', name: 'Jenth' },
  { english: 'K', aurebesh: 'k', name: 'Krill' },
  { english: 'L', aurebesh: 'l', name: 'Leth' },
  { english: 'M', aurebesh: 'm', name: 'Mern' },
  { english: 'N', aurebesh: 'n', name: 'Nern' },
  { english: 'O', aurebesh: 'o', name: 'Osk' },
  { english: 'P', aurebesh: 'p', name: 'Peth' },
  { english: 'Q', aurebesh: 'q', name: 'Qek' },
  { english: 'R', aurebesh: 'r', name: 'Resh' },
  { english: 'S', aurebesh: 's', name: 'Senth' },
  { english: 'T', aurebesh: 't', name: 'Trill' },
  { english: 'U', aurebesh: 'u', name: 'Usk' },
  { english: 'V', aurebesh: 'v', name: 'Vev' },
  { english: 'W', aurebesh: 'w', name: 'Wesk' },
  { english: 'X', aurebesh: 'x', name: 'Xesh' },
  { english: 'Y', aurebesh: 'y', name: 'Yirt' },
  { english: 'Z', aurebesh: 'z', name: 'Zerek' },
];

/**
 * Props for the AlphabetScreen component
 */
interface AlphabetScreenProps {
  navigation: {
    goBack: () => void;
  };
}

/**
 * AlphabetScreen displays the complete Aurebesh alphabet reference.
 * Users can view all Aurebesh characters with their English equivalents and canonical names.
 * Includes character details and follows the app's design system.
 */
const AlphabetScreen: React.FC<AlphabetScreenProps> = ({ navigation }) => {
  const { settings } = useSettings();
  const [selectedCharacter, setSelectedCharacter] = useState<AurebeshCharacter | null>(null);
  const screenWidth = Dimensions.get('window').width;

  /**
   * Gets the appropriate font family based on user settings
   */
  const getAppFontFamily = () => {
    return getFontFamily();
  };

  /**
   * Calculate the number of columns based on screen width for responsive grid layout
   */
  const getColumnsCount = () => {
    if (screenWidth < 400) return 2;
    if (screenWidth < 600) return 3;
    return 4;
  };

  /**
   * Handles character selection with haptic feedback.
   * Displays detailed information about the selected character.
   * @param character - The Aurebesh character that was tapped
   */
  const handleCharacterPress = async (character: AurebeshCharacter) => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setSelectedCharacter(character);
  };

  /**
   * Clears the selected character to return to the main alphabet view
   */
  const clearSelection = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setSelectedCharacter(null);
  };

  /**
   * Handles back navigation with haptic feedback
   */
  const handleGoBack = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    navigation.goBack();
  };

  /**
   * Renders a single character card showing Aurebesh character, English letter, and name
   */
  const renderCharacterCard = (character: AurebeshCharacter, index: number) => {
    const isSelected = selectedCharacter?.english === character.english;
    const columnsCount = getColumnsCount();
    const cardWidth = (screenWidth - 60 - (columnsCount - 1) * 12) / columnsCount;

    return (
      <TouchableOpacity
        key={character.english}
        style={[
          styles.characterCard,
          { width: cardWidth },
          isSelected && styles.selectedCard,
        ]}
        onPress={() => handleCharacterPress(character)}
        accessibilityRole="button"
        accessibilityLabel={`Aurebesh character ${character.name}, represents ${character.english}`}
      >
        <Text style={[styles.aurebeshCharacter, { fontFamily: getAurebeshFontFamily() }]}>
          {character.aurebesh}
        </Text>
        <Text style={[styles.englishCharacter, { fontFamily: getAppFontFamily() }]}>
          {character.english}
        </Text>
        <Text style={[styles.characterName, { fontFamily: getAppFontFamily() }]}>
          {character.name}
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Renders the detailed view for a selected character
   */
  const renderCharacterDetail = () => (
    <View style={styles.detailContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={clearSelection}
        accessibilityRole="button"
        accessibilityLabel="Back to alphabet"
      >
        <MaterialIcons name="arrow-back" size={24} color="#4f81cb" />
        <Text style={[styles.backButtonText, { fontFamily: getAppFontFamily() }]}>
          Back to Alphabet
        </Text>
      </TouchableOpacity>

      <View style={styles.detailCard}>
        <Text style={[styles.detailAurebeshCharacter, { fontFamily: getAurebeshFontFamily() }]}>
          {selectedCharacter?.aurebesh}
        </Text>
        
        <View style={styles.detailInfo}>
          <Text style={[styles.detailLabel, { fontFamily: getAppFontFamily() }]}>
            English Letter
          </Text>
          <Text style={[styles.detailValue, { fontFamily: getAppFontFamily() }]}>
            {selectedCharacter?.english}
          </Text>
        </View>

        <View style={styles.detailInfo}>
          <Text style={[styles.detailLabel, { fontFamily: getAppFontFamily() }]}>
            Character Name
          </Text>
          <Text style={[styles.detailValue, { fontFamily: getAppFontFamily() }]}>
            {selectedCharacter?.name}
          </Text>
        </View>

        <Text style={[styles.detailDescription, { fontFamily: getAppFontFamily() }]}>
          This is the Aurebesh character "{selectedCharacter?.name}" which represents the English letter "{selectedCharacter?.english}". 
          Each Aurebesh character has its own unique name from the Star Wars galaxy.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBackButton}
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="arrow-back" size={24} color="#4f81cb" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: getAppFontFamily() }]}>
          Aurebesh Alphabet
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedCharacter ? renderCharacterDetail() : (
          <>
            {/* Introduction */}
            <View style={styles.introContainer}>
              <MaterialIcons name="info-outline" size={20} color="#4f81cb" />
              <Text style={[styles.introText, { fontFamily: getAppFontFamily() }]}>
                The complete Aurebesh alphabet used throughout the Star Wars galaxy. 
                Tap any character to learn more about it.
              </Text>
            </View>

            {/* Alphabet Grid */}
            <View style={styles.alphabetGrid}>
              {aurebeshAlphabet.map((character, index) => 
                renderCharacterCard(character, index)
              )}
            </View>

            {/* Footer Information */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { fontFamily: getAppFontFamily() }]}>
                The Aurebesh alphabet is the writing system used throughout the Star Wars galaxy. 
                Each character corresponds to a letter in the English alphabet and has its own unique name 
                derived from the ancient civilizations of that galaxy.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  headerBackButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 30,
  },
  characterCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#4f81cb',
    backgroundColor: '#f0f8ff',
  },
  aurebeshCharacter: {
    fontSize: 36,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  englishCharacter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f81cb',
    marginBottom: 4,
    textAlign: 'center',
  },
  characterName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4f81cb',
    marginLeft: 8,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailAurebeshCharacter: {
    fontSize: 120,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  detailInfo: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default AlphabetScreen;
