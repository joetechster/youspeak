import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import LightBulbIcon from '../components/icons/LightBulbIcon';
import type { RootStackParamList } from '../navigation/AppNavigator';

const ICON_DISPLAY_DURATION = 1400;
const ICON_FADE_DURATION = 400;
const WORDMARK_FADE_DURATION = 500;
const NAVIGATION_DELAY = ICON_DISPLAY_DURATION + ICON_FADE_DURATION + 1200;

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashScreenProps): JSX.Element => {
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      Animated.timing(iconOpacity, {
        toValue: 0,
        duration: ICON_FADE_DURATION,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          Animated.timing(wordmarkOpacity, {
            toValue: 1,
            duration: WORDMARK_FADE_DURATION,
            useNativeDriver: true,
          }).start();
        }
      });
    }, ICON_DISPLAY_DURATION);

    const navigationTimeout = setTimeout(() => {
      navigation.replace('Home');
    }, NAVIGATION_DELAY);

    return () => {
      clearTimeout(transitionTimeout);
      clearTimeout(navigationTimeout);
      iconOpacity.stopAnimation();
      wordmarkOpacity.stopAnimation();
    };
  }, [iconOpacity, navigation, wordmarkOpacity]);

  return (
    <LinearGradient
      colors={['#4C1D95', '#1F9DF1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center px-8">
        <Animated.View style={[styles.overlay, { opacity: iconOpacity }]}>
          <Image
            source={require('../assets/splash-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.overlay, { opacity: wordmarkOpacity }]}>
          <View className="items-center gap-6">
            <View className="items-center gap-2">
              <Text className="text-white text-6xl font-spaceGrotesk font-semibold tracking-[6px] uppercase">
                YOU
              </Text>
              <Text className="text-white text-6xl font-spaceGrotesk font-semibold">Speak</Text>
            </View>

            <View className="h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <LightBulbIcon size={40} />
            </View>

            <Text className="text-center text-lg font-spaceGrotesk font-medium uppercase tracking-[4px] text-white/80">
              Learn It. Speak It. Live It.
            </Text>
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 200,
    width: 200,
  },
});

export default SplashScreen;
