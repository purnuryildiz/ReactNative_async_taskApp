import colors from '../themes/Colors';

const {default: LottieView} = require('lottie-react-native');
const {View, StyleSheet, Text} = require('react-native');

const renderEmptyList = () => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        source={require('../assets/Animations/empty.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <View style={{position: 'absolute', bottom: 5}}>
        <Text style={{fontWeight: 'bold', color: colors.primary}}>
          Hey! Create new tasks..
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150, // Gereksiz boşlukları azaltmak için
    overflow: 'hidden',
    borderRadius: 200,
  },

  lottie: {
    width: 300, // Boyutları uygun şekilde ayarladık
    height: 300,
  },
});

export default renderEmptyList;
