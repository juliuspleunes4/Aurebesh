import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Modal,
  Animated
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getFontFamily, getAurebeshFontFamily } from '../utils/fonts';
import { getRandomWord, WordPair } from '../utils/dictionary';
import { AurebeshKeyboard } from '../components/AurebeshKeyboard';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';
import { useSettings } from '../context/SettingsContext';

/**
 * WriteScreen component
 * Shows English words and users must type the Aurebesh translation
 * Features difficulty selection, scoring, and custom Aurebesh keyboard
 */
const WriteScreen: React.FC = () => {
  const { settings } = useSettings();
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Animation for modal content
  const modalSlideAnim = useRef(new Animated.Value(300)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;

  /**
   * Load new word when difficulty changes
   */
  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  /**
   * Animate modal content when modal visibility changes
   */
  useEffect(() => {
    if (showDifficultyModal) {
      setModalVisible(true);
      backdropOpacityAnim.setValue(0);
      modalSlideAnim.setValue(300);
      
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalSlideAnim, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [showDifficultyModal, modalSlideAnim, backdropOpacityAnim]);

  /**
   * Load a new random word based on current difficulty
   */
  const loadNewWord = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setUserAnswer('');
    setIsCorrect(null);
    setShowAnswer(false);
  };

  /**
   * Handle character press from Aurebesh keyboard
   */
  const handleCharacterPress = (character: string) => {
    if (showAnswer) return; // Don't allow input after showing answer
    setUserAnswer(prev => prev + character.toLowerCase());
  };

  /**
   * Handle backspace from Aurebesh keyboard
   */
  const handleBackspace = () => {
    if (showAnswer) return;
    setUserAnswer(prev => prev.slice(0, -1));
  };

  /**
   * Handle space from Aurebesh keyboard
   */
  const handleSpace = () => {
    if (showAnswer) return;
    setUserAnswer(prev => prev + ' ');
  };

  /**
   * Clear the current answer
   */
  const handleClear = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setUserAnswer('');
  };

  /**
   * Check if the user's answer is correct
   */
  const checkAnswer = async () => {
    if (!currentWord || !userAnswer.trim()) {
      await hapticLight(settings.hapticFeedbackEnabled);
      Alert.alert('Enter an Answer', 'Please type the Aurebesh translation before submitting.');
      return;
    }

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentWord.english.toLowerCase();
    setIsCorrect(isAnswerCorrect);

    const newQuestionsAnswered = questionsAnswered + 1;

    if (isAnswerCorrect) {
      await hapticSuccess(settings.hapticFeedbackEnabled);
      const newScore = score + 1;
      const newStreak = streak + 1;
      
      setScore(newScore);
      setStreak(newStreak);
      setQuestionsAnswered(newQuestionsAnswered);
      
      // Auto-advance after correct answer
      setTimeout(() => {
        loadNewWord();
      }, 1500);
    } else {
      await hapticMedium(settings.hapticFeedbackEnabled);
      setStreak(0);
      setQuestionsAnswered(newQuestionsAnswered);
    }
  };

  /**
   * Show the correct answer
   */
  const handleShowAnswer = async () => {
    await hapticMedium(settings.hapticFeedbackEnabled);
    setShowAnswer(true);
    setStreak(0);
  };

  /**
   * Skip to next word
   */
  const handleSkip = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setStreak(0);
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    loadNewWord();
  };

  /**
   * Change difficulty level
   */
  const handleDifficultyChange = async (newDifficulty: 'easy' | 'medium' | 'hard') => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);
  };

  /**
   * Get the color for answer feedback
   */
  const getAnswerColor = (): string => {
    if (isCorrect === null) return '#4f81cb';
    return isCorrect ? '#4CAF50' : '#f44336';
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={true}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="edit" size={48} color="#4f81cb" />
        <Text style={[styles.title, { fontFamily: getFontFamily() }]}>
          Write Aurebesh
        </Text>
        <Text style={[styles.subtitle, { fontFamily: getFontFamily() }]}>
          Type the Aurebesh translation for English words
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontFamily: getFontFamily() }]}>{score}</Text>
          <Text style={[styles.statLabel, { fontFamily: getFontFamily() }]}>Correct</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontFamily: getFontFamily() }]}>{streak}</Text>
          <Text style={[styles.statLabel, { fontFamily: getFontFamily() }]}>Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontFamily: getFontFamily() }]}>{questionsAnswered}</Text>
          <Text style={[styles.statLabel, { fontFamily: getFontFamily() }]}>Total</Text>
        </View>
      </View>

      {/* Difficulty Selector */}
      <TouchableOpacity 
        style={styles.difficultyButton} 
        onPress={() => setShowDifficultyModal(true)}
      >
        <MaterialIcons name="tune" size={20} color="#4f81cb" />
        <Text style={[styles.difficultyText, { fontFamily: getFontFamily() }]}>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Text>
        <MaterialIcons name="expand-more" size={20} color="#4f81cb" />
      </TouchableOpacity>

      {/* Question Card */}
      {currentWord && (
        <View style={styles.questionCard}>
          <Text style={[styles.instructionText, { fontFamily: getFontFamily() }]}>
            Write this word in Aurebesh:
          </Text>
          
          {/* English Word Display */}
          <View style={styles.englishContainer}>
            <Text style={[styles.englishText, { fontFamily: getFontFamily() }]}>
              {currentWord.english}
            </Text>
          </View>

          {/* Answer Reveal */}
          {showAnswer && (
            <View style={styles.answerContainer}>
              <MaterialIcons name="visibility" size={16} color="#4CAF50" />
              <Text style={[styles.answerLabel, { fontFamily: getFontFamily() }]}>
                Aurebesh:
              </Text>
              <Text style={[styles.answerText, { fontFamily: getAurebeshFontFamily() }]}>
                {currentWord.english}
              </Text>
            </View>
          )}
          
          {/* User Input Display */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { fontFamily: getFontFamily() }]}>
              Your Aurebesh:
            </Text>
            <View style={[styles.inputDisplay, { borderColor: getAnswerColor() }]}>
              {userAnswer ? (
                <Text style={[styles.userAnswerText, { fontFamily: getAurebeshFontFamily() }]}>
                  {userAnswer}
                </Text>
              ) : (
                <Text style={[styles.placeholderText, { fontFamily: getFontFamily() }]}>
                  Type using the keyboard below...
                </Text>
              )}
            </View>
          </View>

          {/* Feedback */}
          {isCorrect !== null && (
            <View style={[styles.feedbackContainer, { 
              backgroundColor: isCorrect ? '#E8F5E8' : '#FFEBEE' 
            }]}>
              <MaterialIcons 
                name={isCorrect ? 'check-circle' : 'cancel'} 
                size={20} 
                color={isCorrect ? '#4CAF50' : '#f44336'} 
              />
              <Text style={[styles.feedbackText, { 
                fontFamily: getFontFamily(),
                color: isCorrect ? '#4CAF50' : '#f44336'
              }]}>
                {isCorrect ? 'Correct! Well done!' : `Incorrect. Try again or see the answer above.`}
              </Text>
            </View>
          )}
          
          {/* Submit Button */}
          {!showAnswer && isCorrect === null && (
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: getAnswerColor() }]} 
              onPress={checkAnswer}
            >
              <Text style={[styles.submitButtonText, { fontFamily: getFontFamily() }]}>
                Check Answer
              </Text>
            </TouchableOpacity>
          )}

          {/* Next Button (after correct answer) */}
          {isCorrect === true && (
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: '#4CAF50' }]} 
              onPress={loadNewWord}
            >
              <Text style={[styles.submitButtonText, { fontFamily: getFontFamily() }]}>
                Next Word
              </Text>
            </TouchableOpacity>
          )}

          {/* Try Again Button (after incorrect answer) */}
          {isCorrect === false && !showAnswer && (
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: '#ff9500' }]} 
              onPress={loadNewWord}
            >
              <Text style={[styles.submitButtonText, { fontFamily: getFontFamily() }]}>
                Try Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleClear}
        >
          <MaterialIcons name="backspace" size={20} color="#666" />
          <Text style={[styles.actionButtonText, { fontFamily: getFontFamily() }]}>
            Clear
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleShowAnswer}
          disabled={showAnswer}
        >
          <MaterialIcons 
            name="visibility" 
            size={20} 
            color={showAnswer ? "#ccc" : "#666"} 
          />
          <Text style={[styles.actionButtonText, { 
            fontFamily: getFontFamily(),
            color: showAnswer ? "#ccc" : "#666"
          }]}>
            Show Answer
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSkip}>
          <MaterialIcons name="skip-next" size={20} color="#666" />
          <Text style={[styles.actionButtonText, { fontFamily: getFontFamily() }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Aurebesh Keyboard */}
      <View style={styles.keyboardContainer}>
        <AurebeshKeyboard
          onCharacterPress={handleCharacterPress}
          onBackspace={handleBackspace}
          onSpace={handleSpace}
          onClear={handleClear}
        />
      </View>

      {/* Difficulty Selection Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setShowDifficultyModal(false)}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: backdropOpacityAnim }]}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: modalSlideAnim }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontFamily: getFontFamily() }]}>
                Select Difficulty
              </Text>
              <TouchableOpacity onPress={() => setShowDifficultyModal(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.difficultyOption, difficulty === level && styles.selectedDifficulty]}
                onPress={() => handleDifficultyChange(level)}
              >
                <Text style={[styles.difficultyOptionText, { 
                  fontFamily: getFontFamily(),
                  color: difficulty === level ? '#fff' : '#333'
                }]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
                {difficulty === level && (
                  <MaterialIcons name="check" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Animated.View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 100, // Space for tab bar
  },
  header: {
    alignItems: 'center',
    paddingTop: 75,
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
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f81cb',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  difficultyText: {
    fontSize: 16,
    color: '#4f81cb',
    marginHorizontal: 8,
    fontWeight: '500',
  },
  questionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  englishContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  englishText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  answerLabel: {
    fontSize: 14,
    color: '#4CAF50',
    marginHorizontal: 8,
    fontWeight: '500',
  },
  answerText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputDisplay: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    minHeight: 60,
    justifyContent: 'center',
  },
  userAnswerText: {
    fontSize: 20,
    color: '#4f81cb',
    lineHeight: 28,
    textAlign: 'left',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'left',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#4f81cb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  keyboardContainer: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: 300,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  difficultyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  selectedDifficulty: {
    backgroundColor: '#4f81cb',
  },
  difficultyOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WriteScreen;
