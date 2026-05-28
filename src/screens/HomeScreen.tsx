import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddItemBar } from '../components/AddItemBar';
import { ChecklistItem } from '../components/ChecklistItem';
import { useChecklist } from '../hooks/useChecklist';

export function HomeScreen() {
  const { items, addItem, togglePacked, deleteItem } = useChecklist();

  const packed = items.filter(i => i.packed).length;
  const total = items.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Packing List</Text>
        {total > 0 && (
          <Text style={styles.counter}>
            {packed}/{total} packed
          </Text>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChecklistItem item={item} onToggle={togglePacked} onDelete={deleteItem} />
        )}
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing to pack yet.{'\n'}Add an item below.</Text>
        }
      />

      <AddItemBar onAdd={addItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  counter: {
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    lineHeight: 24,
  },
});
