import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LearnScreen, WriteScreen, ReadScreen, SettingsScreen } from '../screens';

/**
 * Type definition for the tab navigator parameters.
 * Defines the tab screens and their expected parameters for type safety.
 */
export type TabParamList = {
  Learn: undefined;
  Write: undefined;
  Read: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * TabNavigator provides the main navigation for authenticated users.
 * Features bottom tabs for Learn, Write, Read, and Settings screens.
 */
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4f81cb',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 15,
          paddingTop: 5,
          height: 80,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerStyle: {
          backgroundColor: '#4f81cb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      screenListeners={{
        tabPress: () => {
          // Haptic feedback on tab press
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="school" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Write"
        component={WriteScreen}
        options={{
          title: 'Write',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="edit" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Read"
        component={ReadScreen}
        options={{
          title: 'Read',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chrome-reader-mode" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
