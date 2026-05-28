# Packing List

A minimal React Native app for managing a packing checklist. Add items, check them off, and delete them. Your list is saved on-device — no account or internet connection required.

Built with [Expo](https://expo.dev) SDK 54.

## Features

- Add packing items
- Check items off (packed items move to the bottom with a strikethrough)
- Delete items
- List persists across app restarts via AsyncStorage

## Getting Started

**Prerequisites:** Node.js 18+, the [Expo Go](https://expo.dev/go) app on your phone.

```bash
git clone <your-repo-url>
cd PackingList
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Project Structure

```
src/
  hooks/useChecklist.ts     # State and AsyncStorage logic
  components/
    ChecklistItem.tsx        # Row: toggle, label, delete
    AddItemBar.tsx           # Text input and add button
  screens/HomeScreen.tsx     # Single screen
  types.ts                   # Item type
__tests__/
  useChecklist.test.ts       # Unit tests for checklist logic
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm test` | Run unit tests |

## Tech Stack

- [Expo](https://expo.dev) SDK 54 (Managed Workflow)
- [React Native](https://reactnative.dev) 0.81
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- [jest-expo](https://github.com/expo/expo/tree/main/packages/jest-expo) for testing
