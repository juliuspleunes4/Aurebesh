/**
 * Learning Statistics Database Service
 * Handles all database operations for tracking user learning progress
 */

// Import supabase client - make sure to create supabase.ts from supabase.ts.example
let supabase: any = null;

try {
  const supabaseModule = require('./supabase');
  supabase = supabaseModule.supabase;
} catch (error) {
  console.warn('Supabase not configured. Please create supabase.ts from supabase.ts.example');
}

/**
 * Check if Supabase is properly configured
 */
const isSupabaseAvailable = (): boolean => {
  return supabase !== null;
};

/**
 * Interface for a learning session record
 */
export interface LearningSession {
  id?: string;
  user_id?: string;
  session_start: string;
  session_end?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions_attempted: number;
  questions_correct: number;
  max_streak: number;
  final_score: number;
  session_duration_seconds?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for learning statistics
 */
export interface LearningStatistics {
  total_sessions: number;
  total_questions_attempted: number;
  total_questions_correct: number;
  accuracy_percentage: number;
  best_streak: number;
  current_streak: number; 
  best_score: number;
  total_time_spent_seconds: number;
  easy_accuracy: number;
  medium_accuracy: number;
  hard_accuracy: number;
  first_session_date?: string;
  last_session_date?: string;
}

/**
 * Interface for session summary (used during active learning)
 */
export interface SessionSummary {
  difficulty: 'easy' | 'medium' | 'hard';
  questionsAttempted: number;
  questionsCorrect: number;
  maxStreak: number;
  score: number;
  startTime: Date;
}

/**
 * Creates a new learning session in the database
 * @param sessionData - The session data to create
 * @returns Promise<string | null> - The session ID if successful, null if failed
 */
export const createLearningSession = async (sessionData: {
  difficulty: 'easy' | 'medium' | 'hard';
  session_start: string;
}): Promise<string | null> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - session not saved');
      return null;
    }

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.error('No authenticated user found');
      return null;
    }

    const { data, error } = await supabase
      .from('learning_sessions')
      .insert({
        user_id: user.user.id,
        difficulty: sessionData.difficulty,
        session_start: sessionData.session_start,
        questions_attempted: 0,
        questions_correct: 0,
        max_streak: 0,
        final_score: 0,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating learning session:', error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error('Error creating learning session:', error);
    return null;
  }
};

/**
 * Updates a learning session with final results
 * @param sessionId - The session ID to update
 * @param sessionData - The session results
 * @returns Promise<boolean> - Success status
 */
export const updateLearningSession = async (
  sessionId: string,
  sessionData: {
    questions_attempted: number;
    questions_correct: number;
    max_streak: number;
    final_score: number;
    session_end: string;
    session_duration_seconds: number;
  }
): Promise<boolean> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - session not updated');
      return false;
    }
    const { error } = await supabase
      .from('learning_sessions')
      .update({
        questions_attempted: sessionData.questions_attempted,
        questions_correct: sessionData.questions_correct,
        max_streak: sessionData.max_streak,
        final_score: sessionData.final_score,
        session_end: sessionData.session_end,
        session_duration_seconds: sessionData.session_duration_seconds,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating learning session:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating learning session:', error);
    return false;
  }
};

/**
 * Gets the user's learning statistics
 * @returns Promise<LearningStatistics | null> - The user's statistics or null if failed
 */
export const getUserLearningStatistics = async (): Promise<LearningStatistics | null> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - returning null statistics');
      return null;
    }
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.error('No authenticated user found');
      return null;
    }

    const { data, error } = await supabase.rpc('get_user_learning_stats', {
      target_user_id: user.user.id,
    });

    if (error) {
      console.error('Error fetching learning statistics:', error);
      return null;
    }

    console.log('Raw database response:', data);
    // Return the first (and only) row, or null if no data
    const result = data && data.length > 0 ? data[0] : null;
    console.log('Processed learning statistics:', result);
    return result;
  } catch (error) {
    console.error('Error fetching learning statistics:', error);
    return null;
  }
};

/**
 * Gets recent learning sessions for the user
 * @param limit - Maximum number of sessions to retrieve (default: 10)
 * @returns Promise<LearningSession[]> - Array of recent sessions
 */
export const getRecentLearningSessions = async (limit: number = 10): Promise<LearningSession[]> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - returning empty sessions');
      return [];
    }
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.error('No authenticated user found');
      return [];
    }

    const { data, error } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent learning sessions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching recent learning sessions:', error);
    return [];
  }
};

/**
 * Saves a complete learning session directly (simplified version)
 * This saves the session in one operation with all final data
 * @param sessionSummary - The complete session data
 * @returns Promise<boolean> - Success status
 */
export const saveCompleteLearningSession = async (sessionSummary: SessionSummary): Promise<boolean> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - session not saved');
      return false;
    }

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.error('No authenticated user found');
      return false;
    }

    const sessionStart = sessionSummary.startTime.toISOString();
    const sessionEnd = new Date().toISOString();
    const sessionDuration = Math.floor((new Date().getTime() - sessionSummary.startTime.getTime()) / 1000);

    console.log('Saving session with data:', {
      difficulty: sessionSummary.difficulty,
      questions_attempted: sessionSummary.questionsAttempted,
      questions_correct: sessionSummary.questionsCorrect,
      max_streak: sessionSummary.maxStreak,
      final_score: sessionSummary.score,
      session_duration_seconds: sessionDuration
    });

    // Save complete session in one operation
    const { data, error } = await supabase
      .from('learning_sessions')
      .insert({
        user_id: user.user.id,
        session_start: sessionStart,
        session_end: sessionEnd,
        difficulty: sessionSummary.difficulty,
        questions_attempted: sessionSummary.questionsAttempted,
        questions_correct: sessionSummary.questionsCorrect,
        max_streak: sessionSummary.maxStreak,
        final_score: sessionSummary.score,
        session_duration_seconds: sessionDuration,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving complete learning session:', error);
      return false;
    }

    console.log('Successfully saved session with ID:', data?.id);
    return true;
  } catch (error) {
    console.error('Error saving complete learning session:', error);
    return false;
  }
};

/**
 * Updates user statistics incrementally (for real-time updates)
 * @param updates - The statistics to update
 * @returns Promise<boolean> - Success status
 */
export const updateUserStatistics = async (updates: {
  questions_attempted?: number;
  questions_correct?: number;
  current_streak?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}): Promise<boolean> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - stats not updated');
      return false;
    }

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      console.error('No authenticated user found');
      return false;
    }

    // First, try to get existing statistics
    const { data: existing } = await supabase
      .from('learning_statistics')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (existing) {
      // Update existing record
      const updateData: any = {
        updated_at: new Date().toISOString(),
        last_session_date: new Date().toISOString(),
      };

      if (updates.questions_attempted !== undefined) {
        updateData.total_questions_attempted = updates.questions_attempted;
      }
      if (updates.questions_correct !== undefined) {
        updateData.total_questions_correct = updates.questions_correct;
      }
      if (updates.current_streak !== undefined) {
        // Update both current_streak and best_streak
        console.log('Updating current_streak in database:', updates.current_streak);
        updateData.current_streak = updates.current_streak;
        updateData.best_streak = Math.max(existing.best_streak || 0, updates.current_streak);
      }

      // Update difficulty-specific stats
      if (updates.difficulty && updates.questions_correct !== undefined && updates.questions_attempted !== undefined) {
        const difficultyCorrectField = `${updates.difficulty}_questions_correct`;
        const difficultyAttemptedField = `${updates.difficulty}_questions_attempted`;
        updateData[difficultyCorrectField] = updates.questions_correct;
        updateData[difficultyAttemptedField] = updates.questions_attempted;
      }

      const { error } = await supabase
        .from('learning_statistics')
        .update(updateData)
        .eq('user_id', user.user.id);

      if (error) {
        console.error('Error updating user statistics:', error);
        console.error('Update data was:', updateData);
        return false;
      }

      console.log('✅ Successfully updated user statistics in database with data:', updateData);
    } else {
      // Create new record
      const insertData: any = {
        user_id: user.user.id,
        total_sessions: 1,
        total_questions_attempted: updates.questions_attempted || 0,
        total_questions_correct: updates.questions_correct || 0,
        current_streak: updates.current_streak || 0,
        best_streak: updates.current_streak || 0,
        best_score: updates.questions_correct || 0,
        first_session_date: new Date().toISOString(),
        last_session_date: new Date().toISOString(),
      };

      // Set difficulty-specific stats
      if (updates.difficulty) {
        insertData[`${updates.difficulty}_questions_correct`] = updates.questions_correct || 0;
        insertData[`${updates.difficulty}_questions_attempted`] = updates.questions_attempted || 0;
      }

      const { error } = await supabase
        .from('learning_statistics')
        .insert(insertData);

      if (error) {
        console.error('Error creating user statistics:', error);
        return false;
      }
    }

    console.log('✅ Successfully updated user statistics in database');
    return true;
  } catch (error) {
    console.error('Error updating user statistics:', error);
    return false;
  }
};

/**
 * Checks if the user has any learning data
 * @returns Promise<boolean> - True if user has learning data, false otherwise
 */
export const hasLearningData = async (): Promise<boolean> => {
  try {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not configured - returning false for learning data check');
      return false;
    }
    
    const stats = await getUserLearningStatistics();
    return stats !== null && stats.total_sessions > 0;
  } catch (error) {
    console.error('Error checking learning data:', error);
    return false;
  }
};
