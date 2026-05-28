import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '../types';

type Props = {
  item: Item;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ChecklistItem({ item, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        style={styles.checkArea}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.packed }}
        accessibilityLabel={item.packed ? `${item.label}, packed` : `${item.label}, not packed`}
      >
        <Ionicons
          name={item.packed ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={item.packed ? '#4CAF50' : '#aaa'}
        />
      </TouchableOpacity>

      <Text style={[styles.label, item.packed && styles.labelPacked]} numberOfLines={2}>
        {item.label}
      </Text>

      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteArea}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.label}`}
      >
        <Ionicons name="trash-outline" size={20} color="#e57373" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  checkArea: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  labelPacked: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteArea: {
    marginLeft: 10,
    padding: 4,
  },
});
