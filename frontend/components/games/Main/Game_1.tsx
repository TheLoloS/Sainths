'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import socket from '@/lib/socket';
import CountdownTimer from '../Timer/timer';
import PlayersList from '@/components/game/PlayersList';
import { songs } from '../Data/game1';

interface PlayerScore {
  login: string;
  score: number;
}

interface FirstGameProps {
  gameData?: string;
}

export default function FirstGame({ gameData }: FirstGameProps) {
  const GameData = useGameStore((state) => state.gameData);
  const [gamePhase, setGamePhase] = useState<'waiting' | 'playing' | 'results'>('waiting');
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [customDuration, setCustomDuration] = useState(60);

  const currentSong = songs[selectedSongIndex];

  useEffect(() => {
    if (currentSong?.duration) {
      setCustomDuration(currentSong.duration);
    }
  }, [selectedSongIndex, currentSong?.duration]);

  useEffect(() => {
    socket.on('playerScore', (data: PlayerScore) => {
      setPlayerScores(prev => {
        const exists = prev.find(p => p.login === data.login);
        if (exists) {
          return prev.map(p => p.login === data.login ? data : p);
        }
        return [...prev, data];
      });
    });

    socket.on('gameRoundEnded', () => {
      setGamePhase('results');
    });

    return () => {
      socket.off('playerScore');
      socket.off('gameRoundEnded');
    };
  }, []);

  const handleGameStart = () => {
    setGamePhase('playing');
    setPlayerScores([]);
    const gameDataLocal = JSON.parse(localStorage.getItem('gameData') || '{}');
    socket.emit('setSongConfig', {
      ...gameDataLocal,
      songIndex: selectedSongIndex,
      duration: customDuration
    });
  };

  const handleTimeEnd = () => {
    setGamePhase('results');
  };

  const handleNextRound = () => {
    const nextIndex = (selectedSongIndex + 1) % songs.length;
    setSelectedSongIndex(nextIndex);
    setGamePhase('waiting');
    setPlayerScores([]);
  };

  const sortedScores = [...playerScores].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-6 mb-6 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white christmas-font">
            Uzupelnij Piosenke
          </h1>
          <p className="text-white/70 mt-2">
            {gamePhase === 'waiting' && 'Przygotuj sie do gry!'}
            {gamePhase === 'playing' && 'Gracze uzupelniaja slowa koledy'}
            {gamePhase === 'results' && 'Wyniki rundy'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {gamePhase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-white christmas-font text-center mb-6">
                Wyniki Rundy
              </h2>
              
              {sortedScores.length > 0 ? (
                <div className="space-y-3 max-w-md mx-auto mb-8">
                  {sortedScores.map((player, index) => (
                    <motion.div
                      key={player.login}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        index === 0 ? 'bg-yellow-500/30 border-2 border-yellow-400' : 
                        index === 1 ? 'bg-gray-400/20 border border-gray-400' :
                        index === 2 ? 'bg-amber-700/20 border border-amber-600' : 
                        'bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {index === 0 ? '1.' : index === 1 ? '2.' : index === 2 ? '3.' : `${index + 1}.`}
                        </span>
                        <span className="font-bold text-white">{player.login}</span>
                      </div>
                      <span className={`text-xl font-bold ${
                        player.score >= 80 ? 'text-green-400' : 
                        player.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {player.score}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-white/70 text-center mb-8">Brak wynikow do wyswietlenia</p>
              )}

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextRound}
                  className="btn glass-btn text-xl px-8"
                >
                  Nastepna runda
                </motion.button>
              </div>
            </motion.div>
          )}

          {(gamePhase === 'waiting' || gamePhase === 'playing') && (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass p-6 lg:col-span-2"
                >
                  {gamePhase === 'waiting' && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-4 christmas-font">
                        Wybierz piosenke
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {songs.map((song, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedSongIndex(index)}
                            className={`p-3 rounded-xl text-left transition-all ${
                              selectedSongIndex === index
                                ? 'bg-green-500/30 border-2 border-green-400'
                                : 'bg-white/10 border border-white/20 hover:bg-white/20'
                            }`}
                          >
                            <p className="text-white font-medium text-sm truncate">{song.title}</p>
                            <p className="text-white/60 text-xs">{song.duration}s</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {gamePhase === 'waiting' && (
                    <div className="mb-6">
                      <h4 className="text-white/80 mb-2">Czas gry (sekundy)</h4>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="30"
                          max="180"
                          step="15"
                          value={customDuration}
                          onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                          className="flex-1 accent-green-500"
                        />
                        <span className="text-white font-bold w-16 text-center">
                          {customDuration}s
                        </span>
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-4 christmas-font">
                    {currentSong?.title || 'Piosenka'}
                  </h3>
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <audio 
                      controls 
                      className="w-full"
                      style={{ filter: 'invert(1)', borderRadius: '8px' }}
                      key={currentSong?.audioFile}
                    >
                      <source src={currentSong?.audioFile || '/cicha_noc.mp3'} type="audio/mp3" />
                      Twoja przegladarka nie obsluguje tagu audio.
                    </audio>
                  </div>

                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <h4 className="text-white/80 mb-4">Pozostaly czas</h4>
                    <CountdownTimer 
                      initialTimeInMinutes={customDuration / 60} 
                      onStart={handleGameStart}
                      onEnd={handleTimeEnd}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 christmas-font flex items-center gap-2">
                    <span>Gracze</span> ({GameData.users?.length || 0})
                  </h3>
                  <PlayersList />
                  
                  {gamePhase === 'playing' && playerScores.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <h4 className="text-sm text-white/70 mb-2">Przeslane wyniki:</h4>
                      {playerScores.map(ps => (
                        <div key={ps.login} className="flex justify-between text-sm py-1">
                          <span className="text-white">{ps.login}</span>
                          <span className="text-green-400">{ps.score}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {gamePhase === 'waiting' && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass p-6 mt-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 christmas-font text-center">
                    Jak grac?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4">
                      <span className="text-3xl mb-2 block">1</span>
                      <p className="text-white/80">Kliknij Rozpocznij aby uruchomic timer</p>
                    </div>
                    <div className="p-4">
                      <span className="text-3xl mb-2 block">2</span>
                      <p className="text-white/80">Gracze sluchaja i uzupelniaja slowa</p>
                    </div>
                    <div className="p-4">
                      <span className="text-3xl mb-2 block">3</span>
                      <p className="text-white/80">Po czasie wyniki sa automatycznie zliczane</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
