'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Świąteczne hasła do bingo
const BINGO_ITEMS = [
  'Choinka', 'Śnieg', 'Prezenty', 'Kolęda', 'Mikołaj',
  'Renifery', 'Bombki', 'Opłatek', 'Wigilia', 'Gwiazda',
  'Sanie', 'Pierniki', 'Karp', 'Barszcz', 'Uszka',
  'Szopka', 'Świeczki', 'Łańcuch', 'Anioł', 'Dzwonek',
  'Skarpeta', 'Śnieżynka', 'Kominek', 'Kakao', 'Rękawiczki'
];

interface BingoProps {
  gameData?: string;
}

export default function Bingo({ gameData }: BingoProps) {
  const [board, setBoard] = useState<string[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [hasBingo, setHasBingo] = useState(false);

  // Generuj planszę 5x5 przy pierwszym renderze
  useEffect(() => {
    const shuffled = [...BINGO_ITEMS].sort(() => Math.random() - 0.5);
    const newBoard = shuffled.slice(0, 25);
    // Środkowe pole jest wolne
    newBoard[12] = '🎄 FREE 🎄';
    setBoard(newBoard);
    setMarked(new Set([12])); // Środkowe pole zaznaczone domyślnie
  }, []);

  const checkBingo = (newMarked: Set<number>) => {
    // Wiersze
    for (let row = 0; row < 5; row++) {
      let complete = true;
      for (let col = 0; col < 5; col++) {
        if (!newMarked.has(row * 5 + col)) complete = false;
      }
      if (complete) return true;
    }
    // Kolumny
    for (let col = 0; col < 5; col++) {
      let complete = true;
      for (let row = 0; row < 5; row++) {
        if (!newMarked.has(row * 5 + col)) complete = false;
      }
      if (complete) return true;
    }
    // Przekątne
    let diag1 = true, diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!newMarked.has(i * 5 + i)) diag1 = false;
      if (!newMarked.has(i * 5 + (4 - i))) diag2 = false;
    }
    return diag1 || diag2;
  };

  const toggleCell = (index: number) => {
    if (index === 12 || hasBingo) return; // Nie można odznaczyć środka lub po bingo
    
    const newMarked = new Set(marked);
    if (newMarked.has(index)) {
      newMarked.delete(index);
    } else {
      newMarked.add(index);
    }
    setMarked(newMarked);
    
    if (checkBingo(newMarked)) {
      setHasBingo(true);
    }
  };

  const resetGame = () => {
    const shuffled = [...BINGO_ITEMS].sort(() => Math.random() - 0.5);
    const newBoard = shuffled.slice(0, 25);
    newBoard[12] = '🎄 FREE 🎄';
    setBoard(newBoard);
    setMarked(new Set([12]));
    setHasBingo(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-6 mb-6 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white christmas-font">
          🎲 Świąteczne Bingo 🎲
        </h1>
        <p className="text-white/70 mt-2">
          Zaznacz hasła, które widzisz wokół siebie!
        </p>
      </motion.div>

      {/* Bingo celebration */}
      {hasBingo && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <div className="glass p-12 text-center">
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-8xl block mb-6"
            >
              🎉
            </motion.span>
            <h2 className="text-5xl font-bold text-yellow-400 christmas-font mb-6">
              BINGO!
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="btn glass-btn text-xl px-8"
            >
              Zagraj ponownie 🎁
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Bingo board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-4 md:p-6"
      >
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {board.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: index !== 12 ? 1.05 : 1 }}
              whileTap={{ scale: index !== 12 ? 0.95 : 1 }}
              onClick={() => toggleCell(index)}
              className={`
                w-14 h-14 md:w-20 md:h-20 rounded-lg
                flex items-center justify-center
                text-xs md:text-sm font-bold text-center p-1
                transition-all duration-300
                ${marked.has(index)
                  ? index === 12
                    ? 'bg-yellow-500/80 text-white border-2 border-yellow-300'
                    : 'bg-green-500/80 text-white border-2 border-green-300'
                  : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/30'
                }
              `}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center text-white/70"
      >
        <p>Kliknij pole aby je zaznaczyć. Ułóż linię (poziomo, pionowo lub po skosie)!</p>
      </motion.div>
    </div>
  );
}
