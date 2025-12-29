'use client';

import { motion } from 'framer-motion';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const games: Game[] = [
  {
    id: 'default',
    name: 'Uzupełnij Piosenkę',
    description: 'Posłuchaj kolędy i uzupełnij brakujące słowa w tekście. Kto będzie najszybszy?',
    icon: '🎵',
    color: 'from-purple-600/80 to-purple-800/80',
  },
  {
    id: 'trivia',
    name: 'Świąteczny Quiz',
    description: 'Odpowiedz na pytania o świątecznych tradycjach, historii i ciekawostkach.',
    icon: '❓',
    color: 'from-blue-600/80 to-blue-800/80',
  },
  {
    id: 'bingo',
    name: 'Świąteczne Bingo',
    description: 'Klasyczne bingo w świątecznym wydaniu. Zaznaczaj hasła i zdobywaj linie!',
    icon: '🎲',
    color: 'from-green-600/80 to-green-800/80',
  },
  {
    id: 'scavenger',
    name: 'Poszukiwacze Skarbów',
    description: 'Znajdź przedmioty ukryte w domu według wskazówek. Kto pierwszy?',
    icon: '🔍',
    color: 'from-amber-600/80 to-amber-800/80',
  },
];

interface GameSelectorProps {
  selectedGame: string;
  onSelectGame: (gameId: string) => void;
}

export default function GameSelector({ selectedGame, onSelectGame }: GameSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-6 christmas-font text-center">
        🎮 Wybierz grę 🎮
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-5 rounded-xl text-left transition-all duration-300
              bg-gradient-to-br ${game.color}
              border-2 
              ${
                selectedGame === game.id
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/30 ring-2 ring-yellow-400/50'
                  : 'border-white/20 hover:border-white/40'
              }
            `}
          >
            {/* Zaznaczenie wybranej gry */}
            {selectedGame === game.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-black text-lg">✓</span>
              </motion.div>
            )}

            <div className="flex items-start gap-4">
              <span className="text-4xl">{game.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white text-lg mb-1">{game.name}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{game.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
