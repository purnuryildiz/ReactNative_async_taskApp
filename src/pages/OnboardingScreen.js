import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('screen').width;

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem(AsyncStorageKey.onboardingComplete, 'true');
    navigation.replace('AddTask');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ellipseBackground}>
        <View style={styles.inlineContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Images/Task2x.png')}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <TouchableOpacity
            onPress={handleOnboardingComplete}
            style={styles.footerContainer}>
            <Text style={styles.textStyle}>Let's Start</Text>

            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="white" // İkon rengini beyaz yapalım
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  ellipseBackground: {
    width: width,
    height: '70%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    transform: [{scaleX: 1.5}],
  },
  inlineContainer: {
    width: 'width',
    height: '100%',
    position: 'absolute',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 600,
    width: 400,
    marginTop: 100,
    marginRight: 20,
  },
  footerContainer: {
    height: '10%',
    backgroundColor: colors.primary,
    borderRadius: 25,
    position: 'absolute',
    bottom: -130,
    width: '50%',
    alignSelf: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -1.8,
    lineHeight: 30,
    fontFamily: 'Avenir',
    color: 'white',
    textAlign: 'center',
    marginRight: 12,
  },
});
