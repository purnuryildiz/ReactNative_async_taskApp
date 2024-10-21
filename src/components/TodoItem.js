import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../themes/Colors';
import StatusButton from './StatusButton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import Icon from 'react-native-vector-icons/FontAwesome6';
import PomodoroCounter from './PomodoroCounter';

const TodoItem = ({data, onDelete}) => {
  const navigation = useNavigation();
  const [pomodoroCount, setPomodoroCount] = useState(data.pomodoroCount || 0);

  // Pomodoro sayacını async storega 'a kaydet

  const savePomodoroCount = async count => {
    try {
      await AsyncStorage.setItem(`pomodoroCount_${data.id}`),
        JSON.stringify(count);
    } catch (error) {
      console.log('Pomodoro count could not be saved', error);
    }
  };

  //Pomodoro sayacını async storage 'dan oku
  const loadPomodoroCount = async () => {
    try {
      const count = await AsyncStorage.getItem(`pomodoroCount_${data.id}`);
      if (count !== null) {
        setPomodoroCount(JSON.parse(count));
      }
    } catch (error) {
      console.log('Pomodoro count could not be loaded : ', error);
    }
  };

  useEffect(() => {
    loadPomodoroCount();
  }, []);

  useEffect(() => {
    savePomodoroCount(pomodoroCount); //pomodoro count her değiştiğinde kaydet
  }, [pomodoroCount]);

  const increasePomodoro = () => {
    setPomodoroCount(prevCount => prevCount + 1);
  };

  const decreasePomodoro = () => {
    if (pomodoroCount > 0) {
      setPomodoroCount(prevCount => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine:
                data.status === 'Done' ? 'line-through' : 'none',
            },
          ]}>
          {data.title.toUpperCase()}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === 'Planning'
                    ? '#fff3e6'
                    : data.status === 'In Progress'
                    ? '#fffacd'
                    : '#e6f7ff',
              },
            ]}>
            <Text
              style={{
                color:
                  data.status === 'Planning'
                    ? '#3498db'
                    : data.status === 'In Progress'
                    ? '#f39c12'
                    : '#2ecc71',
              }}>
              {data.status}
            </Text>
          </View>
          <StatusButton
            iconName="pencil"
            color={colors.primary}
            onPress={() => navigation.navigate(ScreenName.addTask, {data})}
          />
          <StatusButton
            onPress={() => onDelete()}
            iconName="delete"
            color={'#c0695e'}
          />
        </View>
      </View>
      <Text
        style={styles.taskDescription}
        numberOfLines={2}
        ellipsizeMode="tail">
        {data?.description}
      </Text>
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.dateText}>Start Date:</Text>
          <View style={styles.timeContainer}>
            <Icon name="calendar-minus" color={colors.primary} size={18} />
            <Text style={styles.timeText}>{data.startDate}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateText}>End Date:</Text>
          <View style={styles.timeContainer}>
            <Icon name="calendar-check" color={colors.primary} size={18} />
            <Text style={styles.timeText}>{data.endDate}</Text>
          </View>
        </View>
      </View>

      {data.status === 'In Progress' ? (
        <View style={styles.pomodoroContainer}>
          <PomodoroCounter
            pomodoroCount={pomodoroCount}
            increasePomodoro={increasePomodoro}
            decreasePomodoro={decreasePomodoro}
          />
        </View>
      ) : null}
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  taskDescription: {
    marginVertical: 15,
    maxHeight: 40,
    overflow: 'visible',
    fontFamily: 'Avenir',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 15,
    color: colors.primary,
  },
  pomodoroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 1,
    backgroundColor: '#f9e2b1', 
    borderRadius: 10,
  },
});
