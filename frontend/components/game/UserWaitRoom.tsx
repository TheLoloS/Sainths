'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import PlayersList from './PlayersList';

export default function UserWaitRoom() {
  const gameData = useGameStore((state) => state.gameData);
  const currentUserLogin = typeof window !== 'undefined' ? localStorage.getItem('login') : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header - sukces dołączenia */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 md:p-8 mb-6 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-5xl mb-4 block"
        >
          ✅
        </motion.span>
        <h2 className="text-2xl md:text-3xl text-white font-bold christmas-font mb-2">
          Dołączyłeś do gry!
        </h2>
        {currentUserLogin && (
          <p className="text-white/70">
            Witaj, <span className="text-yellow-400 font-bold">{currentUserLogin}</span>!
          </p>
        )}
      </motion.div>

      {/* Informacja o grze */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-3xl">🎮</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Kod gry</h3>
            <p className="text-2xl font-mono text-yellow-400 tracking-wider">
              {gameData?.id || '---'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Lista graczy */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass p-6 mb-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 christmas-font flex items-center gap-2">
          <span>👥</span> Gracze w pokoju ({gameData.users?.length || 0})
        </h3>
        <PlayersList />
      </motion.div>

      {/* Status oczekiwania */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass p-6 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl mb-4"
        >
          ⏳
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Oczekiwanie na start...</h3>
        <p className="text-white/70">
          Host wybierze grę i rozpocznie rozgrywkę. Przygotuj się!
        </p>
        
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-3 h-3 rounded-full bg-green-400"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
