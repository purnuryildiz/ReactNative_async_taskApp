import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';

const CustomTextInput = ({imageSource, onChangeText, value, ...rest}) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* <Text>Task</Text> */}
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          {...rest}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
