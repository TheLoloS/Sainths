'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import socket from '@/lib/socket';

interface CountdownTimerProps {
  initialTimeInMinutes: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountdownTimer({ initialTimeInMinutes, onStart, onEnd }: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(initialTimeInMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const totalTime = initialTimeInMinutes * 60;
  const hasEnded = useRef(false);

  const onTimeExpired = () => {
    if (hasEnded.current) return;
    hasEnded.current = true;
    
    const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
    socket.emit('timeEndGameOne', gameData);
    onEnd?.();
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            // Synchronizuj czas z graczami co 10 sekund
            if (prevTime % 10 === 0) {
              const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
              socket.emit('syncTimer', { ...gameData, timeLeft: prevTime - 1 });
            }
            return prevTime - 1;
          } else {
            clearInterval(intervalId);
            setIsRunning(false);
            onTimeExpired();
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startTimer = () => {
    const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
    socket.emit('startGameOne', gameData);
    hasEnded.current = false;
    setIsRunning(true);
    onStart?.();
  };

  const resetTimer = () => {
    setRemainingTime(totalTime);
    setIsRunning(false);
    hasEnded.current = false;
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = (remainingTime / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45

  return (
    <div className="flex flex-col items-center">
      {/* Circular Progress */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke={progress > 20 ? '#22c55e' : progress > 10 ? '#eab308' : '#ef4444'}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold font-mono ${
            progress > 20 ? 'text-green-400' : progress > 10 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {formatTime(remainingTime)}
          </span>
        </div>
      </div>

      {/* Start button */}
      {!isRunning && remainingTime === totalTime && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startTimer}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-green-500 hover:to-green-600 transition-all"
        >
          ▶️ Rozpocznij
        </motion.button>
      )}

      {/* Status */}
      {isRunning && (
        <p className="text-white/70 text-sm">Gra trwa...</p>
      )}

      {!isRunning && remainingTime === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <p className="text-yellow-400 font-bold text-lg mb-4">⏰ Czas minął!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="text-sm text-white/60 hover:text-white underline"
          >
            Zresetuj timer
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
