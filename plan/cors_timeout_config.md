# Plan: Konfiguracja CORS i timeoutów

## Cel
Umożliwienie połączenia z backendem z dowolnego adresu IP (w sieci lokalnej) oraz dodanie timeoutów i obsługi błędów w frontendzie.

## Zadania

### 1. Backend - CORS
- [ ] Zmiana konfiguracji CORS w `backend/index.js` aby akceptował połączenia z dowolnego IP
- [ ] Dodanie odpowiednich nagłówków dla socket.io
- [ ] Opcjonalnie: listowanie na wszystkich interfejsach (0.0.0.0)

### 2. Frontend - Socket config
- [ ] Aktualizacja `frontend/lib/socket.ts` z timeout 5s
- [ ] Dodanie obsługi błędów połączenia

### 3. Frontend - SendVerifyCode
- [ ] Dodanie timeoutu 5s na dołączenie do gry
- [ ] Wyświetlanie błędów zamiast nieskończonego ładowania
- [ ] Przycisk "Spróbuj ponownie" po timeout

### 4. Pliki do modyfikacji
- `backend/index.js` - CORS config
- `frontend/lib/socket.ts` - timeout config
- `frontend/components/game/SendVerifyCode.tsx` - timeout i error handling
