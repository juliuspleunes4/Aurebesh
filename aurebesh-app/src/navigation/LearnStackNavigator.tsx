import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LearnScreen from '../screens/LearnScreen';
import AlphabetScreen from '../screens/AlphabetScreen';

/**
 * Type definition for the learn stack navigator parameters.
 */
export type LearnStackParamList = {
  LearnMain: undefined;
  Alphabet: undefined;
};

const Stack = createStackNavigator<LearnStackParamList>();

/**
 * LearnStackNavigator provides navigation for the Learn section.
 * Includes the main Learn screen and the Alphabet reference screen.
 */
const LearnStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="LearnMain" 
        component={LearnScreen} 
      />
      <Stack.Screen 
        name="Alphabet" 
        component={AlphabetScreen} 
      />
    </Stack.Navigator>
  );
};

export default LearnStackNavigator;
