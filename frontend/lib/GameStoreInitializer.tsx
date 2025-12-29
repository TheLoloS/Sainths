'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from './stores/gameStore';
import { getSession, clearSession, saveSession } from './sessionManager';
import socket from './socket';

export function GameStoreInitializer() {
  const initializeSocketListeners = useGameStore((state) => state.initializeSocketListeners);
  const setGameData = useGameStore((state) => state.setGameData);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    // Inicjalizuj nasłuchiwacze socket
    initializeSocketListeners();

    // Spróbuj przywrócić sesję
    const session = getSession();
    
    if (session) {
      console.log('Przywracanie sesji:', session);
      
      if (session.isHost) {
        // Host - spróbuj odtworzyć grę
        socket.emit('restoreGame', { gameId: session.gameId });
      } else {
        // Gracz - spróbuj dołączyć ponownie
        socket.emit('rejoinGame', { 
          id: session.gameId, 
          login: session.login 
        });
      }

      // Ustaw timeout na przywracanie
      const timeout = setTimeout(() => {
        setIsRestoring(false);
      }, 3000);

      // Obsłuż odpowiedź
      socket.once('rejoinSuccess', (data) => {
        clearTimeout(timeout);
        console.log('Sesja przywrócona:', data);
        setGameData(data);
        setIsRestoring(false);
      });

      socket.once('rejoinFailed', () => {
        clearTimeout(timeout);
        console.log('Nie udało się przywrócić sesji');
        clearSession();
        setIsRestoring(false);
      });

      socket.once('restoreGameSuccess', (data) => {
        clearTimeout(timeout);
        console.log('Gra przywrócona:', data);
        setGameData(data);
        setIsRestoring(false);
      });

      socket.once('restoreGameFailed', () => {
        clearTimeout(timeout);
        console.log('Nie udało się przywrócić gry');
        clearSession();
        setIsRestoring(false);
      });

    } else {
      setIsRestoring(false);
    }

    return () => {
      socket.off('rejoinSuccess');
      socket.off('rejoinFailed');
      socket.off('restoreGameSuccess');
      socket.off('restoreGameFailed');
    };
  }, [initializeSocketListeners, setGameData]);

  return null;
}
