# Plan: Naprawa gry "Uzupełnij Piosenkę"

## Problemy do rozwiązania

### 1. Automatyczne przechodzenie do następnego słowa
- [ ] Po poprawnym uzupełnieniu słowa, focus powinien przejść do następnego inputa
- Frontend: User/Game_1.tsx

### 2. Przywracanie stanu gry po odświeżeniu
- [ ] Gracze po odświeżeniu powinni wrócić do gry, nie do oczekiwania
- [ ] Zapisywać stan gry (czy gra trwa) w sesji
- Frontend: User/Game_1.tsx, lib/sessionManager.ts

### 3. Czas gry liczony na serwerze
- [ ] Timer powinien być kontrolowany przez backend
- [ ] Backend wysyła pozostały czas do wszystkich graczy
- [ ] Po odświeżeniu hosta czas nie resetuje się
- Backend: socketHandlers.js, services/roomService.js
- Frontend: Timer/timer.tsx, Main/Game_1.tsx

### 4. Przycisk "Następna piosenka" dla hosta
- [ ] Po zakończeniu czasu, host może przejść do następnej rundy
- [ ] Dodać widok wyników między rundami
- Frontend: Main/Game_1.tsx

### 5. Wyświetlanie wyników po zakończeniu
- [ ] Zbieranie wyników od wszystkich graczy
- [ ] Wyświetlanie rankingu
- Backend: socketHandlers.js (obsługa gameOneScore)
- Frontend: Main/Game_1.tsx
