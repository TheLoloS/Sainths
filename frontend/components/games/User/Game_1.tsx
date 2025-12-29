'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import socket from '@/lib/socket';
import { getSession } from '@/lib/sessionManager';
import { songs } from '../Data/game1';

export default function FirstGame() {
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  
  // Lista wszystkich kluczy inputów w kolejności
  const [inputKeys, setInputKeys] = useState<string[]>([]);

  // Wygeneruj listę kluczy przy starcie
  useEffect(() => {
    const keys: string[] = [];
    songs[0].data.forEach((line, lineIndex) => {
      line.split(' ').forEach((_, wordIndex) => {
        keys.push(`${lineIndex}-${wordIndex}`);
      });
    });
    setInputKeys(keys);
  }, []);

  useEffect(() => {
    // Sprawdź czy gra już trwa przy załadowaniu (po odświeżeniu)
    socket.on('gameStatus', (data: { isPlaying: boolean; timeLeft: number }) => {
      if (data.isPlaying) {
        setStartGame(true);
        setTimeLeft(data.timeLeft);
        setScore(null);
      }
    });

    socket.on('startGameOne', () => {
      setStartGame(true);
      setScore(null);
      setAnswers({});
      setTimeLeft(60);
    });

    // Synchronizacja czasu z serwera
    socket.on('timerSync', (serverTimeLeft: number) => {
      setTimeLeft(serverTimeLeft);
    });

    socket.on('timeEndGameOne', () => {
      // Funkcja do normalizacji polskich znaków
      const normalizePolish = (str: string): string => {
        const polishChars: Record<string, string> = {
          'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
          'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
          'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
          'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
        };
        return str.split('').map(char => polishChars[char] || char).join('');
      };

      // Oblicz wynik
      let correct = 0;
      let total = 0;
      
      songs[0].data.forEach((line, lineIndex) => {
        line.split(' ').forEach((word, wordIndex) => {
          total++;
          const key = `${lineIndex}-${wordIndex}`;
          const answer = answers[key] || '';
          // Porównaj z normalizacją polskich znaków
          if (normalizePolish(answer.toLowerCase().trim()) === normalizePolish(word.toLowerCase().trim())) {
            correct++;
          }
        });
      });
      
      const finalScore = Math.round((correct / total) * 100);
      setScore(finalScore);
      setStartGame(false);
      
      // Wyślij wynik do serwera
      const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
      socket.emit('gameOneScore', { ...gameData, score: finalScore });
    });

    // Zapytaj serwer o status gry przy załadowaniu
    const session = getSession();
    if (session && !session.isHost) {
      socket.emit('requestGameStatus', { gameId: session.gameId });
    }

    return () => {
      socket.off('gameStatus');
      socket.off('startGameOne');
      socket.off('timerSync');
      socket.off('timeEndGameOne');
    };
  }, [answers]);

  // Timer lokalny dla UI (backup gdy serwer nie synchronizuje)
  useEffect(() => {
    if (startGame && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [startGame, timeLeft]);

  // Funkcja do normalizacji polskich znaków
  const normalizePolish = (str: string): string => {
    const polishChars: Record<string, string> = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
      'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
      'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
      'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };
    return str.split('').map(char => polishChars[char] || char).join('');
  };

  // Porównanie z uwzględnieniem polskich znaków
  const compareWords = (input: string, correct: string): boolean => {
    const normalizedInput = normalizePolish(input.toLowerCase().trim());
    const normalizedCorrect = normalizePolish(correct.toLowerCase().trim());
    return normalizedInput === normalizedCorrect;
  };

  const handleInputChange = (key: string, value: string, correctWord: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    // Jeśli odpowiedź jest poprawna, przejdź do następnego pola
    if (compareWords(value, correctWord)) {
      const currentIndex = inputKeys.indexOf(key);
      if (currentIndex < inputKeys.length - 1) {
        const nextKey = inputKeys[currentIndex + 1];
        // Małe opóźnienie żeby użytkownik zobaczył zielony kolor
        setTimeout(() => {
          inputRefs.current[nextKey]?.focus();
        }, 200);
      }
    }
  };

  const isCorrect = (key: string, word: string) => {
    if (!answers[key]) return false;
    return compareWords(answers[key], word);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-6 mb-6 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white christmas-font">
            🎵 Uzupełnij Piosenkę 🎵
          </h1>
          <p className="text-white/70 mt-2">{songs[0].title}</p>
          
          {startGame && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <span className="text-white/60">Pozostało:</span>
              <span className={`text-2xl font-bold font-mono ${
                timeLeft > 20 ? 'text-green-400' : timeLeft > 10 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </motion.div>

        {/* Game content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-6"
        >
          {!startGame && score === null && (
            <div className="text-center py-12">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-6"
              >
                ⏳
              </motion.div>
              <h2 className="text-xl text-white mb-2">Czekaj na rozpoczęcie gry</h2>
              <p className="text-white/60">Host uruchomi grę za chwilę...</p>
            </div>
          )}

          {startGame && (
            <div className="space-y-6">
              {songs[0].data.map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-wrap gap-2 items-center">
                  {line.split(' ').map((word, wordIndex) => {
                    const key = `${lineIndex}-${wordIndex}`;
                    const correct = isCorrect(key, word);
                    
                    return (
                      <input
                        key={key}
                        ref={(el) => { inputRefs.current[key] = el; }}
                        type="text"
                        value={answers[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value, word)}
                        className={`
                          px-2 py-1 rounded text-center font-medium
                          border-2 transition-all duration-200
                          focus:outline-none focus:ring-2
                          ${correct 
                            ? 'bg-green-500/30 border-green-500 text-green-200 focus:ring-green-400' 
                            : answers[key] 
                              ? 'bg-red-500/30 border-red-500 text-red-200 focus:ring-red-400'
                              : 'bg-white/10 border-white/30 text-white focus:ring-yellow-400'
                          }
                        `}
                        style={{ width: `${Math.max(word.length * 14, 50)}px` }}
                        placeholder="..."
                        autoComplete="off"
                        disabled={correct}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {score !== null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <span className="text-6xl mb-4 block">
                {score >= 80 ? '🏆' : score >= 50 ? '👍' : '💪'}
              </span>
              <h2 className="text-3xl font-bold text-white christmas-font mb-4">
                Koniec czasu!
              </h2>
              <p className="text-white/80 mb-2">Twój wynik:</p>
              <p className={`text-5xl font-bold ${
                score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {score}%
              </p>
              <p className="text-white/60 mt-4">Czekaj na kolejną rundę...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
