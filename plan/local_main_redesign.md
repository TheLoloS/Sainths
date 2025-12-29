# Plan: Przeprojektowanie panelu /local/main

## Cel
Przeprojektowanie ekranu tworzenia gry (/local/main) z wykorzystaniem kafelków wyboru gry zamiast dropdown, z informacjami o każdej grze i ładnym, rozbudowanym layoutem.

## Zadania

### 1. Przeprojektowanie CreateGame
- [ ] Usunięcie starego layoutu
- [ ] Dodanie sekcji hero z glassmorphism
- [ ] Przycisk "Stwórz Grę" z ładną animacją

### 2. Przeprojektowanie WaitRoom
- [ ] Sekcja z kodem gry (prominentna, czytelna)
- [ ] Lista graczy w formie kart/avatarów
- [ ] Kafelki wyboru gry zamiast dropdown:
  - Domyślna gra (uzupełnianie piosenek)
  - Świąteczny Quiz (trivia)
  - Świąteczne Bingo
  - Poszukiwacze Skarbów
- [ ] Każdy kafelek zawiera:
  - Ikonę/emoji
  - Nazwę gry
  - Krótki opis na czym polega
  - Stan zaznaczenia (selected)
- [ ] Przycisk "Zaczynajmy!"

### 3. Przeprojektowanie TabOfPlayers
- [ ] Usunięcie dropdown z wyborem gry
- [ ] Ładniejsza tabela/lista graczy
- [ ] Responsive layout

### 4. Stworzenie nowego komponentu GameSelector
- [ ] Grid kafelków gier
- [ ] Animacje hover i selection
- [ ] Props: selectedGame, onSelectGame

### 5. Pliki do modyfikacji
- `frontend/components/game/CreateGame.tsx`
- `frontend/components/game/WaitRoom.tsx`
- `frontend/components/game/TabOfPlayers.tsx`
- `frontend/components/game/GameSelector.tsx` (nowy)

### 6. Style
- Glassmorphism na wszystkich panelach
- Karty gier z gradient background
- Animacje framer-motion
- Zaznaczenie wybranej gry (border, glow)
