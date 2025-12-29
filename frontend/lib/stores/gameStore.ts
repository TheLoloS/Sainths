import { create } from 'zustand';
import { GameData } from '@/types';
import socket from '../socket';
import SetGameState from '../SetGameState';

interface GameStore {
  gameData: GameData;
  setGameData: (data: GameData) => void;
  initializeSocketListeners: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameData: {},
  
  setGameData: (data: GameData) => {
    set({ gameData: data });
    SetGameState('set', 'gameData', JSON.stringify(data));
  },
  
  initializeSocketListeners: () => {
    if (typeof window !== 'undefined' && localStorage.getItem('gameData')) {
      socket.emit('createGame');
    }

    socket.on('joinToGame', (data: GameData) => {
      set({ gameData: data });
      SetGameState('set', 'gameData', JSON.stringify(data));
    });

    socket.on('createGame', (data: GameData) => {
      set({ gameData: data });
      SetGameState('set', 'gameData', JSON.stringify(data));
    });

    socket.on('refreshTab', (data: GameData) => {
      console.log('odświeżono');
      set({ gameData: data });
      SetGameState('set', 'gameData', JSON.stringify(data));
    });
  },
}));
