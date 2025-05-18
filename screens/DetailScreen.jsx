import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native';

export default function DetailsScreen({ route }) {
  const { task } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{task.title}</Text>

        <Text style={styles.label}>Completada:</Text>
        <Text style={styles.value}>
          {task.completed ? '✅ Sí' : '❌ No'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12
  },
  value: {
    fontSize: 16,
    marginTop: 4
  }
});
