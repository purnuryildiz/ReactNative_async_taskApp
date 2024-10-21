import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorageKey from '../constants/AsyncStorageKey';

const SplashScreen = () => {
  const navigation = useNavigation();

  async function checkOnboardingComplete() {
    const onboardingComplete = await AsyncStorage.getItem(
      AsyncStorageKey.onboardingComplete,
    );
    console.log('Onboarding Complete:', onboardingComplete);

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
          }, 900);
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
