// App.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/api";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Agregar o actualizar tarea
  const handleSubmit = () => {
    if (editingId) {
      updateTask(editingId, { title: newTitle })
        .then(updated => {
          setTasks(tasks.map(t =>
            t.id === updated.id ? { ...t, title: updated.title } : t
          ));
          setEditingId(null);
          setNewTitle("");
        })
        .catch(console.error);
    } else {
      createTask(newTitle)
        .then(task => {
          setTasks([task, ...tasks]);
          setNewTitle("");
        })
        .catch(console.error);
    }
  };

  // Marcar/completar sin eliminar el texto
  const handleToggle = task => {
    const nuevoEstado = !task.completed;
    updateTask(task.id, { completed: nuevoEstado })
      .then(() => {
        setTasks(tasks.map(t =>
          t.id === task.id
            ? { ...t, completed: nuevoEstado }
            : t
        ));
      })
      .catch(console.error);
  };

  // Eliminar tarea
  const handleDelete = id => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(console.error);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#34495E" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Formulario */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea..."
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Button
          title={editingId ? "Actualizar" : "Agregar"}
          onPress={handleSubmit}
          disabled={!newTitle.trim()}
        />
      </View>

      <Text style={styles.title}>Tareas</Text>

      <FlatList
        data={tasks}
        keyExtractor={task => task.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => handleToggle(item)}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => {
              setEditingId(item.id);
              setNewTitle(item.title);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, justifyContent: "center", alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#ECF0F1",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  form: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: "#fafafa"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495E",
    marginHorizontal: 16,
    marginVertical: 8
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16
  }
});
