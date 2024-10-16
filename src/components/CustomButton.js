import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';

const CustomButton = ({label, style, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={styles.label}>{label} </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
});
