# Plan: Zachowanie stanu sesji po odświeżeniu

## Cel
Zaimplementowanie persistencji stanu gry - po odświeżeniu strony użytkownik powinien wrócić do tego samego stanu, w którym był (np. do poczekalni, jeśli był w poczekalni).

## Zadania

### 1. Zapisywanie stanu sesji
- [ ] Zapisywanie do localStorage:
  - gameId (kod gry)
  - login użytkownika
  - czy jest hostem czy graczem
  - timestamp ostatniej aktywności
- [ ] Aktualizacja stanu przy każdej zmianie

### 2. Przywracanie sesji po załadowaniu
- [ ] Sprawdzanie localStorage przy starcie
- [ ] Automatyczne dołączanie do gry jeśli sesja istnieje
- [ ] Obsługa przypadku gdy gra już nie istnieje (reset sesji)

### 3. StageUser - przywracanie sesji gracza
- [ ] Sprawdzenie czy istnieje zapisana sesja
- [ ] Automatyczne dołączenie do gry przy użyciu zapisanych danych
- [ ] Obsługa błędów (gra nie istnieje, sesja wygasła)

### 4. Stage (host) - przywracanie sesji hosta
- [ ] Podobna logika dla hosta
- [ ] Przywrócenie pokoju gry

### 5. Pliki do modyfikacji
- `frontend/lib/stores/gameStore.ts` - dodanie persistencji
- `frontend/lib/sessionManager.ts` - nowy helper do zarządzania sesją
- `frontend/components/game/SendVerifyCode.tsx` - auto-rejoin
- `frontend/components/game/CreateGame.tsx` - auto-rejoin dla hosta
- `frontend/lib/GameStoreInitializer.tsx` - sprawdzenie sesji na starcie
