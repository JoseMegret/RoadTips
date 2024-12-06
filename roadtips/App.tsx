import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MapIcon, User, PlusCircle } from 'lucide-react-native';

import LoginScreen from './screens/login-screen';
import MainScreen from './screens/main-screen';
import ProfileScreen from './screens/profile-screen';
import GuideScreen from './screens/guide-screen';
import SuggestScreen from './screens/suggest-screen';
import SettingsScreen from './screens/settings-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={MainScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Suggest" 
        component={SuggestScreen}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />,
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Guide" 
          component={GuideScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

