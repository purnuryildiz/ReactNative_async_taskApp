import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import colors from '../themes/Colors';

const PomodoroCounter = ({
  pomodoroCount,
  increasePomodoro,
  decreasePomodoro,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 14}}>Pomodoro:</Text>
      <TouchableOpacity
        onPress={decreasePomodoro}
        disabled={pomodoroCount === 0}
        style={[
          styles.button,
          {backgroundColor: pomodoroCount === 0 ? '#f0ad4e' : '#e67e22'},
        ]}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.countText}>{pomodoroCount}</Text>

      <TouchableOpacity onPress={increasePomodoro} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#e67e22',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default PomodoroCounter;
