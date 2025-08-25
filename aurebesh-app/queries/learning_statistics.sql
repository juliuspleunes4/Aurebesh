-- Learning Statistics Table
-- Stores user learning progress, scores, and statistics for the Aurebesh app

-- Create the learning_sessions table to track individual learning sessions
CREATE TABLE IF NOT EXISTS learning_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  final_score INTEGER DEFAULT 0,
  session_duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the learning_statistics table for overall user progress
CREATE TABLE IF NOT EXISTS learning_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_sessions INTEGER DEFAULT 0,
  total_questions_attempted INTEGER DEFAULT 0,
  total_questions_correct INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  total_time_spent_seconds INTEGER DEFAULT 0,
  easy_questions_correct INTEGER DEFAULT 0,
  medium_questions_correct INTEGER DEFAULT 0,
  hard_questions_correct INTEGER DEFAULT 0,
  easy_questions_attempted INTEGER DEFAULT 0,
  medium_questions_attempted INTEGER DEFAULT 0,
  hard_questions_attempted INTEGER DEFAULT 0,
  first_session_date TIMESTAMP WITH TIME ZONE,
  last_session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_created_at ON learning_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_learning_statistics_user_id ON learning_statistics(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_statistics ENABLE ROW LEVEL SECURITY;

-- Add current_streak column if it doesn't exist (migration for existing databases)
-- This ensures existing users get the current_streak functionality
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='learning_statistics' AND column_name='current_streak'
  ) THEN
    ALTER TABLE learning_statistics ADD COLUMN current_streak INTEGER DEFAULT 0;
    RAISE NOTICE 'Added current_streak column to learning_statistics table';
  ELSE
    RAISE NOTICE 'current_streak column already exists in learning_statistics table';
  END IF;
END $$;

-- Create RLS policies
-- Users can only access their own learning sessions
CREATE POLICY "Users can view their own learning sessions" ON learning_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning sessions" ON learning_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning sessions" ON learning_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only access their own learning statistics
CREATE POLICY "Users can view their own learning statistics" ON learning_statistics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning statistics" ON learning_statistics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning statistics" ON learning_statistics
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to update learning statistics when a session is completed
CREATE OR REPLACE FUNCTION update_learning_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update the user's learning statistics
  INSERT INTO learning_statistics (
    user_id,
    total_sessions,
    total_questions_attempted,
    total_questions_correct,
    best_streak,
    best_score,
    total_time_spent_seconds,
    easy_questions_correct,
    medium_questions_correct,
    hard_questions_correct,
    easy_questions_attempted,
    medium_questions_attempted,
    hard_questions_attempted,
    first_session_date,
    last_session_date
  ) VALUES (
    NEW.user_id,
    1,
    COALESCE(NEW.questions_attempted, 0),
    COALESCE(NEW.questions_correct, 0),
    COALESCE(NEW.max_streak, 0),
    COALESCE(NEW.final_score, 0),
    COALESCE(NEW.session_duration_seconds, 0),
    CASE WHEN NEW.difficulty = 'easy' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    CASE WHEN NEW.difficulty = 'medium' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    CASE WHEN NEW.difficulty = 'hard' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    CASE WHEN NEW.difficulty = 'easy' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    CASE WHEN NEW.difficulty = 'medium' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    CASE WHEN NEW.difficulty = 'hard' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    NEW.session_start,
    NEW.session_start
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_sessions = learning_statistics.total_sessions + 1,
    total_questions_attempted = learning_statistics.total_questions_attempted + COALESCE(NEW.questions_attempted, 0),
    total_questions_correct = learning_statistics.total_questions_correct + COALESCE(NEW.questions_correct, 0),
    best_streak = GREATEST(learning_statistics.best_streak, COALESCE(NEW.max_streak, 0)),
    best_score = GREATEST(learning_statistics.best_score, COALESCE(NEW.final_score, 0)),
    total_time_spent_seconds = learning_statistics.total_time_spent_seconds + COALESCE(NEW.session_duration_seconds, 0),
    easy_questions_correct = learning_statistics.easy_questions_correct + 
      CASE WHEN NEW.difficulty = 'easy' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    medium_questions_correct = learning_statistics.medium_questions_correct + 
      CASE WHEN NEW.difficulty = 'medium' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    hard_questions_correct = learning_statistics.hard_questions_correct + 
      CASE WHEN NEW.difficulty = 'hard' THEN COALESCE(NEW.questions_correct, 0) ELSE 0 END,
    easy_questions_attempted = learning_statistics.easy_questions_attempted + 
      CASE WHEN NEW.difficulty = 'easy' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    medium_questions_attempted = learning_statistics.medium_questions_attempted + 
      CASE WHEN NEW.difficulty = 'medium' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    hard_questions_attempted = learning_statistics.hard_questions_attempted + 
      CASE WHEN NEW.difficulty = 'hard' THEN COALESCE(NEW.questions_attempted, 0) ELSE 0 END,
    last_session_date = NEW.session_start,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update statistics when a session ends
CREATE TRIGGER trigger_update_learning_statistics
  AFTER UPDATE OF session_end ON learning_sessions
  FOR EACH ROW
  WHEN (NEW.session_end IS NOT NULL AND OLD.session_end IS NULL)
  EXECUTE FUNCTION update_learning_statistics();

-- Function to get user learning statistics (for easy querying from the app)
CREATE OR REPLACE FUNCTION get_user_learning_stats(target_user_id UUID DEFAULT auth.uid())
RETURNS TABLE (
  total_sessions INTEGER,
  total_questions_attempted INTEGER,
  total_questions_correct INTEGER,
  accuracy_percentage NUMERIC,
  best_streak INTEGER,
  current_streak INTEGER,
  best_score INTEGER,
  total_time_spent_seconds INTEGER,
  easy_accuracy NUMERIC,
  medium_accuracy NUMERIC,
  hard_accuracy NUMERIC,
  first_session_date TIMESTAMP WITH TIME ZONE,
  last_session_date TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ls.total_sessions,
    ls.total_questions_attempted,
    ls.total_questions_correct,
    CASE 
      WHEN ls.total_questions_attempted > 0 
      THEN ROUND((ls.total_questions_correct::NUMERIC / ls.total_questions_attempted::NUMERIC) * 100, 2)
      ELSE 0::NUMERIC 
    END as accuracy_percentage,
    ls.best_streak,
    ls.current_streak,
    ls.best_score,
    ls.total_time_spent_seconds,
    CASE 
      WHEN ls.easy_questions_attempted > 0 
      THEN ROUND((ls.easy_questions_correct::NUMERIC / ls.easy_questions_attempted::NUMERIC) * 100, 2)
      ELSE 0::NUMERIC 
    END as easy_accuracy,
    CASE 
      WHEN ls.medium_questions_attempted > 0 
      THEN ROUND((ls.medium_questions_correct::NUMERIC / ls.medium_questions_attempted::NUMERIC) * 100, 2)
      ELSE 0::NUMERIC 
    END as medium_accuracy,
    CASE 
      WHEN ls.hard_questions_attempted > 0 
      THEN ROUND((ls.hard_questions_correct::NUMERIC / ls.hard_questions_attempted::NUMERIC) * 100, 2)
      ELSE 0::NUMERIC 
    END as hard_accuracy,
    ls.first_session_date,
    ls.last_session_date
  FROM learning_statistics ls
  WHERE ls.user_id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
