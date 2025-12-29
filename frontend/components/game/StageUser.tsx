'use client';

import { useGameStore } from '@/lib/stores/gameStore';
import FirstGame from '@/components/games/User/Game_1';
import SendVerifyCode from './SendVerifyCode';

interface StageUserProps {
  gameData?: string;
}

export default function StageUser({ gameData }: StageUserProps) {
  const GameData = useGameStore((state) => state.gameData);
  const value = GameData.roomStage ?? 0;

  console.log('StageUser: ', GameData);

  return value === 0 ? (
    <SendVerifyCode />
  ) : value === 1 ? (
    <FirstGame />
  ) : value === 2 ? (
    <p>{value}</p>
  ) : value === 3 ? (
    <p>{value}</p>
  ) : value === 4 ? (
    <p>{value}</p>
  ) : value === 5 ? (
    <p>{value}</p>
  ) : null;
}
