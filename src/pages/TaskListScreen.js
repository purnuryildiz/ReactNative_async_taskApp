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
import LottieView from 'lottie-react-native';
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

      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTasks = () => {
    if (searchText) {
      //taskların title i ile searchText eşleşirse filtered dizisine aktar
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      //filtrelenmiş diziyi de state'e aktar
      setFilteredTasks(filtered);
    } else {
      //searchText boş ise taskların hepsini ekrana bastır
      setFilteredTasks(tasks);
    }
  };

  //useFocusEffect: Bu hook react navigation kütüphanesinden gelir ve bir ekrana odaklandığında belirli bir fonksiyonun ya da işlevin çalışmasını sağlar:

  useFocusEffect(
    //fonskiyonun referansını hatırlatmaya yardımcı olmak için useCallBack kullanılır, loadTask fonsksiyonu bir kez oluşturuldu yukarıda , aynı referans çağırdığımda kullanılabilecek:
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
      console.log('failed ');
    }
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
          <TouchableOpacity onPress={clearAll} style={styles.button}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>

          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            style={{marginHorizontal: 0}}
            placeholder="Search Task"
          />
          <FlatList
            keyExtractor={item => item?.id.toString()}
            ListEmptyComponent={renderEmptyList}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            data={filteredTasks}
            renderItem={({item}) => (
              <TodoItem
                data={item}
                onDelete={() => handleDeleteTask(item.id)}
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
    color: colors.text.primary,
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical: 10,

    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '30%',
    marginBottom: -20,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
