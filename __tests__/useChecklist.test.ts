import { act, renderHook } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChecklist } from '../src/hooks/useChecklist';

// jest-expo preset sets up the AsyncStorage mock automatically via
// @react-native-async-storage/async-storage/jest/async-storage-mock
beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('useChecklist', () => {
  it('starts empty when storage has nothing', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    expect(result.current.items).toEqual([]);
  });

  it('adds an item to the top of the list', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    act(() => { result.current.addItem('Passport'); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].label).toBe('Passport');
    expect(result.current.items[0].packed).toBe(false);
  });

  it('ignores blank items', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    act(() => { result.current.addItem('   '); });
    expect(result.current.items).toHaveLength(0);
  });

  it('toggles packed status', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    act(() => { result.current.addItem('Sunscreen'); });
    const id = result.current.items[0].id;
    act(() => { result.current.togglePacked(id); });
    expect(result.current.items[0].packed).toBe(true);
    act(() => { result.current.togglePacked(id); });
    expect(result.current.items[0].packed).toBe(false);
  });

  it('deletes an item', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    act(() => { result.current.addItem('Charger'); });
    const id = result.current.items[0].id;
    act(() => { result.current.deleteItem(id); });
    expect(result.current.items).toHaveLength(0);
  });

  it('sorts unpacked items before packed', async () => {
    const { result } = renderHook(() => useChecklist());
    await act(async () => {});
    act(() => {
      result.current.addItem('A');
      result.current.addItem('B');
    });
    const ids = result.current.items.map(i => i.id);
    act(() => { result.current.togglePacked(ids[1]); });
    expect(result.current.items[result.current.items.length - 1].packed).toBe(true);
  });

  it('does not overwrite storage before hydration completes', async () => {
    await AsyncStorage.setItem('@packing_list', JSON.stringify([
      { id: '1', label: 'Hat', packed: false },
    ]));
    const { result } = renderHook(() => useChecklist());
    // Do NOT await hydration — save must not fire before load resolves
    const raw = await AsyncStorage.getItem('@packing_list');
    expect(JSON.parse(raw!)).toHaveLength(1);
    // Now let hydration finish and confirm data is still there
    await act(async () => {});
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].label).toBe('Hat');
  });
});
