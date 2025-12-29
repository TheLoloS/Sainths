# Plan: Frontend Rewrite to Next.js 14

## Cel
Przepisanie istniejącego frontendu (React CRA) na Next.js 14.2.35 z TypeScript i TailwindCSS 3 w nowym katalogu `frontend/`. Backend pozostaje bez zmian.

## Struktura plików i folderów
Nowy projekt `frontend` będzie miał następującą strukturę (App Router):

```
frontend/
├── app/
│   ├── layout.tsx       # Główny layout (odpowiednik App.js wrapperów)
│   ├── page.tsx         # Strona główna
│   ├── game/
│   │   └── page.tsx     # Strona gry (jeśli jest routing)
│   └── ...              # Inne podstrony na podstawie routingu z App.js
├── components/          # Komponenty przeniesione z src/components
│   ├── ui/              # Komponenty UI (przyciski, modale itp.)
│   ├── game/            # Komponenty specyficzne dla gry
│   └── ...
├── lib/
│   ├── socket.ts        # Konfiguracja Socket.io client
│   └── utils.ts         # Funkcje pomocnicze
├── types/               # Definicje typów TypeScript
│   └── index.ts
├── public/              # Zasoby statyczne (obrazy, svg)
├── tailwind.config.ts   # Konfiguracja Tailwind
└── package.json
```

## Zadania

### 1. Inicjalizacja projektu
- [x] Stworzenie katalogu `frontend` i inicjalizacja Next.js 14.2.35.
- [x] Instalacja zależności: `socket.io-client`, `daisyui`, `framer-motion`, `axios`, `react-device-detect`.
- [x] Konfiguracja TailwindCSS i TypeScript.

### 2. Analiza i przeniesienie routingu
- [x] Przeanalizowanie `src/App.js` w celu odwzorowania ścieżek w `app/`.
- [x] Stworzenie odpowiednich plików `page.tsx` dla każdej ścieżki.

### 3. Portowanie komponentów
- [x] Przeniesienie i przepisanie komponentów z `src/components` na TSX.
- [x] Dostosowanie stylów do TailwindCSS.
- [x] Typowanie propsów i stanu.

### 4. Integracja z Backendem
- [x] Konfiguracja połączenia Socket.io w `frontend/lib/socket.ts`.
- [x] Konfiguracja next.config.mjs dla zdalnych obrazów (dicebear avatars).

### 5. Czyszczenie i finalizacja
- [x] Weryfikacja działania aplikacji (build passed).

## Logika
- Aplikacja będzie korzystać z `App Router` Next.js.
- Stan globalny (jeśli jest) zostanie obsłużony przez React Context lub Zustand (jeśli zajdzie potrzeba, na razie Context jak w oryginale).
- Komunikacja z backendem przez Socket.io i Axios.

## Zależności
- Istniejący backend (musi być uruchomiony do testów).
- Node.js environment.
