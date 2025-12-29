'use client';

import { useGameStore } from '@/lib/stores/gameStore';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlayersList() {
  const gameData = useGameStore((state) => state.gameData);
  const users = gameData.users || [];

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl mb-4"
        >
          ⏳
        </motion.div>
        <p className="text-white/70">Oczekiwanie na graczy...</p>
        <p className="text-white/50 text-sm mt-2">
          Podaj znajomym kod gry, aby mogli dołączyć
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((player, index) => (
        <motion.div
          key={player.login}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.login}`}
                alt={`Avatar ${player.login}`}
                width={48}
                height={48}
                className="w-full h-full"
              />
            </div>
            {index === 0 && (
              <span className="absolute -top-1 -right-1 text-lg">👑</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white truncate">{player.login}</p>
            <p className="text-white/60 text-sm">{player.points} pkt</p>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
            className="text-green-400 text-xl"
          >
            ●
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
