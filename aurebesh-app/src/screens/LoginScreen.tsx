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
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getFontFamily } from '../utils/fonts';

/**
 * LoginScreen allows users to log in using Supabase authentication.
 * Features a modern UI matching the RegisterScreen design with session persistence handled by AuthContext.
 */
const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  /**
   * Handles user login using Supabase authentication.
   * Displays appropriate error messages for failed login attempts.
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        Alert.alert('Login Failed', error.message);
      }
      // Navigation to home screen is handled automatically by AppNavigator
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
        {/* Glow Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/glow_login.png')} 
            style={styles.glowImage}
            resizeMode="contain"
          />
        </View>

        {/* App Title */}
        <Text style={styles.appTitle}>Aurebesh</Text>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome back! Sign in to continue.</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Email Input with @ Icon */}
          <View style={styles.inputWrapper}>
            <MaterialIcons 
              name="alternate-email" 
              size={20} 
              color="#4f81cb" 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              placeholderTextColor="#999"
            />
          </View>
          
          {/* Password Input with Lock Icon */}
          <View style={styles.inputWrapper}>
            <MaterialIcons 
              name="lock" 
              size={20} 
              color="#4f81cb" 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Register link */}
        <TouchableOpacity 
          style={styles.registerLinkContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerLinkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
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
    fontFamily: getFontFamily(),
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: getFontFamily(),
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4f81cb',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    fontFamily: getFontFamily(),
  },
  loginButton: {
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
  loginButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: getFontFamily(),
  },
  registerLinkContainer: {
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 16,
    color: '#999',
    fontFamily: getFontFamily(),
  },
});

export default LoginScreen;
