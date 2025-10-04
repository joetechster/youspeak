import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { JSX } from 'react';

import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import SplashScreen from '../screens/SplashScreen';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Learn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Learn" component={LearnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
export type { RootStackParamList };
