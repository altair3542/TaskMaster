// components/TaskItem.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      {/* Al pulsar aquí alternamos completado */}
      <TouchableOpacity onPress={onToggle} style={styles.touchable}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.completed ? "✅" : "⬜️"} {task.title}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttons}>
        {/* Botón Editar */}
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>

        {/* Botón Eliminar */}
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  touchable: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  buttons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  button: {
    padding: 6,
    marginLeft: 4,
  },
  buttonText: {
    fontSize: 18,
  },
});
