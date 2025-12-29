'use client';

import { useGameStore } from '@/lib/stores/gameStore';
import StillNobodyRow from './StillNobodyRow';
import Image from 'next/image';

export default function TabListRow() {
  const GameData = useGameStore((state) => state.gameData);

  if (!GameData.users?.length) {
    return <StillNobodyRow num={0} />;
  }

  return (
    <>
      {GameData.users.map((player, i) => (
        <tr key={i}>
          <td>
            <div className="flex items-center space-x-3 justify-start">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.login}`}
                    alt="Avatar"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="w-full text-center">
                <div className="font-bold">{player.login}</div>
              </div>
            </div>
          </td>
          <td className="text-center">{player.points}</td>
          <td className="text-center">1000</td>
        </tr>
      ))}
    </>
  );
}
