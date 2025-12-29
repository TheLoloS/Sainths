'use client';

import { useState, useEffect } from 'react';
import TabList from '@/components/game/TabList';
import socket from '@/lib/socket';
import { songs } from '../Data/game1';

export default function FirstGame() {
  const [startGame, setStartGame] = useState(false);
  const [soccer, setSoccer] = useState(0);

  useEffect(() => {
    socket.on('startGameOne', () => {
      setStartGame(true);
    });

    socket.on('timeEndGameOne', () => {
      const inputs = document.querySelectorAll('input');
      let score = 0;
      inputs.forEach((item) => {
        if (item.classList.contains('bg-green-500')) {
          score++;
        }
      });
      score = (score / inputs.length) * 100;
      const gameData = JSON.parse(localStorage.getItem('gameData') || '{}');
      socket.emit('gameOneScore', gameData, score);

      setStartGame(false);
      setSoccer(score);
    });

    return () => {
      socket.off('startGameOne');
      socket.off('timeEndGameOne');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const target = e.target;
    if (target.value !== '') {
      target.classList.add('bg-red-500');
    }
    if (target.value === '') {
      target.classList.add('bg-white');
    }
    if (target.value === item.toLowerCase()) {
      target.classList.remove('bg-red-500');
      target.classList.add('bg-green-500');
      target.classList.add('text-white');
      target.classList.remove('border-black');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col content-center">
      <div className="w-screen h-fit flex justify-end items-start align-top">
        <div className="flex m-4 justify-end align-top">
          <table className="table w-full bg-base-300">
            <thead>
              <tr className="bg-base-300">
                <th className="text-center whitespace-normal">Nazwa</th>
                <th className="text-center whitespace-normal">Punktacja Ogólna</th>
                <th className="text-center whitespace-normal">Punktacja Aktualna</th>
              </tr>
            </thead>
            <tbody>
              <TabList user={true} />
            </tbody>
          </table>
          <br />
        </div>
      </div>
      <div className="bg-white p-4 mx-8 my-6 mb-8 rounded z-50">
        {startGame && (
          <div className="text-neutral-700 w-full flex flex-wrap">
            {songs[0].data.map((line, lineIndex) => (
              <div className="mb-8" key={lineIndex}>
                {line.split(' ').map((word, wordIndex) => (
                  <input
                    key={`${lineIndex}-${wordIndex}`}
                    className="lowercase focus:outline-none text-center transition-all rounded mr-1 p-1 border-b border-black"
                    onChange={(e) => handleInputChange(e, word)}
                    style={{ width: word.length * 12 + 'px' }}
                    data-word={word}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        {!startGame && !soccer && (
          <p className="text-gray-700 text-center">Czekaj na rozpoczęcie gry</p>
        )}
        {soccer > 0 && (
          <p className="text-gray-700 text-center">Twój wynik to: {soccer}%</p>
        )}
      </div>

      <p className="text-white w-full text-center">{songs[0].title}</p>
      <button
        className="btn bt-primary z-50 absolute bottom-4 left-4"
        onClick={() => localStorage.clear()}
      >
        Zresetuj localStorage
      </button>
    </div>
  );
}
