// components/TaskItem.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function TaskItem({ task, onToggle }) {
  return (
    <View style={styles.item}>
      {/* Al pulsar esta zona vamos a alternar completed */}
      <TouchableOpacity onPress={onToggle} style={styles.touchable}>
        <Text style={styles.title}>
          {task.completed ? '✅' : '⬜️'} {task.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
});
