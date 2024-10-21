import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import colors from '../themes/Colors';

const PomodoroTimer = ({onComplete, pomodoroCount}) => {
  const [seconds, setSeconds] = useState(1500); // 25 dakika
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (seconds === 0) {
      onComplete(); // Pomodoro süresi tamamlandığında
      resetTimer(); // Zamanlayıcıyı sıfırla
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(prevState => !prevState);
  };

  const resetTimer = () => {
    setSeconds(1500);
    setIsActive(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.timer}>
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, '0')}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleTimer}>
            <Text style={styles.buttonText}>
              {isActive ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  counterContainer: {
    marginTop: 30,
    marginLeft: 35,
    width: 350,
    height: 350,
    borderRadius: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 5,
    borderColor: colors.primary,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Yazı rengi
    fontSize: 18,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db', // Label rengi
    marginBottom: 10,
  },
  pomodoroCountContainer: {
    flexDirection: 'row',
  },
  pomodoroDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e67e22', // Dot rengi
    margin: 2,
  },
});

export default PomodoroTimer;
