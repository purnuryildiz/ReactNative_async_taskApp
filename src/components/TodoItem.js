import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import StatusButton from './StatusButton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import Icon from 'react-native-vector-icons/FontAwesome6';

const TodoItem = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text
          style={[
            styles.taskTitle, // İlk stil objesi
            {
              textDecorationLine:
                data.status === 'Done' ? 'line-through' : 'none', // Dinamik stil
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
            onPress={() => navigation.navigate(ScreenName.addTask)}
          />
          <StatusButton iconName="delete" color={'#c0695e'} />
        </View>
      </View>
      <Text style={styles.taskDescription}>{data?.description} </Text>
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.dateText}>Start Date </Text>
          <View style={styles.timeContainer}>
            <Icon name="calendar-minus" color={colors.primary} size={18} />
            <Text style={styles.timeText}>16.10.2024 -09:35</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateText}>End Date </Text>
          <View style={styles.timeContainer}>
            <Icon name="calendar-check" color={colors.primary} size={18} />
            <Text style={styles.timeText}>25.10.2024 - 09:35</Text>
          </View>
        </View>
      </View>
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
  taskDescription: {},
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
    fontWeight: '600',
  },
  timeText: {
    fontSize: 15,
    color: colors.primary,
  },
});
