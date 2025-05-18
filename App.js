// // App.js
// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   FlatList,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   View,
//   TextInput,
//   Button,
//   StatusBar,
//   Platform,
//   Alert
// } from "react-native";
// import {
//   fetchTasks,
//   createTask as apiCreateTask,
//   updateTask as apiUpdateTask,
//   deleteTask as apiDeleteTask
// } from "./services/api";
// import TaskItem from "./components/TaskItem";

// // Helper para generar IDs únicos
// const generateId = () => Date.now().toString();

// export default function App() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newTitle, setNewTitle] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // Al montar, cargamos las primeras 10 tareas del servidor
//   useEffect(() => {
//     fetchTasks()
//       .then(fetched => setTasks(fetched))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   // Agregar o actualizar título
//   const handleSubmit = () => {
//     if (editingId) {
//       // 1) Actualizamos inmediatamente en UI
//       setTasks(tasks.map(t =>
//         t.id === editingId ? { ...t, title: newTitle } : t
//       ));
//       // 2) Intentamos actualizar en el servidor (no bloquea la UI)
//       apiUpdateTask(editingId, { title: newTitle })
//         .catch(err => console.warn("No se pudo actualizar en servidor:", err.message));
//     } else {
//       const localId = generateId();
//       const newTask = { id: localId, title: newTitle, completed: false };
//       // 1) Lo añadimos de inmediato
//       setTasks([newTask, ...tasks]);
//       // 2) Enviamos al servidor (no esperamos éxito para UX)
//       apiCreateTask(newTitle)
//         .catch(err => console.warn("No se pudo crear en servidor:", err.message));
//     }
//     // Limpiamos formulario
//     setEditingId(null);
//     setNewTitle("");
//   };

//   // Toggle completado
//   const handleToggle = task => {
//     // 1) Optimista: actualizamos UI
//     setTasks(tasks.map(t =>
//       t.id === task.id ? { ...t, completed: !t.completed } : t
//     ));
//     // 2) Intentamos en servidor
//     apiUpdateTask(task.id, { completed: !task.completed })
//       .catch(err => console.warn("No se pudo toggle en servidor:", err.message));
//   };

//   // Eliminar tarea
//   const handleDelete = id => {
//     Alert.alert(
//       "Eliminar tarea",
//       "¿Seguro que quieres borrar esta tarea?",
//       [
//         { text: "Cancelar", style: "cancel" },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress: () => {
//             // 1) Optimista: quitamos de UI
//             setTasks(tasks.filter(t => t.id !== id));
//             // 2) Intentamos en servidor
//             apiDeleteTask(id)
//               .catch(err => console.warn("No se pudo eliminar en servidor:", err.message));
//           }
//         }
//       ]
//     );
//   };

//   // Iniciar modo edición
//   const handleEdit = task => {
//     setEditingId(task.id);
//     setNewTitle(task.title);
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#34495E" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Formulario */}
//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Título de la tarea..."
//           value={newTitle}
//           onChangeText={setNewTitle}
//         />
//         <Button
//           title={editingId ? "Actualizar" : "Agregar"}
//           onPress={handleSubmit}
//           disabled={!newTitle.trim()}
//         />
//       </View>

//       <Text style={styles.title}>Tareas</Text>

//       <FlatList
//         data={tasks}
//         keyExtractor={t => t.id}
//         contentContainerStyle={styles.list}
//         renderItem={({ item }) => (
//           <TaskItem
//             task={item}
//             onToggle={() => handleToggle(item)}
//             onDelete={() => handleDelete(item.id)}
//             onEdit={() => handleEdit(item)}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   center: {
//     flex: 1, justifyContent: "center", alignItems: "center"
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#ECF0F1",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//   },
//   form: {
//     flexDirection: "row",
//     padding: 16,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "space-between"
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 12,
//     backgroundColor: "#fafafa"
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#34495E",
//     marginHorizontal: 16,
//     marginVertical: 8
//   },
//   list: {
//     paddingHorizontal: 16,
//     paddingBottom: 16
//   }
// });

import React from 'react'
import { StatusBar, Platform, SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import  { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar basStyle='dark-content'/>
      <SafeAreaView style={styles.safe} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Tareas'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Detalle de la tarea'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 0,
    backgroundColor: '#ECF0F1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
