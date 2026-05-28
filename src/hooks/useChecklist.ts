import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../types';

const STORAGE_KEY = '@packing_list';

async function load(): Promise<Item[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

async function save(items: Item[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage failure is non-fatal
  }
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useChecklist() {
  const [items, setItems] = useState<Item[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    load().then(loaded => {
      setItems(loaded);
      hydrated.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    save(items);
  }, [items]);

  const addItem = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setItems(prev => [
      { id: makeId(), label: trimmed, packed: false },
      ...prev,
    ]);
  };

  const togglePacked = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const sorted = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));

  return { items: sorted, addItem, togglePacked, deleteItem };
}
