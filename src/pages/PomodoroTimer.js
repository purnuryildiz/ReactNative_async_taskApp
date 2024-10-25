import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import colors from '../themes/Colors';

const PomodoroTimer = ({onComplete, route}) => {
  // Eğer tasks yoksa boş bir dizi alıyoruz
  const tasks = route.params?.tasks || [];
  // data kesin olarak mevcutsa bu şekilde alabiliriz
  const data = route.params.data;
  const [currentTask, setCurrentTask] = useState(null);
  const [seconds, setSeconds] = useState(1500); // 25 dakika
  const [isActive, setIsActive] = useState(false);
  const [currentTab, setCurrentTab] = useState('Pomodoro');
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      onComplete(); // Pomodoro süresi tamamlandığında
      resetTimer(); // Zamanlayıcıyı sıfırla
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(prev => !prev);
  };

  const resetTimer = () => {
    const timerDuration = {
      Pomodoro: 1500, // 25 dakika
      'Short Break': 300, // 5 dakika
      'Long Break': 900, // 15 dakika
    };
    setSeconds(timerDuration[currentTab]);
    setIsActive(false);
  };

  const handleTabChange = tab => {
    setCurrentTab(tab);
    resetTimer(); // Sekme değiştiğinde zamanlayıcıyı sıfırla
  };

  const addTask = title => {
    if (title && typeof title === 'string' && title.trim() !== '') {
      const newTask = {title, status: 'In Progress', pomodoroCount: 0}; // Pomodoro sayısını başta sıfır yap
      tasks.push(newTask);
      setCurrentTask(newTask);
      setTaskInput('');
    }
  };

  const filteredTasks = tasks.filter(
    task => task.status === 'In Progress' && task.title,
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Sekme Yapısı */}
      <View style={styles.tabsContainer}>
        {['Pomodoro', 'Short Break', 'Long Break'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, currentTab === tab && styles.activeTab]}
            onPress={() => handleTabChange(tab)}>
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Zamanlayıcı */}
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

      {/* Görev Listesi */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Tasks</Text>
        <FlatList
          data={filteredTasks}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.taskItem}>
                {index + 1}. {item.title}
              </Text>
              <Text style={styles.taskItem}>
                {item.pomodoroCount} pomodoro{' '}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* Görev Ekleme */}
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Add Task"
            value={taskInput}
            onChangeText={setTaskInput}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addTask(taskInput)}>
            <Text style={styles.addButtonText}>Add</Text>
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
    backgroundColor: 'white',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A17DFE',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#7D48FA',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  counterContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 30,
    width: 350,
    height: 350,
    borderRadius: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7D48FA',
    backgroundColor: 'transparent',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#B0A2FF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  taskContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#7D48FA',
  },
  taskItem: {
    fontSize: 18,
    color: colors.primary,
    marginVertical: 5,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  taskInput: {
    flex: 1,
    borderColor: colors.text.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: '#7D48FA',
  },
  addButton: {
    backgroundColor: '#B0A2FF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PomodoroTimer;
