import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TaskNameIcon from '../assets/Images/SearchIcon.png';
import CustomTextInput from '../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome6';
import colors from '../themes/Colors';
const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
          icon={<Icon name="calendar-minus" color={colors.primary} size={18} />}
          style={{width: '40%'}}
          label={'Start Date '}
        />
        <CustomTextInput
          icon={<Icon name="calendar-check" color={colors.primary} size={18} />}
          style={{width: '40%'}}
          label={'End Date '}
        />
      </View>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {},
  inlineContainer: {},
  textDescription: {
    height: 50,
    textAlignVertical: 'top',
    paddingLeft: 0,
  },
});
