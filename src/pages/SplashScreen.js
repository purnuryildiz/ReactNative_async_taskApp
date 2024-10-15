import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';

const SplashScreen = () => {
  const navigation = useNavigation();
  async function checkOnboardingComplete() {
    const onboardingComplete = await AsyncStorage.getItem(
      AsyncStorageKey.onboardingComplete,
    );

    if (onboardingComplete === 'true') {
      navigation.replace(ScreenName.tasklist);
    } else {
      navigation.replace(ScreenName.onboarding);
    }
  }

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require('../assets/Animations/to-do.json')}
        style={{flex: 1}}
        loop={false}
        onAnimationFinish={() => {
          setTimeout(() => {
            checkOnboardingComplete();
          }, 1500);
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
