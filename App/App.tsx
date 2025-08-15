import React from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen"
import TaskScreen from "./screens/TaskScreen"
import EditTask from "./screens/EditTask"
import WelcomeScreen from "./screens/WelcomeScreen";
import {COLORS} from "./constants/theme"

export type RootStackParamList = {
  Welcome:undefined;
  Home: undefined;
  Task: undefined;
  EditTask: { task: any }; // must match what you pass from HomeScreen
};

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName={"Welcome"}
          screenOptions={{
            headerShown: true, // Enable headers by default
            headerStyle: {
              backgroundColor: COLORS.background // Match StatusBar color
            },
            headerTintColor: '#000', // Text color for header
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          
        />
        <Stack.Screen
          name="Task" 
          component={TaskScreen}
        />

        <Stack.Screen 
          name="EditTask" 
          component={EditTask} 
        />


      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
