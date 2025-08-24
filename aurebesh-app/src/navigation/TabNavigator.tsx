import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { LearnScreen, WriteScreen, ReadScreen, SettingsScreen } from '../screens';
import { useSettings } from '../context/SettingsContext';
import { hapticLight } from '../utils/haptics';
import { getFontFamily } from '../utils/fonts';

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
  const { settings } = useSettings();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4f81cb',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: getFontFamily(),
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderTopWidth: 0,
            paddingBottom: 34,
            paddingTop: 8,
            height: 90,
          },
          default: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            paddingBottom: 15,
            paddingTop: 5,
            height: 80,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }),
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
      screenListeners={{
        tabPress: () => {
          // Haptic feedback on tab press (conditional)
          hapticLight(settings.hapticFeedbackEnabled);
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
