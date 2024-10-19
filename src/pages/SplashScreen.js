import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingComplete = async () => {
      console.log('SplashScreen çalışıyor...');

      // AsyncStorage'ı temizleme
      // await AsyncStorage.clear(); // Bunu geçici olarak yorumlayabilirsiniz

      // Her durumda TaskListScreen'e yönlendir
      navigation.replace(ScreenName.tasklist);
    };

    const timer = setTimeout(() => {
      checkOnboardingComplete();
    }, 3000); // 3 saniye

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require('../assets/Animations/to-do.json')}
        style={{flex: 1}}
        loop={false}
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
