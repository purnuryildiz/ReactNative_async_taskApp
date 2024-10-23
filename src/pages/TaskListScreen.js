import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../themes/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/Images/SearchIcon.png';
import TodoItem from '../components/TodoItem';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import renderEmptyList from '../components/EmptyList';
import {useFocusEffect} from '@react-navigation/native';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    filterTasks();
  }, [searchText, tasks]);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setTasks([]);
      console.log('Storage successfully cleared!');
    } catch (error) {
      console.log('Error clearing storage:', error);
    }
  };

  const loadTask = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];

      // Eğer tasks dizisi yoksa, setTasks ile boş bir dizi ayarlıyoruz.
      if (!Array.isArray(tasks)) {
        setTasks([]);
      } else {
        setTasks(tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterTasks = () => {
    if (searchText) {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, []),
  );

  const handleDeleteTask = async id => {
    try {
      const updatedTask = tasks.filter(task => task.id !== id);
      setTasks(updatedTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
    } catch (error) {
      console.log('Failed to delete task', error);
    }
  };

  const handlePomodoroUpdate = (title, newCount) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, pomodoroCount: newCount} : task,
      ),
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Tasks</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenName.pomodoroTimer, {tasks})
              }
              style={styles.button}>
              <Text style={[styles.buttonText, {color: colors.primary}]}>
                Pomodoro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearAll} style={styles.button}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            style={{marginHorizontal: 0}}
            placeholder="Search Task"
          />
          <FlatList
            keyExtractor={item =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            ListEmptyComponent={renderEmptyList}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            data={filteredTasks}
            renderItem={({item}) => (
              <TodoItem
                data={item}
                onDelete={() => handleDeleteTask(item.id)}
                onPomodoroUpdate={handlePomodoroUpdate} // Fonksiyonu burada ekliyoruz
              />
            )}
          />
        </SafeAreaView>
        <CustomButton
          onPress={() => navigation.navigate(ScreenName.addTask)}
          label={'Add Task'}
        />
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mainContentContainer: {
    height: '100%',
    position: 'absolute',
    padding: 20,
    width: Dimensions.get('screen').width,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '30%',
    marginBottom: -30,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
