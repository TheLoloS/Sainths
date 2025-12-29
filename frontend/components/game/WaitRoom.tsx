'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import socket from '@/lib/socket';
import GameSelector from './GameSelector';
import PlayersList from './PlayersList';

export default function WaitRoom() {
  const gameData = useGameStore((state) => state.gameData);
  const [selectedGame, setSelectedGame] = useState('default');

  const handleStartGame = () => {
    socket.emit('startGame', { ...gameData, gameType: selectedGame });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header z kodem gry */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 md:p-8 mb-6 text-center"
      >
        <h2 className="text-xl md:text-2xl text-white/80 mb-2">Kod do gry:</h2>
        <div className="flex items-center justify-center gap-4">
          <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="text-5xl md:text-7xl font-bold text-yellow-400 tracking-[0.2em] font-mono"
          >
            {gameData?.id}
          </motion.span>
        </div>
        <p className="text-white/60 mt-4 text-sm">
          Podaj ten kod znajomym, aby mogli dołączyć do gry
        </p>
      </motion.div>

      {/* Główna sekcja - grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lewa kolumna - Gracze */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 lg:col-span-1"
        >
          <h3 className="text-xl font-bold text-white mb-4 christmas-font flex items-center gap-2">
            <span>👥</span> Gracze ({gameData.users?.length || 0})
          </h3>
          <PlayersList />
        </motion.div>

        {/* Prawa kolumna - Wybór gry */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 lg:col-span-2"
        >
          <GameSelector
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
          />
        </motion.div>
      </div>

      {/* Przycisk Start */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartGame}
          disabled={!gameData.users?.length}
          className={`
            btn glass-btn text-xl md:text-2xl px-12 py-5 h-auto rounded-full
            ${!gameData.users?.length ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span className="mr-3">🎄</span>
          Zaczynajmy!
          <span className="ml-3">🎅</span>
        </motion.button>
        
        {!gameData.users?.length && (
          <p className="text-white/60 mt-3 text-sm">
            Poczekaj aż gracze dołączą do gry
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
