'use client';

import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  timeout: 5000,  // 5 sekund timeout na połączenie
  reconnectionAttempts: 3,  // 3 próby ponownego połączenia
  reconnectionDelay: 1000,  // 1 sekunda między próbami
});

// Obsługa błędów połączenia
socket.on('connect_error', (error) => {
  console.error('Błąd połączenia z serwerem:', error.message);
});

socket.on('connect_timeout', () => {
  console.error('Timeout połączenia z serwerem');
});

export default socket;
