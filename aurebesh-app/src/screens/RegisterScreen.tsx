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
  Modal,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getFontFamily } from '../utils/fonts';

/**
 * RegisterScreen allows users to create an account using Supabase authentication.
 * Features a modern UI with email verification and session persistence handled by AuthContext.
 */
const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const { signUp } = useAuth();

  /**
   * Validates that both email fields match before proceeding with registration.
   * @returns true if emails match, false otherwise
   */
  const validateEmails = (): boolean => {
    if (email !== confirmEmail) {
      Alert.alert('Email Mismatch', 'Please make sure both email addresses match.');
      return false;
    }
    return true;
  };

  /**
   * Handles user registration using Supabase authentication.
   * Validates email confirmation and displays appropriate success/error messages.
   */
  const handleRegister = async () => {
    if (!email || !confirmEmail || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (!validateEmails()) {
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
        {/* Glow Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/glow_register.png')}
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
          
          {/* Confirm Email Input with @ Icon */}
          <View style={styles.inputWrapper}>
            <MaterialIcons 
              name="alternate-email" 
              size={20} 
              color="#4f81cb" 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Confirm e-mail"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
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

        {/* Privacy Policy Link */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            By registering, you agree to our{' '}
            <Text 
              style={styles.privacyLink}
              onPress={() => setShowPrivacyPolicy(true)}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPrivacyPolicy(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowPrivacyPolicy(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.privacyPolicyText}>
              <Text style={styles.sectionTitle}>Privacy Policy for Aurebesh{'\n\n'}</Text>
              
              <Text style={styles.sectionTitle}>Information We Collect{'\n'}</Text>
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:{'\n\n'}
              • Email address for account creation and authentication{'\n'}
              • Learning progress and preferences{'\n'}
              • Usage data to improve our services{'\n\n'}
              
              <Text style={styles.sectionTitle}>How We Use Your Information{'\n'}</Text>
              We use the information we collect to:{'\n\n'}
              • Provide, maintain, and improve our services{'\n'}
              • Process authentication and account management{'\n'}
              • Send you technical notices and support messages{'\n'}
              • Understand how you use our services to make improvements{'\n\n'}
              
              <Text style={styles.sectionTitle}>Data Security{'\n'}</Text>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.{'\n\n'}
              
              <Text style={styles.sectionTitle}>Data Retention{'\n'}</Text>
              We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time.{'\n\n'}
              
              <Text style={styles.sectionTitle}>Third-Party Services{'\n'}</Text>
              Our app uses Supabase for authentication and data storage. Please review their privacy policy to understand how they handle your data.{'\n\n'}
              
              <Text style={styles.sectionTitle}>Contact Us{'\n'}</Text>
              If you have any questions about this Privacy Policy, please contact us through our app or visit our website for more information:{'\n\n'}
              
              <Text 
                style={styles.websiteLink}
                onPress={() => Linking.openURL('https://aurebesh.app')}
              >
                https://aurebesh.app
              </Text>
              {'\n\n'}
              
              <Text style={styles.lastUpdated}>Last updated: August 2025</Text>
            </Text>
            
            {/* Empty space for scroll room */}
            <View style={styles.modalBottomSpace} />
          </ScrollView>
        </View>
      </Modal>
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
  input: {
    borderWidth: 1,
    borderColor: '#4f81cb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    fontFamily: getFontFamily(),
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
    fontFamily: getFontFamily(),
  },
  loginLinkContainer: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    color: '#999',
    fontFamily: getFontFamily(),
  },
  privacyContainer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontFamily: getFontFamily(),
  },
  privacyLink: {
    color: '#4f81cb',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: getFontFamily(),
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  privacyPolicyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    fontFamily: getFontFamily(),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  websiteLink: {
    color: '#4f81cb',
    textDecorationLine: 'underline',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  modalBottomSpace: {
    height: 50,
  },
});

export default RegisterScreen;
