import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { useAuth } from '../context/AuthContext';

/**
 * RegisterScreen allows users to create an account using Supabase authentication.
 * Features a modern UI with email verification and session persistence handled by AuthContext.
 */
const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  /**
   * Handles user registration using Supabase authentication.
   * Validates input and displays appropriate success/error messages.
   */
  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password Too Short', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const { error, data } = await signUp(email, password);
      if (error) {
        Alert.alert('Registration Failed', error.message);
      } else {
        // Check if user was automatically logged in or needs email confirmation
        const needsConfirmation = !data.session && data.user && !data.user.email_confirmed_at;
        
        if (needsConfirmation) {
          Alert.alert(
            'Registration Successful', 
            'Please check your email and click the confirmation link before logging in.'
          );
        } else {
          Alert.alert(
            'Registration Successful', 
            'Welcome to Aurebesh! You are now logged in.'
          );
        }
        // AuthContext will handle navigation automatically based on session state
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.contentContainer}>
        {/* Glow Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/glow_happy_blue.png')} 
            style={styles.glowImage}
            resizeMode="contain"
          />
        </View>

        {/* App Title */}
        <Text style={styles.appTitle}>Aurebesh</Text>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome! Let's get you started.</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            placeholderTextColor="#999"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Already have account link */}
        <TouchableOpacity 
          style={styles.loginLinkContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -60,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowImage: {
    width: 130,
    height: 130,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'sans-serif-medium',
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'sans-serif',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4f81cb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'sans-serif',
  },
  registerButton: {
    backgroundColor: '#4f81cb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4f81cb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'sans-serif-medium',
  },
  loginLinkContainer: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'sans-serif',
  },
});

export default RegisterScreen;
