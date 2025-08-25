import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ScrollView,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';
import { getFontFamily, getAurebeshFontFamily } from '../utils/fonts';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';
import { getRandomWord, WordPair, getCategories } from '../utils/dictionary';
import { saveCompleteLearningSession, SessionSummary, getUserLearningStatistics, updateUserStatistics } from '../utils/learningDatabase';

/**
 * ReadScreen allows users to practice translating Aurebesh to English.
 * Users see a word written in Aurebesh and enter the English equivalent.
 * Includes hints, scoring, and difficulty progression.
 */
const ReadScreen: React.FC = () => {
  const { settings } = useSettings();
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Animation for modal content
  const modalSlideAnim = useRef(new Animated.Value(300)).current; // Start 300px below
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current; // Start transparent
  
  // Session tracking for database storage
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const [sessionQuestionsCorrect, setSessionQuestionsCorrect] = useState(0);
  const [sessionMaxStreak, setSessionMaxStreak] = useState(0);
  
  // Ref to store latest session data for cleanup
  const sessionDataRef = useRef<SessionSummary>({
    difficulty: 'easy',
    questionsAttempted: 0,
    questionsCorrect: 0,
    maxStreak: 0,
    score: 0,
    startTime: new Date(),
  });

  /**
   * Initialize the screen with a random word and start a new session
   */
  useEffect(() => {
    loadUserStatistics();
  }, []);

  /**
   * Refresh statistics when screen is focused (e.g., after returning from Settings)
   */
  useFocusEffect(
    useCallback(() => {
      refreshStatistics();
    }, [])
  );

  /**
   * Load user statistics from database and initialize session
   */
  const loadUserStatistics = async () => {
    try {
      const stats = await getUserLearningStatistics();
      if (stats) {
        // Load existing stats from database into UI
        console.log('Loading stats from database:', stats);
        setScore(stats.total_questions_correct || 0); // Correct = total correct answers
        setStreak(stats.current_streak || 0); // Load current streak from database (persists across restarts)
        setQuestionsAnswered(stats.total_questions_attempted || 0); // Total = total attempted
        setSessionQuestionsCorrect(stats.total_questions_correct || 0);
        setSessionMaxStreak(stats.best_streak || 0);
      }
      loadNewWord(); // Just load a word, don't reset stats
    } catch (error) {
      console.error('Error loading user statistics:', error);
      loadNewWord();
    }
  };

  /**
   * Refresh statistics from database without loading a new word
   */
  const refreshStatistics = async () => {
    try {
      const stats = await getUserLearningStatistics();
      if (stats) {
        console.log('Refreshing stats from database:', stats);
        setScore(stats.total_questions_correct || 0);
        setStreak(stats.current_streak || 0);
        setQuestionsAnswered(stats.total_questions_attempted || 0);
        setSessionQuestionsCorrect(stats.total_questions_correct || 0);
        setSessionMaxStreak(stats.best_streak || 0);
      } else {
        // If no stats found (e.g., after reset), set everything to 0
        console.log('No stats found, resetting to zero');
        setScore(0);
        setStreak(0);
        setQuestionsAnswered(0);
        setSessionQuestionsCorrect(0);
        setSessionMaxStreak(0);
      }
    } catch (error) {
      console.error('Error refreshing user statistics:', error);
    }
  };

  /**
   * Load new word when difficulty changes
   */
  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  /**
   * Update session data ref whenever values change
   */
  useEffect(() => {
    sessionDataRef.current = {
      difficulty,
      questionsAttempted: questionsAnswered,
      questionsCorrect: score, // Use score (correct answers) instead of sessionQuestionsCorrect
      maxStreak: streak, // Use current streak instead of sessionMaxStreak
      score,
      startTime: sessionStartTime,
    };
  }, [difficulty, questionsAnswered, score, streak, sessionStartTime]);

  /**
   * Animate modal content when modal visibility changes
   */
  useEffect(() => {
    if (showDifficultyModal) {
      // Show modal first, then animate in
      setModalVisible(true);
      
      // Reset to initial positions before animating in
      backdropOpacityAnim.setValue(0);
      modalSlideAnim.setValue(300);
      
      // Animate backdrop fade in and modal slide in
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
      // Animate backdrop fade out and modal slide out
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
        // Hide modal after animation completes
        setModalVisible(false);
      });
    }
  }, [showDifficultyModal, modalSlideAnim, backdropOpacityAnim]);

  /**
   * Save stats to database whenever score, streak, or questionsAnswered changes
   */
  useEffect(() => {
    // Only save if at least one question has been answered
    if (questionsAnswered > 0) {
      console.log('Stats changed, updating database:', {
        questions_attempted: questionsAnswered,
        questions_correct: score,
        current_streak: streak,
        difficulty,
      });
      
      // Use a timeout to debounce rapid state changes
      const timeoutId = setTimeout(() => {
        updateUserStatistics({
          questions_attempted: questionsAnswered,
          questions_correct: score,
          current_streak: streak,
          difficulty,
        });
      }, 100); // Wait 100ms before saving to avoid race conditions
      
      return () => clearTimeout(timeoutId);
    }
  }, [score, streak, questionsAnswered]); // Save whenever any of these change

  /**
   * Save session when component unmounts
   */
  useEffect(() => {
    return () => {
      // Save final session when component unmounts using ref data
      if (sessionDataRef.current.questionsAttempted > 0) {
        console.log('Component unmounting, saving final session with data:', sessionDataRef.current);
        saveCompleteLearningSession(sessionDataRef.current);
      }
    };
  }, []);

  /**
   * Start a new learning session (don't reset stats from database)
   */
  const startNewSession = () => {
    setSessionStartTime(new Date());
    // Don't reset score, streak, questionsAnswered - they come from database
    loadNewWord();
  };

  /**
   * Save the current session to the database
   */
  const saveCurrentSession = async () => {
    try {
      const sessionData: SessionSummary = {
        difficulty,
        questionsAttempted: questionsAnswered,
        questionsCorrect: sessionQuestionsCorrect,
        maxStreak: sessionMaxStreak,
        score,
        startTime: sessionStartTime,
      };

      console.log('Attempting to save session with data:', sessionData);

      const success = await saveCompleteLearningSession(sessionData);
      if (!success) {
        console.warn('Failed to save learning session to database');
      } else {
        console.log('✅ Successfully saved learning session to database!');
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  /**
   * Reset session for new difficulty
   */
  const resetSessionForNewDifficulty = async () => {
    // Save current session before resetting
    if (questionsAnswered > 0) {
      await saveCurrentSession();
    }
    
    // Start fresh session with new difficulty
    startNewSession();
  };

  /**
   * Load a new random word based on current difficulty
   */
  const loadNewWord = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
    setIsCorrect(null);
  };

  /**
   * Check if the user's answer is correct
   */
  const checkAnswer = async () => {
    if (!currentWord || !userAnswer.trim()) {
      await hapticLight(settings.hapticFeedbackEnabled);
      Alert.alert('Enter an Answer', 'Please enter your translation before submitting.');
      return;
    }

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentWord.english.toLowerCase();
    setIsCorrect(isAnswerCorrect);

    // Update session statistics
    const newQuestionsAnswered = questionsAnswered + 1;

    if (isAnswerCorrect) {
      await hapticSuccess(settings.hapticFeedbackEnabled);
      const newScore = score + 1;
      const newStreak = streak + 1;
      
      console.log('Correct answer! Setting new streak:', newStreak);
      
      // Batch all state updates together to prevent multiple useEffect triggers
      setScore(newScore);
      setStreak(newStreak);
      setQuestionsAnswered(newQuestionsAnswered);
      
      // Auto-advance after correct answer
      setTimeout(() => {
        loadNewWord();
      }, 1500);
    } else {
      await hapticMedium(settings.hapticFeedbackEnabled);
      console.log('Wrong answer! Resetting streak to 0');
      
      // Batch state updates
      setStreak(0); // Reset streak on wrong answer
      setQuestionsAnswered(newQuestionsAnswered);
    }

    // Database save happens automatically via useEffect
  };

  /**
   * Show hint for the current word
   */
  const handleShowHint = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setShowHint(true);
  };

  /**
   * Reveal the correct answer
   */
  const handleShowAnswer = async () => {
    await hapticMedium(settings.hapticFeedbackEnabled);
    setShowAnswer(true);
    setStreak(0); // Reset streak when showing answer
  };

  /**
   * Skip to next word
   */
  const handleSkip = async () => {
    await hapticLight(settings.hapticFeedbackEnabled);
    setStreak(0); // Reset streak when skipping
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    loadNewWord();
  };

  /**
   * Change difficulty level
   */
  const handleDifficultyChange = async (newDifficulty: 'easy' | 'medium' | 'hard') => {
    await hapticLight(settings.hapticFeedbackEnabled);
    
    // Don't reset session when changing difficulty, just update difficulty
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);
  };

  /**
   * Get hint text for the current word
   */
  const getHintText = (): string => {
    if (!currentWord) return '';
    
    const word = currentWord.english;
    const firstLetter = word.charAt(0).toUpperCase();
    const blanks = '_'.repeat(word.length - 1);
    return `${firstLetter}${blanks} (${word.length} letters, ${currentWord.category})`;
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
        <MaterialIcons name="chrome-reader-mode" size={48} color="#4f81cb" />
        <Text style={[styles.title, { fontFamily: getFontFamily() }]}>Read Aurebesh</Text>
        <Text style={[styles.subtitle, { fontFamily: getFontFamily() }]}>
          Translate Aurebesh characters to English
        </Text>
      </View>

      {/* Stats - HIDDEN FOR NOW */}
      {/* 
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
      */}

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
            Translate this Aurebesh word:
          </Text>
          
          {/* Aurebesh Text Display */}
          <View style={styles.aurebeshContainer}>
            <Text style={[styles.aurebeshText, { fontFamily: getAurebeshFontFamily() }]}>
              {currentWord.aurebesh}
            </Text>
          </View>
          
          {/* Hint Display */}
          {showHint && (
            <View style={styles.hintContainer}>
              <MaterialIcons name="lightbulb" size={16} color="#ff9500" />
              <Text style={[styles.hintText, { fontFamily: getFontFamily() }]}>
                {getHintText()}
              </Text>
            </View>
          )}

          {/* Answer Reveal */}
          {showAnswer && (
            <View style={styles.answerContainer}>
              <MaterialIcons name="visibility" size={16} color="#4CAF50" />
              <Text style={[styles.answerText, { fontFamily: getFontFamily() }]}>
                Answer: {currentWord.english}
              </Text>
            </View>
          )}
          
          {/* Input Field */}
          <TextInput
            style={[styles.input, { 
              fontFamily: getFontFamily(),
              borderColor: getAnswerColor()
            }]}
            placeholder="Enter English translation..."
            value={userAnswer}
            onChangeText={setUserAnswer}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!showAnswer}
          />

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
                {isCorrect ? 'Correct! Well done!' : `Incorrect. The answer is "${currentWord.english}"`}
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
          onPress={handleShowHint}
          disabled={showHint || showAnswer}
        >
          <MaterialIcons 
            name="lightbulb-outline" 
            size={20} 
            color={showHint || showAnswer ? "#ccc" : "#666"} 
          />
          <Text style={[styles.actionButtonText, { 
            fontFamily: getFontFamily(),
            color: showHint || showAnswer ? "#ccc" : "#666"
          }]}>
            Hint
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  difficultyText: {
    fontSize: 16,
    color: '#4f81cb',
    marginHorizontal: 8,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 32,
    color: '#333',
    textAlign: 'center',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  hintText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#F57C00',
    flex: 1,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#81C784',
  },
  answerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#388E3C',
    flex: 1,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    fontSize: 16,
    color: '#333',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  feedbackText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  submitButton: {
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
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  difficultyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedDifficulty: {
    backgroundColor: '#4f81cb',
    borderColor: '#4f81cb',
  },
  difficultyOptionText: {
    fontSize: 16,
  },
});

export default ReadScreen;
