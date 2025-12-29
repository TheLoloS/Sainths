# Plan: Migracja z Context API na Zustand

## Cel
Zastąpienie React Context API (GameContext, SocketContext) biblioteką Zustand dla prostszego i bardziej wydajnego zarządzania stanem globalnym.

## Zadania

### 1. Instalacja Zustand
- [x] Instalacja pakietu `zustand` w projekcie frontend

### 2. Tworzenie store'ów Zustand
- [x] Stworzenie `lib/stores/gameStore.ts` - store dla danych gry (GameData)
- [x] Stworzenie `lib/GameStoreInitializer.tsx` - komponent inicjalizujący

### 3. Aktualizacja komponentów
- [x] Usunięcie providerów z `app/layout.tsx`
- [x] Aktualizacja wszystkich komponentów używających `useGame()` na nowy hook ze store'a
- [x] Aktualizacja wszystkich komponentów używających `useSocket()` na bezpośredni import socket
- [x] Usunięcie starych plików GameContext.tsx i SocketContext.tsx

### 4. Weryfikacja
- [x] Build passed

### 4. Pliki do modyfikacji
- `frontend/package.json` - dodanie zustand
- `frontend/lib/stores/gameStore.ts` - nowy plik
- `frontend/lib/stores/socketStore.ts` - nowy plik  
- `frontend/app/layout.tsx` - usunięcie providerów
- `frontend/components/ui/Alert.tsx` - zmiana importu
- `frontend/components/game/CreateGame.tsx` - zmiana importu
- `frontend/components/game/WaitRoom.tsx` - zmiana importu
- `frontend/components/game/Stage.tsx` - zmiana importu
- `frontend/components/game/StageUser.tsx` - zmiana importu
- `frontend/components/game/TabList.tsx` - zmiana importu
- `frontend/components/game/TabListRow.tsx` - zmiana importu
- `frontend/components/game/TabOfPlayers.tsx` - zmiana importu
- `frontend/components/game/SendVerifyCode.tsx` - zmiana importu
- `frontend/components/games/Timer/timer.tsx` - zmiana importu
- `frontend/components/games/User/Game_1.tsx` - zmiana importu

### 5. Logika
- Store `gameStore` będzie zawierał:
  - `gameData: GameData` - stan gry
  - `setGameData(data: GameData)` - akcja ustawiania danych
  - `initializeSocketListeners()` - inicjalizacja nasłuchiwaczy socket
  
- Store `socketStore` będzie zawierał:
  - `socket: Socket` - instancja socket.io
  - `emit(event, data)` - wrapper dla socket.emit
  - `on(event, callback)` - wrapper dla socket.on

### 6. Zależności
- zustand ^4.x
- Istniejący socket.io-client

## Kolejność wykonania
1. Instalacja zustand
2. Tworzenie gameStore.ts
3. Tworzenie socketStore.ts (lub bezpośredni import socket)
4. Aktualizacja layout.tsx
5. Aktualizacja komponentów (jeden po drugim)
6. Usunięcie starych plików Context
7. Build i weryfikacja
