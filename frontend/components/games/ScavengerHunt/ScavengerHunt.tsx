'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lista zadań do poszukiwań
const CHALLENGES = [
  { id: 1, task: 'Znajdź coś CZERWONEGO', emoji: '🔴', hint: 'Świąteczny kolor!' },
  { id: 2, task: 'Znajdź coś ZIELONEGO', emoji: '🟢', hint: 'Jak choinka!' },
  { id: 3, task: 'Znajdź coś ZŁOTEGO/ŻÓŁTEGO', emoji: '🟡', hint: 'Jak gwiazdka!' },
  { id: 4, task: 'Znajdź coś OKRĄGŁEGO', emoji: '⭕', hint: 'Może bombka?' },
  { id: 5, task: 'Znajdź coś BŁYSZCZĄCEGO', emoji: '✨', hint: 'Świeci!' },
  { id: 6, task: 'Znajdź coś MIĘKKIEGO', emoji: '🧸', hint: 'Przyjemne w dotyku' },
  { id: 7, task: 'Znajdź coś ŚWIĄTECZNEGO', emoji: '🎄', hint: 'W duchu świąt!' },
  { id: 8, task: 'Znajdź coś CO PACHNIE', emoji: '👃', hint: 'Może pierniczki?' },
  { id: 9, task: 'Znajdź coś Z NAPISEM', emoji: '📝', hint: 'Życzenia?' },
  { id: 10, task: 'Znajdź coś MAŁEGO', emoji: '🔍', hint: 'Mniejsze niż dłoń' },
];

interface ScavengerHuntProps {
  gameData?: string;
}

export default function ScavengerHunt({ gameData }: ScavengerHuntProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameFinished) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameFinished]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeElapsed(0);
    setCompleted(new Set());
    setCurrentIndex(0);
    setGameFinished(false);
  };

  const markAsFound = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(CHALLENGES[currentIndex].id);
    setCompleted(newCompleted);
    setShowHint(false);

    if (newCompleted.size === CHALLENGES.length) {
      setGameFinished(true);
      setIsPlaying(false);
    } else {
      // Przejdź do następnego niezaliczonego
      let next = (currentIndex + 1) % CHALLENGES.length;
      while (newCompleted.has(CHALLENGES[next].id)) {
        next = (next + 1) % CHALLENGES.length;
      }
      setCurrentIndex(next);
    }
  };

  const skipChallenge = () => {
    setShowHint(false);
    let next = (currentIndex + 1) % CHALLENGES.length;
    let attempts = 0;
    while (completed.has(CHALLENGES[next].id) && attempts < CHALLENGES.length) {
      next = (next + 1) % CHALLENGES.length;
      attempts++;
    }
    setCurrentIndex(next);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const current = CHALLENGES[currentIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      {/* Start screen */}
      {!isPlaying && !gameFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 text-center max-w-lg"
        >
          <span className="text-7xl mb-6 block">🔍</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white christmas-font mb-4">
            Poszukiwacze Skarbów
          </h1>
          <p className="text-white/80 mb-8">
            Znajdź {CHALLENGES.length} przedmiotów w domu tak szybko jak się da!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="btn glass-btn text-xl px-10"
          >
            Zacznij poszukiwania! 🎯
          </motion.button>
        </motion.div>
      )}

      {/* Game finished */}
      {gameFinished && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass p-8 md:p-12 text-center max-w-lg"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-7xl mb-6 block"
          >
            🏆
          </motion.span>
          <h1 className="text-4xl font-bold text-yellow-400 christmas-font mb-4">
            Gratulacje!
          </h1>
          <p className="text-white text-xl mb-2">Znalazłeś wszystko!</p>
          <p className="text-white/80 mb-8">
            Twój czas: <span className="text-green-400 font-bold text-2xl">{formatTime(timeElapsed)}</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="btn glass-btn text-xl px-8"
          >
            Zagraj ponownie 🔄
          </motion.button>
        </motion.div>
      )}

      {/* Active game */}
      {isPlaying && !gameFinished && (
        <div className="w-full max-w-lg">
          {/* Progress bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass p-4 mb-6"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">Postęp: {completed.size}/{CHALLENGES.length}</span>
              <span className="text-yellow-400 font-bold font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completed.size / CHALLENGES.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
              />
            </div>
          </motion.div>

          {/* Current challenge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="glass p-8 text-center mb-6"
            >
              <span className="text-6xl mb-4 block">{current.emoji}</span>
              <h2 className="text-2xl font-bold text-white mb-4 christmas-font">
                {current.task}
              </h2>
              
              {showHint && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-yellow-300 mb-4"
                >
                  💡 Podpowiedź: {current.hint}
                </motion.p>
              )}

              <div className="flex gap-4 justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHint(true)}
                  className="btn glass-btn"
                  disabled={showHint}
                >
                  Podpowiedź 💡
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={skipChallenge}
                  className="btn glass-btn"
                >
                  Pomiń ⏭️
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Found it button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAsFound}
            className="w-full py-5 rounded-xl font-bold text-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 shadow-lg"
          >
            ✅ Znalazłem!
          </motion.button>
        </div>
      )}
    </div>
  );
}
