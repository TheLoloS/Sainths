'use client';

import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useGameStore } from '@/lib/stores/gameStore';
import socket from '@/lib/socket';
import TabList from './TabList';

interface TabOfPlayersProps {
  btn?: boolean | string;
  main?: boolean;
}

export default function TabOfPlayers({ btn, main }: TabOfPlayersProps) {
  const GameData = useGameStore((state) => state.gameData);
  const [selectedGame, setSelectedGame] = useState('default');

  const handleStartGame = () => {
    socket.emit('startGame', { ...GameData, gameType: selectedGame });
  };

  const GameSelector = () => (
    <select
      className="select glass text-white w-full max-w-xs mb-4 bg-transparent border-white/30"
      onChange={(e) => setSelectedGame(e.target.value)}
      value={selectedGame}
    >
      <option value="default" className="text-black">
        Domyślna gra
      </option>
      <option value="trivia" className="text-black">
        Świąteczny Quiz
      </option>
      <option value="bingo" className="text-black">
        Świąteczne Bingo
      </option>
      <option value="scavenger" className="text-black">
        Poszukiwacze Skarbów
      </option>
    </select>
  );

  return isMobile ? (
    <div className="w-screen h-screen flex justify-top items-center mb-8 flex-col">
      <div className="glass w-screen overflow-hidden">
        <table className="table w-full bg-transparent">
          <thead>
            <tr className="text-white border-b border-white/20">
              <th className="bg-transparent text-center pl-0 whitespace-normal w-[20vw]">
                Nazwa
              </th>
              <th className="bg-transparent text-center pl-0 whitespace-normal w-[20vw]">
                Ogólna
              </th>
              <th className="bg-transparent text-center pl-0 whitespace-normal w-[20vw]">
                Aktualna
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            <TabList user={main ? false : true} />
          </tbody>
        </table>
      </div>
      <br />
      {btn ? (
        <>
          {main && <GameSelector />}
          <button
            className="btn glass-btn mt-4 text-white text-xl px-8"
            onClick={handleStartGame}
          >
            Zaczynajmy! 🎄
          </button>
        </>
      ) : (
        <button className="btn loading w-2/5 mt-8 glass-btn text-white">
          Oczekiwanie...
        </button>
      )}
    </div>
  ) : (
    <div className="w-3/5 flex items-center flex-col">
      <div className="glass w-full p-4">
        <table className="table w-full bg-transparent">
          <thead>
            <tr className="text-white border-b border-white/20">
              <th className="bg-transparent text-center w-[20vw]">Nazwa</th>
              <th className="bg-transparent text-center w-[20vw]">Punktacja Ogólna</th>
              <th className="bg-transparent text-center w-[20vw]">Punktacja Aktualna</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <TabList user={main ? false : true} />
          </tbody>
        </table>
      </div>
      {btn ? (
        <div className="mt-8 flex flex-col items-center">
          {main && <GameSelector />}
          <button
            className="btn glass-btn mt-4 text-white text-xl px-12 py-4 h-auto"
            onClick={(e) => {
              e.preventDefault();
              handleStartGame();
            }}
          >
            Zaczynajmy! 🎄
          </button>
        </div>
      ) : (
        <button className="btn loading glass-btn mt-8">Oczekiwanie...</button>
      )}
    </div>
  );
}
