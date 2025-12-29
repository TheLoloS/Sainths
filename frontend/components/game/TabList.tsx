'use client';

import { useGameStore } from '@/lib/stores/gameStore';
import StillNobodyRow from './StillNobodyRow';
import TabListRow from './TabListRow';
import Image from 'next/image';

interface TabListProps {
  user?: boolean;
}

export default function TabList({ user }: TabListProps) {
  const GameData = useGameStore((state) => state.gameData);

  if (!user) {
    return <TabListRow />;
  }

  if (!GameData?.users) {
    return <StillNobodyRow num={0} />;
  }

  const login = typeof window !== 'undefined' ? localStorage.getItem('login') : null;

  return (
    <>
      {GameData.users.map((player, i) => {
        if (player.login === login) {
          return (
            <tr key={i}>
              <td>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image
                        src={`https://api.dicebear.com/9.x/dylan/svg?seed=${player.login}`}
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
              <td className="text-center">0</td>
            </tr>
          );
        }
        return null;
      })}
    </>
  );
}
