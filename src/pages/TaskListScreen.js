import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../themes/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/Images/SearchIcon.png';
import TodoItem from '../components/TodoItem';

const TaskListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([
    {
      userId: 1,
      id: 1,
      title: 'title',
      status: 'Planning',
    },
    {
      userId: 2,
      id: 2,
      title: 'title',
      status: 'In Progress',
    },
    {
      userId: 3,
      id: 3,
      title: 'title',
      status: 'Done',
    },
    {
      userId: 4,
      id: 4,
      title: 'title',
      status: 'Planning',
    },
    {
      userId: 5,
      id: 5,
      title: 'title',
      status: 'In Progress',
    },
    {
      userId: 6,
      id: 6,
      title: 'title',
      status: 'Done',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            placeholder="Search Task"
          />
          <FlatList
            data={tasks}
            renderItem={({item}) => <TodoItem data={item} />}
          />
        </SafeAreaView>
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
});
