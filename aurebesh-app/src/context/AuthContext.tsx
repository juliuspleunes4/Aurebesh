import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

/**
 * Authentication context interface defining the shape of auth-related data and functions.
 */
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any; data?: any }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ error?: any }>;
}

/**
 * Authentication context for managing user authentication state across the app.
 * Provides session management, user data, and authentication functions.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access the authentication context.
 * Must be used within an AuthProvider component.
 * @returns The authentication context containing session, user, and auth functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication provider component that wraps the app and manages auth state.
 * Handles session persistence, authentication functions, and loading states.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize authentication state by checking for existing session.
   * Sets up session listener to handle auth state changes.
   */
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign in user with email and password.
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with error if sign in fails
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  /**
   * Sign up new user with email and password.
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with error if sign up fails, and user data if successful
   */
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error, data };
  };

  /**
   * Sign out the current user and clear session.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  /**
   * Delete the current user's account permanently.
   * This action cannot be undone and will remove all user data.
   * @returns Promise with error if deletion fails
   */
  const deleteAccount = async () => {
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { error: userError || new Error('No user found') };
      }

      // Delete the user using Supabase's built-in user deletion
      // This will remove the user from auth.users and trigger any cascading deletions
      const { error } = await supabase.rpc('delete_user');

      if (error) {
        return { error };
      }

      // Explicitly sign out to clear local session/tokens
      await supabase.auth.signOut();
      
      return {};
    } catch (error) {
      return { error };
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
