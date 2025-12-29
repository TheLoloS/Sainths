'use client';

import { useState, useEffect } from 'react';
import socket from '@/lib/socket';

interface CountdownTimerProps {
  initialTimeInMinutes: number;
}

export default function CountdownTimer({ initialTimeInMinutes }: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(initialTimeInMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const onTimeExpired = () => {
    const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
    socket.emit('timeEndGameOne', gameData);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
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
    setIsRunning(true);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
    );
  };

  return (
    <div>
      <p className="text-center m-4">Czas pozostały: {formatTime(remainingTime)}</p>
      {!isRunning && (
        <button
          onClick={startTimer}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Rozpocznij odliczanie
        </button>
      )}
    </div>
  );
}
