# Plan: Naprawa i ulepszenie gier

## Cel
Przeanalizowanie wszystkich gier, naprawa UI/UX oraz zapewnienie ich prawidłowego działania.

## Analiza gier

### 1. Game_1 (Uzupełnij Piosenkę) - Main & User
**Problemy:**
- Main: Brzydkie UI, brak glassmorphism
- Main: Tabela graczy w złym miejscu
- Main: Timer wygląda źle
- User: Brak glassmorphism
- User: Tabela w złym miejscu
- User: Przycisk reset w złym miejscu

**Naprawa:**
- [x] Przeprojektowanie Main/Game_1.tsx z glassmorphism
- [x] Przeprojektowanie User/Game_1.tsx z glassmorphism
- [x] Lepszy timer z wizualnym countdown
- [x] Lepsza prezentacja wyników

### 2. Trivia (Quiz)
**Problemy:**
- Działa lokalnie, ale nie jest zsynchronizowany z serwerem
- Brak wysyłania wyników do serwera

**Naprawa:**
- [x] Dodanie wysyłania wyników do backendu
- [ ] Synchronizacja między graczami (opcjonalnie)

### 3. Bingo
**Problemy:**
- Tylko placeholder, brak implementacji

**Naprawa:**
- [x] Stworzenie pełnej gry Bingo

### 4. ScavengerHunt
**Problemy:**
- Tylko placeholder, brak implementacji

**Naprawa:**
- [x] Stworzenie podstawowej implementacji

## Pliki do modyfikacji
- frontend/components/games/Main/Game_1.tsx
- frontend/components/games/User/Game_1.tsx
- frontend/components/games/Timer/timer.tsx
- frontend/components/games/Trivia/Trivia.tsx
- frontend/components/games/Bingo/Bingo.tsx
- frontend/components/games/ScavengerHunt/ScavengerHunt.tsx
- backend/socketHandlers.js (jeśli potrzeba)
