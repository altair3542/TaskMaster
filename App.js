import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  FlatList, 
  Text, 
  StyleSheet, 
  ActivityIndicator
} from "react-native";
import { fetchTasks } from "./services/api";
import TaskItem from "./components/TaskItem";


export default function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#34495E" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={task => task.id.toString()}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#ECF0F1' },
  list: { padding: 16 }
});



