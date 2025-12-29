# Plan: Przeprojektowanie panelu /local/user

## Cel
Przeprojektowanie ekranu dołączania do gry (/local/user) aby pasował wizualnie do już zaprojektowanych paneli głównego i /local/main, z efektem glassmorphism i spójnym UI.

## Zadania

### 1. Przeprojektowanie SendVerifyCode
- [ ] Zmiana layoutu na glassmorphism
- [ ] Dodanie ładnych animacji framer-motion
- [ ] Stylowe pola input z efektem glass
- [ ] Przycisk "Dołącz" z animacjami
- [ ] Sekcja informacyjna z instrukcjami

### 2. Komponent UserWaitRoom
- [ ] Stworzenie komponentu dla widoku po dołączeniu
- [ ] Wyświetlanie informacji o grze i statusie
- [ ] Lista graczy
- [ ] Animacja oczekiwania na start gry

### 3. Pliki do modyfikacji
- `frontend/components/game/SendVerifyCode.tsx`
- `frontend/components/game/StageUser.tsx` (jeśli potrzeba)
- Nowy: `frontend/components/game/UserWaitRoom.tsx`

### 4. Style
- Glassmorphism na wszystkich panelach
- Animacje wejścia
- Responsywność
- Świąteczna kolorystyka (spójna z resztą)
