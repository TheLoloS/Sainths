# Plan: Przeprojektowanie ekranu powitalnego

## Cel
Przeprojektowanie głównej strony głównej (ChooseTypePage) z efektem glassmorphism, zmiana tekstu "Witamy!" na "Witamy na Wigilijce!" oraz usunięcie mockup telefonu na rzecz rozbudowanego, estetycznego UI.

## Zadania

### 1. Modal powitalny (glassmorphism)
- [x] Zastosowanie efektu glass do modalu powitalnego
- [x] Zmiana tekstu "Witamy!🎄" na "Witamy na Wigilijce! 🎄"
- [x] Stylizacja modalu z backdrop blur i przezroczystością

### 2. Główny ekran wyboru trybu gry
- [x] Usunięcie mockup-phone na rzecz pełnoekranowego, nowoczesnego UI
- [x] Dodanie nagłówka/logo z efektem glassmorphism
- [x] Karty wyboru trybu gry z animacjami hover
- [x] Rozbudowana sekcja z opcjami:
  - Graj lokalnie jako Serwer
  - Graj lokalnie jako Gracz
  - Graj Online jako Serwer (wkrótce)
  - Graj Online jako Gracz (wkrótce)
- [x] Dodanie sekcji informacyjnej/instrukcji

### 3. Pliki do modyfikacji
- `frontend/app/page.tsx` - główna strona

### 4. Style
- Efekt glassmorphism (backdrop-filter, przezroczystość)
- Animacje framer-motion dla wejść i hover
- Responsywność (mobile-first)
- Świąteczna kolorystyka (czerwony, zielony, złoty, biały)

### 5. Komponenty UI
- Hero sekcja z tytułem
- Karty wyboru trybu (4 karty w grid)
- Stopka z informacjami
