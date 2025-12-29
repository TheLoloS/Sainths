'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import socket from '@/lib/socket';
import SetGameState from '@/lib/SetGameState';
import { saveSession, getSession, clearSession } from '@/lib/sessionManager';
import { useGameStore } from '@/lib/stores/gameStore';
import UserWaitRoom from './UserWaitRoom';
import { GameData, SocketMessage } from '@/types';

const JOIN_TIMEOUT = 5000; // 5 sekund timeout

export default function SendVerifyCode() {
  const gameData = useGameStore((state) => state.gameData);
  const [codeVerify, setVerifyCode] = useState('');
  const [joinToGame, setJoinToGame] = useState<GameData | false>(false);
  const [login, setLogin] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sprawdź początkowy stan połączenia
    setIsConnected(socket.connected);
    
    // Sprawdź czy jest zapisana sesja i gameData jest już załadowane
    const session = getSession();
    if (session && !session.isHost && gameData?.id) {
      console.log('Przywracanie sesji gracza z gameStore');
      setJoinToGame(gameData);
    }

    socket.on('connect', () => {
      console.log('Socket połączony');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket rozłączony');
      setIsConnected(false);
    });

    socket.on('joinToGame', (data: GameData) => {
      // Sukces - wyczyść timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setJoinToGame(data);
      setPending(false);
      setError(null);
      
      // Zapisz sesję
      if (data.id) {
        saveSession({
          gameId: data.id,
          login: login || localStorage.getItem('login') || '',
          isHost: false,
        });
      }
      
      console.table([data]);
    });

    socket.on('message', (data: SocketMessage) => {
      if (data.type === 'error') {
        // Błąd z serwera - wyczyść timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setPending(false);
        setError(data.value || 'Wystąpił błąd');
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Błąd połączenia:', err.message);
      setIsConnected(false);
      if (pending) {
        setPending(false);
        setError(`Nie można połączyć się z serwerem: ${err.message}`);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('joinToGame');
      socket.off('message');
      socket.off('connect_error');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pending]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    
    // Sprawdź czy socket jest połączony
    if (!socket.connected) {
      setError('Brak połączenia z serwerem. Upewnij się że backend jest uruchomiony i jesteś w tej samej sieci.');
      setPending(false);
      return;
    }
    
    console.log('Wysyłanie joinToGame:', { id: codeVerify, login: login });
    
    // Ustaw timeout 5 sekund
    timeoutRef.current = setTimeout(() => {
      setPending(false);
      setError('Przekroczono czas oczekiwania (5s). Sprawdź czy kod jest poprawny i czy jesteś w tej samej sieci.');
    }, JOIN_TIMEOUT);

    socket.emit('joinToGame', { id: codeVerify, login: login });
    SetGameState('set', 'login', login);
  }

  function handleRetry() {
    setError(null);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {!joinToGame ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 md:p-12 max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-4 block"
            >
              🎮
            </motion.span>
            <h1 className="text-3xl md:text-4xl text-white font-bold christmas-font mb-2">
              Dołącz do gry
            </h1>
            <p className="text-white/70">
              Wprowadź kod otrzymany od hosta gry
            </p>
          </div>

          {/* Formularz */}
          <form
            onSubmit={(e) => {
              setPending(true);
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            {/* Pole kodu */}
            <div>
              <label className="block text-white/80 text-sm mb-2 font-medium">
                Kod gry
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Wpisz kod..."
                value={codeVerify}
                onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         text-white text-center text-2xl tracking-[0.3em] font-mono
                         placeholder:text-white/40 placeholder:tracking-normal placeholder:text-base
                         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                         transition-all duration-300"
                maxLength={6}
              />
            </div>

            {/* Pole loginu */}
            <div>
              <label className="block text-white/80 text-sm mb-2 font-medium">
                Twój pseudonim
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Jak masz na imię?"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         text-white
                         placeholder:text-white/40
                         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                         transition-all duration-300"
                maxLength={20}
              />
            </div>

            {/* Przycisk */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={pending || !codeVerify || !login || !!error}
              className={`
                w-full py-4 rounded-xl font-bold text-lg
                transition-all duration-300
                ${pending || !codeVerify || !login || error
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-600/30'
                }
              `}
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    ⏳
                  </motion.span>
                  Łączenie...
                </span>
              ) : (
                <span>Dołącz do gry 🎄</span>
              )}
            </motion.button>

            {/* Komunikat o błędzie */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/20 border border-red-500/40"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div className="flex-1">
                    <p className="text-red-200 text-sm">{error}</p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-2 text-sm text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Spróbuj ponownie
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* Informacja */}
          <div className="mt-8 pt-6 border-t border-white/20">
            {/* Status połączenia */}
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ scale: isConnected ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: isConnected ? Infinity : 0, duration: 2 }}
                className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
              />
              <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Połączono z serwerem' : 'Brak połączenia z serwerem'}
              </span>
            </div>
            
            <div className="flex items-start gap-3 text-white/60 text-sm">
              <span className="text-xl">💡</span>
              <p>
                Kod gry otrzymasz od osoby, która utworzyła pokój. Upewnij się, że jesteście w tej samej sieci lokalnej.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <UserWaitRoom />
      )}

      {/* Przycisk reset - bardziej dyskretny */}
      <button
        className="fixed bottom-4 left-4 text-white/30 hover:text-white/60 text-xs transition-colors"
        onClick={() => localStorage.clear()}
      >
        🔄 Reset
      </button>
    </div>
  );
}
