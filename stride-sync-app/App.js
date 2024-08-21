import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Import screens
import DashboardScreen from './Screens/DashboardScreen'; 

import TrainingLogScreen from './Screens/TrainingLogScreen';
import LogTraining from './Screens/LogTrainingScreen';
import TrainingSessionDetailsScreen from './Screens/TrainingSessionDetailsScreen';

import CompetitionDetailScreen from './Screens/CompetitionDetailScreen'; 
import CompetitionLogScreen from './Screens/CompetitionLogScreen';
import LogCompetitionScreen from './Screens/LogCompetitionScreen';

import LoginScreen from './Startup/LoginScreen';
import EmailSignInScreen from './Startup/EmailSignInScreen';
import SignUpScreen from './Startup/SignUpScreen';
import PasswordRecoveryScreen from './Startup/PasswordRecoveryScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

import PerformancePredictionScreen from './Screens/PerformancePredictionScreen';
import AdvancedDataVisualizationScreen from './Analytics/AdvancedDataVisualizationScreen';
const Stack = createStackNavigator();

const AppLoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

const App = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (fontsLoaded) {
          setIsAppReady(true);
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, [fontsLoaded]);

  if (!isAppReady) {
    return <AppLoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false, // Hide the header for all screens
          }}
        >
          {/* Authentication Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EmailSignIn" component={EmailSignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />

          {/* Main Application Screens */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="TrainingLog" component={TrainingLogScreen} />
          <Stack.Screen name="LogTraining" component={LogTraining} />
          <Stack.Screen name="TrainingSessionDetails" component={TrainingSessionDetailsScreen} />
          <Stack.Screen name="PerformancePrediction" component={PerformancePredictionScreen} />
          <Stack.Screen name="CompetitionLog" component={CompetitionLogScreen} />
          <Stack.Screen name="CompetitionDetails" component={CompetitionDetailScreen} />
          <Stack.Screen name="LogCompetition" component={LogCompetitionScreen} />
          <Stack.Screen name="AdvancedDataVisualization" component={AdvancedDataVisualizationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
