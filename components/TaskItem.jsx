import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>
                {task.completed ? '✅': '❌'} {task.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
      padding: 12,
      backgroundColor: '#FFF',
      marginBottom: 8,
      borderRadius: 6,
    },
    title: { fontSize: 16 },
  });

  //comentario por que ajá