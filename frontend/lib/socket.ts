'use client';

import { io, Socket } from 'socket.io-client';

// Funkcja do określenia URL backendu
function getBackendUrl(): string {
  // 1. Sprawdź zmienną środowiskową
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  
  // 2. Jeśli jesteśmy w przeglądarce, użyj tego samego hosta co frontend
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Jeśli to localhost lub 127.0.0.1, użyj domyślnego
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    // W przeciwnym razie użyj tego samego IP co frontend ale port 3001
    return `http://${hostname}:3001`;
  }
  
  // 3. Domyślnie
  return 'http://localhost:3001';
}

const BACKEND_URL = getBackendUrl();
console.log('Łączenie z backendem:', BACKEND_URL);

export const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  timeout: 5000,  // 5 sekund timeout na połączenie
  reconnectionAttempts: 3,  // 3 próby ponownego połączenia
  reconnectionDelay: 1000,  // 1 sekunda między próbami
  transports: ['websocket', 'polling'],  // Spróbuj najpierw websocket, potem polling
});

// Obsługa błędów połączenia
socket.on('connect', () => {
  console.log('Połączono z serwerem');
});

socket.on('connect_error', (error) => {
  console.error('Błąd połączenia z serwerem:', error.message);
});

socket.on('connect_timeout', () => {
  console.error('Timeout połączenia z serwerem');
});

socket.on('disconnect', (reason) => {
  console.log('Rozłączono z serwerem:', reason);
});

export default socket;
