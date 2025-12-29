'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import socket from '@/lib/socket';
import { saveSession, getSession } from '@/lib/sessionManager';
import WaitRoom from './WaitRoom';

export default function CreateGame() {
  const gameData = useGameStore((state) => state.gameData);

  // Zapisz sesję hosta gdy gra zostanie utworzona
  useEffect(() => {
    if (gameData.id) {
      saveSession({
        gameId: gameData.id,
        login: 'HOST',
        isHost: true,
      });
    }
  }, [gameData.id]);

  // Sprawdź czy jest zapisana sesja hosta
  useEffect(() => {
    const session = getSession();
    if (session && session.isHost && !gameData.id) {
      // Spróbuj przywrócić grę
      socket.emit('restoreGame', { gameId: session.gameId });
    }
  }, []);

  function eventHandler() {
    socket.emit('createGame');
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {gameData.id ? (
        <WaitRoom />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 md:p-12 max-w-lg w-full text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl mb-6 block"
          >
            🎅
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 christmas-font">
            Witaj w Sainths!
          </h1>
          
          <p className="text-white/80 text-lg mb-8">
            Stwórz pokój gry i zaproś znajomych do wspólnej zabawy!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn glass-btn text-xl px-10 py-4 h-auto rounded-full"
            onClick={() => eventHandler()}
          >
            <span className="mr-2">🎄</span>
            Stwórz Grę
            <span className="ml-2">🎄</span>
          </motion.button>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              Po stworzeniu gry otrzymasz kod, który możesz udostępnić znajomym
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
