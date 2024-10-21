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

const CustomTextInput = ({
  imageSource,
  onChangeText,
  value,
  style,
  icon,
  onPressIcon,
  isDate,
  label,
  maxLength,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={onPressIcon ? false : true}
      onPress={() => onPressIcon()}
      style={[styles.container, style]}>
      <Text style={styles.label}>{label} </Text>
      <View style={[styles.inputContainer]}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : null}
        {icon}
        {!onPressIcon ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[styles.textInput, style]}
            maxLength={maxLength}
            {...rest}
          />
        ) : (
          <Text>{value} </Text>
        )}
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
  label: {},
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
  textDescription: {
    textAlignVertical: 'top',
  },

  label: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginVertical: 10,
  },
});
