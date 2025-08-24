import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

/**
 * Custom animated auth navigator that provides smooth wipe transitions
 * between Login and Register screens using React Native's built-in Animated API.
 */

const { width: screenWidth } = Dimensions.get('window');

type AuthScreen = 'Login' | 'Register';

interface NavigationProp {
  navigate: (screen: AuthScreen) => void;
}

export const AnimatedAuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('Login');
  
  // Animated values for both screens
  const loginTranslateX = useRef(new Animated.Value(0)).current;
  const registerTranslateX = useRef(new Animated.Value(screenWidth)).current;
  const loginOpacity = useRef(new Animated.Value(1)).current;
  const registerOpacity = useRef(new Animated.Value(0)).current;

  // Create navigation function for screens
  const navigation: NavigationProp = {
    navigate: (screenName: AuthScreen) => {
      if (screenName !== currentScreen) {
        animateToScreen(screenName);
      }
    },
  };

  const animateToScreen = (targetScreen: AuthScreen) => {
    const isGoingToRegister = targetScreen === 'Register';
    
    // Create parallel animations for smooth transition
    Animated.parallel([
      // Login screen animation
      Animated.timing(loginTranslateX, {
        toValue: isGoingToRegister ? -screenWidth : 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(loginOpacity, {
        toValue: isGoingToRegister ? 0 : 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Register screen animation
      Animated.timing(registerTranslateX, {
        toValue: isGoingToRegister ? 0 : screenWidth,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(registerOpacity, {
        toValue: isGoingToRegister ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentScreen(targetScreen);
    });
  };

  return (
    <View style={styles.container}>
      {/* Login Screen */}
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{ translateX: loginTranslateX }],
            opacity: loginOpacity,
          },
        ]}
        pointerEvents={currentScreen === 'Login' ? 'auto' : 'none'}
      >
        <LoginScreen navigation={navigation} />
      </Animated.View>

      {/* Register Screen */}
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{ translateX: registerTranslateX }],
            opacity: registerOpacity,
          },
        ]}
        pointerEvents={currentScreen === 'Register' ? 'auto' : 'none'}
      >
        <RegisterScreen navigation={navigation} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
