import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';
import { getFontFamily, getAurebeshFontFamily } from '../utils/fonts';
import { hapticLight } from '../utils/haptics';

/**
 * Interface for Aurebesh character data including English letter, Aurebesh character, and canonical name
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
 * LearnScreen displays the complete Aurebesh alphabet with character names.
 * Users can view all Aurebesh characters with their English equivalents and canonical names.
 * Includes interactive elements and follows the app's design system.
 */
interface LearnScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const LearnScreen: React.FC<LearnScreenProps> = ({ navigation }) => {
  const { settings } = useSettings();
  const [selectedCharacter, setSelectedCharacter] = useState<AurebeshCharacter | null>(null);
  const [currentFlashcard, setCurrentFlashcard] = useState<AurebeshCharacter | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  
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
   * Starts flashcard mode with the first character
   */
  const startFlashcards = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setIsFlashcardMode(true);
    setFlashcardIndex(0);
    setCurrentFlashcard(aurebeshAlphabet[0]);
    setShowFlashcardAnswer(false);
  };

  /**
   * Exits flashcard mode
   */
  const exitFlashcards = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setIsFlashcardMode(false);
    setCurrentFlashcard(null);
    setShowFlashcardAnswer(false);
  };

  /**
   * Shows the answer for the current flashcard
   */
  const revealFlashcardAnswer = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowFlashcardAnswer(true);
  };

  /**
   * Moves to the next flashcard
   */
  const nextFlashcard = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    const nextIndex = (flashcardIndex + 1) % aurebeshAlphabet.length;
    setFlashcardIndex(nextIndex);
    setCurrentFlashcard(aurebeshAlphabet[nextIndex]);
    setShowFlashcardAnswer(false);
  };

  /**
   * Moves to the previous flashcard
   */
  const previousFlashcard = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    const prevIndex = flashcardIndex === 0 ? aurebeshAlphabet.length - 1 : flashcardIndex - 1;
    setFlashcardIndex(prevIndex);
    setCurrentFlashcard(aurebeshAlphabet[prevIndex]);
    setShowFlashcardAnswer(false);
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
          isSelected && styles.selectedCard
        ]}
        onPress={() => handleCharacterPress(character)}
        activeOpacity={0.7}
      >
        <Text style={[styles.aurebeshCharacter, { fontFamily: getAurebeshFontFamily() }]}>
          {character.aurebesh}
        </Text>
        <Text style={[styles.englishCharacter, { fontFamily: getFontFamily() }]}>
          {character.english}
        </Text>
        <Text style={[styles.characterName, { fontFamily: getFontFamily() }]}>
          {character.name}
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Renders the detailed view for a selected character
   */
  const renderCharacterDetail = () => {
    if (!selectedCharacter) return null;

    return (
      <View style={styles.detailContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={clearSelection}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#4f81cb" />
          <Text style={[styles.backButtonText, { fontFamily: getFontFamily() }]}>
            Back to Alphabet
          </Text>
        </TouchableOpacity>

        <View style={styles.detailCard}>
          <Text style={[styles.detailAurebeshCharacter, { fontFamily: getAurebeshFontFamily() }]}>
            {selectedCharacter.aurebesh}
          </Text>
          
          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, { fontFamily: getFontFamily() }]}>
              English Letter
            </Text>
            <Text style={[styles.detailValue, { fontFamily: getFontFamily() }]}>
              {selectedCharacter.english}
            </Text>
          </View>

          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, { fontFamily: getFontFamily() }]}>
              Aurebesh Name
            </Text>
            <Text style={[styles.detailValue, { fontFamily: getFontFamily() }]}>
              {selectedCharacter.name}
            </Text>
          </View>

          <Text style={[styles.detailDescription, { fontFamily: getFontFamily() }]}>
            Tap other characters to explore the Aurebesh alphabet, or practice reading with the Read screen.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isFlashcardMode ? (
          // Flashcard Mode
          <View style={styles.flashcardContainer}>
            <View style={styles.flashcardHeader}>
              <TouchableOpacity 
                style={styles.exitButton}
                onPress={exitFlashcards}
                accessibilityRole="button"
                accessibilityLabel="Exit flashcards"
              >
                <MaterialIcons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={[styles.flashcardCounter, { fontFamily: getFontFamily() }]}>
                {flashcardIndex + 1} / {aurebeshAlphabet.length}
              </Text>
            </View>

            {currentFlashcard && (
              <View style={styles.flashcard}>
                <Text style={[styles.flashcardCharacter, { fontFamily: getAurebeshFontFamily() }]}>
                  {currentFlashcard.aurebesh}
                </Text>
                
                {showFlashcardAnswer ? (
                  <Text style={[styles.flashcardAnswer, { fontFamily: getFontFamily() }]}>
                    {currentFlashcard.english}
                  </Text>
                ) : (
                  <TouchableOpacity 
                    style={styles.revealButton}
                    onPress={revealFlashcardAnswer}
                    accessibilityRole="button"
                    accessibilityLabel="Reveal answer"
                  >
                    <Text style={[styles.revealButtonText, { fontFamily: getFontFamily() }]}>
                      Tap to reveal
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.flashcardControls}>
              <TouchableOpacity 
                style={styles.flashcardNavButton}
                onPress={previousFlashcard}
                accessibilityRole="button"
                accessibilityLabel="Previous flashcard"
              >
                <MaterialIcons name="chevron-left" size={32} color="#ffffff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.flashcardNavButton}
                onPress={nextFlashcard}
                accessibilityRole="button"
                accessibilityLabel="Next flashcard"
              >
                <MaterialIcons name="chevron-right" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        ) : selectedCharacter ? renderCharacterDetail() : (
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <MaterialIcons name="school" size={48} color="#4f81cb" />
              <Text style={[styles.title, { fontFamily: getFontFamily() }]}>
                Learn Aurebesh
              </Text>
              <Text style={[styles.subtitle, { fontFamily: getFontFamily() }]}>
                Master the ancient writing system of the galaxy far, far away
              </Text>
            </View>

            {/* Alphabet Reference Button */}
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={async () => {
                await hapticLight(settings.hapticFeedbackEnabled);
                navigation.navigate('Alphabet');
              }}
              accessibilityRole="button"
              accessibilityLabel="View Aurebesh alphabet reference"
            >
              <MaterialIcons name="language" size={24} color="#4f81cb" style={styles.settingIcon} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { fontFamily: getFontFamily() }]}>
                  Aurebesh Alphabet
                </Text>
                <Text style={[styles.settingDescription, { fontFamily: getFontFamily() }]}>
                  View complete alphabet reference
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            {/* Flashcard Practice Section */}
            <View style={styles.flashcardSection}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="quiz" size={24} color="#4f81cb" />
                <Text style={[styles.sectionTitle, { fontFamily: getFontFamily() }]}>
                  Flashcard Practice
                </Text>
              </View>
              
              <Text style={[styles.sectionDescription, { fontFamily: getFontFamily() }]}>
                Practice recognizing Aurebesh characters with interactive flashcards
              </Text>

              <TouchableOpacity 
                style={styles.startButton}
                onPress={startFlashcards}
                accessibilityRole="button"
                accessibilityLabel="Start flashcard practice"
              >
                <MaterialIcons name="play-arrow" size={24} color="#ffffff" />
                <Text style={[styles.startButtonText, { fontFamily: getFontFamily() }]}>
                  Start Practice
                </Text>
              </TouchableOpacity>

              <View style={styles.practiceInfo}>
                <Text style={[styles.practiceInfoText, { fontFamily: getFontFamily() }]}>
                  • {aurebeshAlphabet.length} characters to learn{'\n'}
                  • Tap to reveal answers{'\n'}
                  • Navigate with arrow buttons
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra space to avoid content being hidden behind tab bar
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
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
    marginTop: 60, // Add top margin to avoid dynamic island
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
  // Settings-style button styles
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  // Alphabet section styles
  alphabetSection: {
    marginTop: 16,
  },
  // Flashcard styles
  flashcardContainer: {
    flex: 1,
    paddingTop: 60,
  },
  flashcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  exitButton: {
    backgroundColor: '#4f81cb',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashcardCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
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
  flashcardCharacter: {
    fontSize: 120,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  flashcardAnswer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4f81cb',
    textAlign: 'center',
  },
  revealButton: {
    backgroundColor: '#4f81cb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  revealButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  flashcardControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  flashcardNavButton: {
    backgroundColor: '#4f81cb',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Flashcard practice section styles
  flashcardSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4f81cb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  practiceInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  practiceInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default LearnScreen;
