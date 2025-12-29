'use client';

import { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';

export function GameStoreInitializer() {
  const initializeSocketListeners = useGameStore((state) => state.initializeSocketListeners);

  useEffect(() => {
    initializeSocketListeners();
  }, [initializeSocketListeners]);

  return null;
}
