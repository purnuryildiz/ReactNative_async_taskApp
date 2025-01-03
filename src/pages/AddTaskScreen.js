import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import TaskNameIcon from '../assets/Images/SearchIcon.png';
import CustomTextInput from '../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome6';
import colors from '../themes/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params || {};

  // State değişkenleri
  const [title, setTitle] = useState(data ? data.title : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [pomodoroCount, setPomodoroCount] = useState(
    data ? data.pomodoroCount.toString() : '', // Pomodoro sayısını string olarak tut
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data ? data.status : null);
  const [startDate, setStartDate] = useState(data ? data.startDate : '');
  const [endDate, setEndDate] = useState(data ? data.endDate : '');

  const [items, setItems] = useState([
    {label: 'Planning', value: 'Planning'},
    {label: 'In Progress', value: 'In Progress'},
    {label: 'Done', value: 'Done'},
  ]);

  // DateTimePicker durumu
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data ? 'Update Task' : 'Add Task',
    });
  });

  const handleConfirmStartDate = date => {
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    setStartDate(formattedDate);
    setStartDatePickerVisible(false);
  };

  const handleConfirmEndDate = date => {
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    setEndDate(formattedDate);
    setEndDatePickerVisible(false);
  };

  const handleAddTask = async () => {
    // Alan kontrolü
    if (!title || !description || !startDate || !endDate || !value) {
      Toast.show({
        text1: 'Hata',
        text2: 'Tüm alanları doldurmalısınız.',
        type: 'error',
      });
      return;
    }

    const newTask = {
      id: data?.id || uuid.v4(),
      title,
      description,
      startDate,
      endDate,
      status: value,
      pomodoroCount: pomodoroCount,
    };

    try {
      const existingTask = await AsyncStorage.getItem('tasks');
      let tasks = existingTask ? JSON.parse(existingTask) : [];

      // Güncelleme işlemi
      if (data) {
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        tasks.push(newTask); // Yeni görevi ekle
      }

      // Görevleri AsyncStorage'a kaydet
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      // Pomodoro sayısını kaydet
      await AsyncStorage.setItem(
        `pomodoroCount_${data?.id || newTask.id}`,
        JSON.stringify(pomodoroCount),
      );

      console.log(tasks);

      // Tasklist ekranına yönlendirme
      navigation.navigate(ScreenName.tasklist, {tasks});
    } catch (error) {
      console.error('Görev kaydetme sırasında hata:', error);
      Toast.show({
        text1: 'Hata',
        text2: 'Görev kaydedilirken bir hata oluştu.',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <CustomTextInput
          imageSource={TaskNameIcon}
          label={'Task Name'}
          onChangeText={setTitle}
          value={title}
        />
        <CustomTextInput
          label={'Description'}
          onChangeText={setDescription}
          value={description}
          style={styles.textDescription}
          multiline={true}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 80}}>
        <CustomTextInput
          onPressIcon={() => setStartDatePickerVisible(true)}
          icon={<Icon name="calendar-minus" color={colors.primary} size={18} />}
          style={{width: '40%'}}
          label={'Start Date '}
          isDate
          value={startDate}
        />
        <CustomTextInput
          onPressIcon={() => setEndDatePickerVisible(true)}
          icon={<Icon name="calendar-check" color={colors.primary} size={18} />}
          style={{width: '40%'}}
          label={'End Date '}
          isDate
          value={endDate}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.status}>State</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Select a state...'}
            containerStyle={{width: '92%'}}
            style={{
              borderWidth: 0,
              backgroundColor: '#fff',
              fontSize: 20,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
            }}
          />
        </View>
      </View>
      {value === 'In Progress' && (
        <TextInput
          placeholder="Pomodoro Count"
          onChangeText={setPomodoroCount}
          value={pomodoroCount}
          keyboardType="numeric"
          style={styles.pomodoroInput}
        />
      )}

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomButton
          onPress={handleAddTask}
          label={data ? 'Update Task' : 'Save Task'}
          style={{width: '92%', justifyContent: 'center', alignItems: 'center'}}
        />
      </View>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisible(false)}
      />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  inlineContainer: {
    width: '100%',
  },
  textDescription: {
    height: 50,
    textAlignVertical: 'top',
    paddingLeft: 0,
  },
  dropdownContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 280,
  },
  status: {
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  pomodoroInput: {
    borderWidth: 2,
    width: '35%',
    height: 40,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: -30,
    paddingLeft: 10,
    borderColor: colors.primary,
  },
});
