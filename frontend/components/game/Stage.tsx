'use client';

import { useGameStore } from '@/lib/stores/gameStore';
import CreateGame from './CreateGame';
import FirstGame from '@/components/games/Main/Game_1';
import Trivia from '@/components/games/Trivia/Trivia';
import Bingo from '@/components/games/Bingo/Bingo';
import ScavengerHunt from '@/components/games/ScavengerHunt/ScavengerHunt';

interface StageProps {
  gameData?: string;
}

export default function Stage({ gameData }: StageProps) {
  const GameData = useGameStore((state) => state.gameData);
  const value = GameData.roomStage ?? 0;
  const gameType = GameData.gameType;

  console.log(GameData.roomStage);

  if (value === 0) {
    return <CreateGame />;
  }

  if (value === 1) {
    switch (gameType) {
      case 'trivia':
        return <Trivia gameData={gameData} />;
      case 'bingo':
        return <Bingo gameData={gameData} />;
      case 'scavenger':
        return <ScavengerHunt gameData={gameData} />;
      default:
        return <FirstGame gameData={gameData} />;
    }
  }

  return <p>{value}</p>;
}
